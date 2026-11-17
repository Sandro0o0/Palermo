import { DashboardRoute } from "./dashboard";
import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/landing";
import { authRoutes } from "./auth";

import Forbidden from "../pages/error/403";
import Logout from "../pages/auth/logout";
import { AuthRequire } from "../admin/authRequire";
// MiddleWare
// import { AuthRequire } from "../admin/authRequire";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    children: [
      DashboardRoute,
      authRoutes,
      { path: "403", element: <Forbidden /> },
      {
        path: "auth/logout",
        element: <Logout />,
      },
      { path: "*", element: <h1>sad</h1> },
    ],
  },
]);
