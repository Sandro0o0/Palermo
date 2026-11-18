import Dashboard from "../pages/dashboard";
import { Lowstock } from "../pages/dashboard/lowstock";
import { Product } from "../pages/dashboard/products";

export const ProductsRoutes = {
  path: "product",
  element: "",
  children: [
    { path: "all", element: <Product /> },
    {
      path: "lowstock",
      element: <Lowstock />,
    },
  ],
};
