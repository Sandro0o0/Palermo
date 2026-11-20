import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import { tokenRefresh } from "../pages/auth/api/refresh";

export default function Authorization({ roles = [], children }) {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const payload = jwtDecode(access_token);
  if (!payload) {
    tokenRefresh();
  }
  const currentTime = Math.floor(Date.now() / 1000);

  if (payload.exp - currentTime < 60) {
    tokenRefresh();
  }
  console.log(payload);
  console.log(Math.floor(Date.now() / 1000));

  if (!roles.includes(payload.role)) {
    return <Navigate to={"/403"} replace />;
  }

  // console.log(payload);
  return children;
}
