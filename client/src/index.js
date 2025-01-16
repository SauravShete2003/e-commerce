import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./views/Signup";
import Home from "./views/Home";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter ([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "*",
    element: <div>404</div>
  }
])
root.render(
  <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 flex flex-col items-center justify-center p-4">
    <RouterProvider router={router} />
  </div>
)
