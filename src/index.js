import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Broadcasting from "./broadcasting";
import Comitive from "./comitive";
import Contatti from "./contatti";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "broadcasting", element: <Broadcasting /> },
      { path: "comitive", element: <Comitive /> },
      { path: "contatti", element: <Contatti /> },
      { path: "", element: <App /> },
    ],
  },
]);

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
