import axios from "axios";
import api_routes from "../config/api_routes";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const axios_client = axios.create({
  baseURL: api_routes.base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

axios_client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // or from Redux, Zustand, etc.
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios_client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop if refresh itself fails
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios_client(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(
          `${api_routes.base_url}/auth/refresh`,
          {
            refreshToken: refreshToken,
          }
        );

        const newAccessToken = response.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        axios_client.defaults.headers.common["Authorization"] =
          "Bearer " + newAccessToken;

        processQueue(null, newAccessToken);

        return axios_client(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // maybe redirect to login here
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const api_request_fx = async (options) => {
  const { method, url, data, params, headers = {}, signal } = options;

  try {
    const response = await axios_client({
      method,
      url: url,
      data,
      params,
      headers: {
        ...headers,
      },
      signal,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response);

      // throw new Error(
      //   `Server Error: ${error.response.status} - ${error.response.statusText}`
      // );
      return error.response;
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("Network Error: No response received from server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Request Setup Error: ${error.message}`);
    }
  }
};

export default api_request_fx;
