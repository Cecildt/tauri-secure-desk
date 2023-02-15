import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import ErrorPage from "./error-page";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Applications from "./routes/Applications";
import OperatingSystem from "./routes/OperatingSystem";
import About from "./routes/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "apps",
    element: <Applications />,
  },
  {
    path: "os",
    element: <OperatingSystem />,
  },
  {
    path: "about",
    element: <About />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
