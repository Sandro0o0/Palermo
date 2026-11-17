import { Outlet, NavLink, Navigate } from "react-router-dom";

export function AuthRequire({ children }) {
  const access_token = localStorage.getItem("access_token");
  let authorized = false;

  if (access_token) {
    authorized = true;
  }

  const url = window.location.pathname.toString();

  if (!authorized && !url.startsWith("/auth")) {
    return <Navigate to="/auth/login" />;
  }
  if (authorized && url.startsWith("/auth")) {
    return (
      <>
        <Navigate to={"/"} replace />
        {children}
      </>
    );
  }
  return children;
}
