import { Outlet } from "react-router-dom";
import { AuthRequire } from "../admin/authRequire";
import Dashbord from "../pages/dashboard";
import Analytics from "../pages/dashboard/display";
import { ProductsRoutes } from "./products";
import Authorization from "../admin/authorization";
import { Ingredient } from "../pages/dashboard/ingredient";

export const DashboardRoute = {
  path: "dashboard",
  element: (
    <AuthRequire>
      <Authorization roles={["user", "admin"]}>
        <Dashbord />
      </Authorization>
    </AuthRequire>
  ),
  children: [
    { index: true, element: <Analytics /> },
    { path: "ingredients", element: <Ingredient /> },
    { path: "orders", element: "" },
    { path: "category", element: "" },
    { path: "storage", element: "" },
    // { path: "", element: "" },
    ProductsRoutes,
    // { path: "products", element: <Products /> },
    // { path: "products", element: <Dashbord /> }
  ],
};
