import Dashboard from "../pages/dashboard";
import { Lowstock } from "../pages/dashboard/lowstock";
import { Product } from "../pages/dashboard/products";

export const ProductsRoutes = {
  path: "product",
  element: <Dashboard />,
  children: [
    { index: true, element: <Product /> },
    {
      path: "lowstock",
      element: <Lowstock />,
    },
  ],
};
