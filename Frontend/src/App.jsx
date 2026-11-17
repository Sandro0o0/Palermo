// import Dashboard from "./pages/dashboard/index";
// import { Route, BrowserRouter, Routes } from "react-router-dom";

import { RouterProvider } from "react-router-dom";
import { Router } from "./routes";
function App() {
  return <RouterProvider router={Router} />;
}
export default App;
