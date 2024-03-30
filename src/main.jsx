import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./Components/Navigation.jsx";
import { StateContextProvider } from "./assets/Context/index.jsx";
import { SnackbarProvider } from "notistack";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/weather",
    element: <Navigation />,
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