import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { SnackbarProvider } from "notistack";
import { StateContextProvider } from "./assets/Context/index.jsx";
import Navigation from "./Components/Navigation.jsx";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <StateContextProvider>
        <BrowserRouter>
          {" "}
          {/* Use BrowserRouter */}
          <App />
          <Navigation />
        </BrowserRouter>
      </StateContextProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
