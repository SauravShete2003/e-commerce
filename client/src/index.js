import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter ([
  {
    path: "/",
    element: <h1>Hello </h1>
  },
  {
    path: "*",
    element: <div>404</div>
  }
])
root.render(<RouterProvider router={router}/>)
