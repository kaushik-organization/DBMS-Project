import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/admin/dashboard";
import AdminLogin from "./pages/admin/login";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import BookDetails from "./pages/bookDetails";
import Home from "./pages/home";
import PageNotFound from "./pages/pageNotFound";
import Store from "./pages/store";
import Account from "./pages/account";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/auth0/login",
    element: <Login />,
  },
  {
    path: "/auth0/register",
    element: <Signup />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/book/:bookId",
    element: <BookDetails />,
  },
  {
    path: "/account/:userId/:options",
    element: <Account />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </RecoilRoot>
);
