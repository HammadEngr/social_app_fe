import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import PageLoader from "./Layout/PageLoader";
import SignupSkeleton from "./ui/skeletons/SignupSkeleton";
import SigninSkeleton from "./ui/skeletons/SIgninSkeleton";
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./components/signup/Signup"));
const Signin = lazy(() => import("./components/signin/Signin"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<PageLoader component={Home} />} />
          <Route
            path="/signup"
            element={
              <PageLoader component={Signup} skeleton={SignupSkeleton} />
            }
          />
          <Route
            path="/signin"
            element={
              <PageLoader component={Signin} skeleton={SigninSkeleton} />
            }
          />
          {/* <Route path="/skeleton" element={<SigninSkeleton />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
