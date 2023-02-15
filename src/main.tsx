import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import ErrorPage from "./error-page";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applications from "./routes/Applications";
import OperatingSystem from "./routes/OperatingSystem";
import About from "./routes/About";
import { getApplications } from "./services/applications-data";
import { getDashboardData } from "./services/dashboard-data";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: getDashboardData,
  },
  {
    path: "apps",
    element: <Applications />,
    errorElement: <ErrorPage />,
    loader: getApplications,
  },
  {
    path: "os",
    element: <OperatingSystem />,
    errorElement: <ErrorPage />,
  },
  {
    path: "about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
