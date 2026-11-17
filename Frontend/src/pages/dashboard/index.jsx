import { AppSidebar } from "./app-sidebar";
import { DashboardHead } from "./display";

import AuraBg from "../../components/background/bgLinear";
import { Outlet } from "react-router-dom";

export default function Dashboard({ children }) {
  return (
    <>
      <AuraBg>
        <div className="flex flex-row gap-3">
          <AppSidebar />
          {/* <DashboardHead /> */}
          <Outlet />
          {/* {children} */}
        </div>
      </AuraBg>
    </>
  );
}
