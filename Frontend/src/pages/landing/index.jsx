import { Outlet } from "react-router-dom";
import AuraBg from "../../components/background/bgLinear";

export default function Landing({ children }) {
  return (
    <>
      <AuraBg>
        <Outlet />
      </AuraBg>
    </>
  );
}
