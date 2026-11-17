import Landing from "../pages/landing";
import { Login } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import { AuthRequire } from "../admin/authRequire";
// impoer AuthRequire

export const authRoutes = {
  path: "auth",
  element: (
    <>
      <AuthRequire />
      <Landing />
    </>
    // </AuthRequire>
  ),
  children: [
    { path: "login", element: <Login /> },
    {
      path: "register",
      element: <Register />,
    },
  ],
};
