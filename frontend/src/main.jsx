import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import Home from "./pages/Home";
import DataKolam from "./pages/DataKolam";
import AboutUs from "./pages/AboutUs";
import Laporan from "./pages/Laporan";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "data-kolam", element: <DataKolam /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "laporan-keuangan", element: <Laporan /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
