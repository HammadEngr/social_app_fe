import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import styles from "./App.module.css";
import Layout from "../Layout/Layout";
import Home from "./Home/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const { toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
