import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export default function Authorization({ roles = [], children }) {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const payload = jwtDecode(access_token);

  if (!roles.includes(payload.role)) {
    return <Navigate to={"/403"} replace />;
  }

  console.log(payload);
  return children;
}
