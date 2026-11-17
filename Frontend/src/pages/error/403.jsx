import { NavLink } from "react-router-dom";
import { ArrowBigRight, ArrowBigRightDash } from "lucide-react";

export default function Forbidden() {
  return (
    <div className=" w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl text-error">403 Forbidden</h1>
      <p className="text-danger">This page is unavaiable for you!</p>
      <NavLink
        className=" flex flex-row  gap-2 font-bold transition-all hover:gap-3"
        to={"/"}
        replace
      >
        Back
        <ArrowBigRightDash />
      </NavLink>
    </div>
  );
}
