import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./globalStyles/dimensions.css";
import "./globalStyles/colortheme.css";
import "./globalStyles/antd_modifications.css";
import App from "./App";
import ThemeProvider from "./contexts/ThemeContext";
import UserProvider from "./contexts/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
  </StrictMode>
);
