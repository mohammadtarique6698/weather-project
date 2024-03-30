import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { StateContextProvider } from "./assets/Context/index.jsx";
import { SnackbarProvider } from "notistack";
import Navigation from "./Components/Navigation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider>
      <StateContextProvider>
        <RouterProvider router={router} />
      </StateContextProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
