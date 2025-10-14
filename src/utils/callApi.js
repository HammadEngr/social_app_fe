import axios from "axios";
import api_routes from "../config/api_routes";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });
  failedQueue = [];
};

const axios_client = axios.create({
  baseURL: api_routes.base_url,
  headers: { "Content-Type": "application/json" },
});

axios_client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axios_client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If refresh itself fails → just reject
    if (
      originalRequest.url.includes("auth/signin") ||
      originalRequest.url.includes("auth/signup") ||
      originalRequest.url.includes("auth/refresh")
    ) {
      return Promise.reject(error);
    }

    // Only handle 401 errors
    if (error.response?.status === 401) {
      // If refresh already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // Once new token is ready, retry this request
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axios_client(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Start refresh process
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          `${api_routes.base_url}/auth/refresh`,
          {
            refreshToken,
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Store updated tokens
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Update default headers
        axios_client.defaults.headers.common["Authorization"] =
          "Bearer " + accessToken;

        // Resolve queued requests with the new token
        processQueue(null, accessToken);

        // Retry the failed request with new token
        originalRequest.headers["Authorization"] = "Bearer " + accessToken;
        return axios_client(originalRequest);
      } catch (err) {
        // Refresh failed → clear tokens and reject all queued requests
        processQueue(err, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // Optionally redirect to login
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const callApi = async (options) => {
  const { method, url, data, params, headers = {}, signal } = options;

  try {
    const response = await axios_client({
      method,
      url,
      data,
      params,
      headers,
      signal,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      throw new Error("Network Error: No response received from server.");
    } else {
      throw new Error(`Request Setup Error: ${error.message}`);
    }
  }
};

export default callApi;
