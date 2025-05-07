import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./templates/ErrorPage.jsx";
import Main from "./templates/pages/MainPage.jsx";
import AboutMe from "./templates/pages/AboutMe.jsx";
import LoginLayout from "./templates/Auth/LoginLayout.jsx";
import AuthPage from "./templates/Auth/index.js";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <LoginLayout>
        <AuthPage />
      </LoginLayout>
    ),
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Main /> },
      { path: "about-me", element: <AboutMe /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
