import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./views/Signup";
import Home from "./views/Home";

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
    path: "*",
    element: <div>404</div>
  }
])
root.render(<RouterProvider router={router}/>)
