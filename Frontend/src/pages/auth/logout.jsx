import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const [logoutText, setLogoutText] = useState("");
  let [count, setCount] = useState(0);

  const interval = setTimeout(() => {
    if (count >= 3) {
      setCount(0);
      setLogoutText("");
      return;
    }
    setCount((count += 1));
    const result = logoutText.concat(".");
    setLogoutText(result);
    return;
  }, 1000);

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  return <Navigate to={"/"} />;

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <h1 className="text-xl font-mono text-warning">logout{logoutText}</h1>
    </div>
  );
}
