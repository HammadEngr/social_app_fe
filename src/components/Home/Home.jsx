import { useState } from "react";
import styles from "./Home.module.css";
import { jwtDecode } from "jwt-decode";
import api_request_fx from "../../utils/api_req";
//
// const Home = () => {
//   return (
//     <div className={styles.box}>
//       <h2>Select your role</h2>
//       <div>
//         <button className={styles.btn}>User</button>
//         <button className={styles.btn}>Admin</button>
//       </div>
//     </div>
//   );
// };

const Home = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email_s, setEmail_s] = useState();
  const [password_s, setPassword_s] = useState();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const createNewUser = async (e) => {
    try {
      e.preventDefault();
      const request_options = {
        method: "POST",
        url: "auth/signup",
        data: {
          firstName: "hammad",
          lastName: "ahmed",
          email: "acc@abc.com",
          password: "123456789",
          role: "user",
        },
      };
      const response = await api_request_fx(request_options);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // done
  const signin = async (e) => {
    try {
      e.preventDefault();
      const request_options = {
        method: "POST",
        url: "auth/signin",
        data: {
          email,
          password,
        },
      };
      const response = await api_request_fx(request_options);
      console.log(response);

      if (response.status) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendToProtectedRoute = async () => {
    try {
      const token = localStorage.getItem("token");
      const now = Date.now() / 1000;
      const decodeToken = jwtDecode(token);
      const isTokenExpired = decodeToken.exp < now;

      if (isTokenExpired) {
        console.log("Token expired, Logging out the user");
        localStorage.removeItem("token");
      }

      const response = await fetch("http://localhost:5000/api/v1/protected", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ route: "protected" }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // done
  const refreshToken = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const request_options = {
        method: "POST",
        url: "auth/refresh",
        data: { refreshToken },
        signal,
      };
      const response = await api_request_fx(request_options);

      console.log(response);

      if (!response.status === 200) {
        throw error;
      }

      // remove old token
      localStorage.removeItem("refreshToken");

      // set new tokens
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const request_options = {
        method: "POST",
        url: "auth/signout",
        data: {
          refreshToken,
        },
      };
      const response = await api_request_fx(request_options);
      console.log(response);
      if (response.status) {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const forgotPassword = async () => {
    try {
      const request_options = {
        method: "post",
        url: "auth/forgotPassword",
        data: {
          email: "abc@abc.com",
        },
      };
      const response = await api_request_fx(request_options);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.box}>
      <h2>Select your role</h2>
      <div>
        <form action="" onSubmit={signin}>
          <div className={styles.l_box}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              onChange={onChangeEmail}
              value={email}
            />
          </div>

          <div className={styles.l_box}>
            <label htmlFor="pwd">Password</label>
            <input
              id="pwd"
              type="text"
              min={8}
              onChange={onChangePassword}
              value={password}
            />
          </div>
          <button type="submit" className={styles.btn_sm}>
            SignIn
          </button>
        </form>
        <hr />
        <form action="" onSubmit={createNewUser}>
          <div className={styles.l_box}>
            <label htmlFor="">First Name</label>
            <input type="text" value={firstName} />
          </div>
          <div className={styles.l_box}>
            <label htmlFor="">Last Name</label>
            <input type="text" value={lastName} />
          </div>
          <div className={styles.l_box}>
            <label htmlFor="">Email</label>
            <input type="text" value={email_s} />
          </div>
          <div className={styles.l_box}>
            <label htmlFor="">Password</label>
            <input type="text" value={password_s} />
          </div>
          <button type="submit" className={styles.btn_sm}>
            SignUp
          </button>
        </form>
        <button onClick={sendToProtectedRoute}>protected route</button>
        <button onClick={refreshToken}>Refresh token</button>
        <button onClick={signout}>Sign out</button>
        <button onClick={forgotPassword}>Forgot</button>
      </div>
    </div>
  );
};

export default Home;
