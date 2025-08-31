import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/signup/Signup";
import { useTheme } from "./contexts/ThemeContext";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
// import Home

function App() {
  const [count, setCount] = useState(0);
  const { toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
