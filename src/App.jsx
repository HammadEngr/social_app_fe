import { lazy } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import PageLoader from "./Layout/PageLoader";
import SignupSkeleton from "./ui/skeletons/SignupSkeleton";
import SigninSkeleton from "./ui/skeletons/SIgninSkeleton";
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./components/signup/Signup"));
const Signin = lazy(() => import("./components/signin/Signin"));
const PasswordRecover = lazy(() =>
  import("./components/PasswordRecover/PasswordRecover")
);
const ResetPasswordForm = lazy(() =>
  import("./components/PasswordRecover/ResetPasswordForm")
);
const SelfView = lazy(() => import("./components/User/SelfView/SelfView"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLoader component={Home} />,
    errorElement: <p>Error</p>,
  },
  {
    path: "/signup",
    element: <PageLoader component={Signup} skeleton={SignupSkeleton} />,
    errorElement: <p>Error</p>,
  },
  {
    path: "/signin",
    element: <PageLoader component={Signin} skeleton={SigninSkeleton} />,
    errorElement: <p>Error</p>,
  },
  {
    path: "/recover",
    element: <PasswordRecover />,
    errorElement: <p>Error</p>,
  },
  {
    path: "/recover/resetpassword/:token",
    element: <ResetPasswordForm />,
    errorElement: <p>Error</p>,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/user/self/:id",
        element: <SelfView />,
        errorElement: <p>Error</p>,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route path="/" element={<PageLoader component={Home} />} />
    //       <Route
    //         path="/signup"
    //         element={
    //           <PageLoader component={Signup} skeleton={SignupSkeleton} />
    //         }
    //       />
    //       <Route
    //         path="/signin"
    //         element={
    //           <PageLoader component={Signin} skeleton={SigninSkeleton} />
    //         }
    //       />
    //       {/* <Route path="/skeleton" element={<SigninSkeleton />} /> */}
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
