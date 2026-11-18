import SyncBtn from "../../components/syncBtn";
import { BarChart } from "@mui/x-charts/BarChart";
export function DashboardHead() {
  return (
    <>
      <div className=" px-2 flex flex-row justify-between w-full h-fit py-4 mt-2  bg-white/20 backdrop-blur-xl border-white/50   rounded-lg  backdrop-blur-[5px]">
        <h1 className="font-bold text-gradient bg-brand/20 rounded-lg min-h-[100%] outline-2 outline-white border-brand border-4 text-lg px-2">
          <span className="text-brand font-sans  text-xl">P</span>
          alermo
        </h1>
        <div>
          <SyncBtn />
        </div>
      </div>
    </>
  );
}
function DashboardBody() {
  const rows = [
    { id: 1, name: "Data Grid", description: "the Community version" },
    { id: 2, name: "Data Grid Pro", description: "the Pro version" },
    { id: 3, name: "Data Grid Premium", description: "the Premium version" },
  ];

  const columns = [
    { field: "name", headerName: "Product Name", width: 200, rowHeader: true },
    { field: "description", headerName: "Description", width: 300 },
  ];

  return (
    <>
      <div className="grid grid-cols-5 grid-rows-2 gap-2 p-4  w-full h-full bg-white/20 rounded-lg  backdrop-blur-[5px]">
        <div className="w-full col-start-1 col-end-3  h-full">
          <h1>დიაგრამა</h1>
          <BarChart
            className="max-w-full max-h-full bg-white/20 rounded-xl"
            xAxis={[{ data: ["group A", "group B", "group C"] }]}
            series={[{ data: [5] }, { data: [1, 6, 3] }, { data: [2] }]}
            height={500}
          />
        </div>
        <div className="bg-brand h-full col-start-3 col-end-6 w-full h-10"></div>
        <div className="bg-brand w-full h-full"></div>
      </div>
    </>
  );
}

export default function Analytics() {
  return (
    <>
      <div className="w-full flex flex-col gap-5 ">
        {/* <DashboardHead /> */}
        <DashboardBody />
      </div>
    </>
  );
}
