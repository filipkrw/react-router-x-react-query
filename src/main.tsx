import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { LoadingBarProvider } from "./components/LoadingBarProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LoadingBarProvider>
      <App />
    </LoadingBarProvider>
  </React.StrictMode>
);
