import { data } from "react-router-dom";
import { baseUrl } from "./api";

export const tokenRefresh = async () => {
  try {
    const refresh_token = JSON.parse(localStorage.getItem("refresh_token"));

    const response = await fetch(`${baseUrl}/auth/refresh/${refresh_token}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("token refresh failed");
    }
    const dt = await response.json();

    console.log(dt);
    localStorage.setItem("access_token", JSON.stringify(dt.access_token));
    return;
  } catch (err) {
    console.error(err);
  }
};
