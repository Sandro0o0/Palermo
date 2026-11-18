import { useEffect, useState } from "react";
import { baseUrl } from "../auth/api/api";
import { tokenRefresh } from "../auth/api/refresh";
import { LucidePackagePen } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// export function Table() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try {
//       const access_token = JSON.parse(localStorage.getItem("access_token"));
//       // import.meta.env.VITE_API_URL;

//       const fetchData = async () => {
//         const response = await fetch(`${baseUrl}/product`, {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//         });
//         setLoading(false);

//         const dt = await response.json();
//         if (dt?.message?.includes("expired")) {
//           tokenRefresh();
//         }
//         setData(dt?.data);
//         // console.log(data);
//         console.log(dt);
//         // setData(dt);
//       };
//       fetchData();
//     } catch (err) {
//       console.error(err);
//     }
//   }, [data]);

//   return (
//     <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
//       <table className="w-full text-left text-sm">
//         <thead className="bg-gray-50 text-gray-600 overflow-scroll">
//           <tr>
//             <th className="px-5 py-3 font-medium border-r-2 max-w-fit">#</th>
//             <th className="px-5 py-3 font-medium border-r-2 max-w-fit">
//               Image
//             </th>
//             <th className="px-5 py-3 font-medium border-r-2 max-w-fit">
//               Product
//             </th>
//             <th className="px-5 py-3 font-medium border-r-2 max-w-fit">
//               Category
//             </th>
//             <th className="px-5 py-3 font-medium border-r-2 max-w-fit">
//               Price
//             </th>
//             <th className="px-5 py-3 font-medium border-r-2 max-w-fit">
//               Stock
//             </th>
//             <th className="px-5 py-3 font-medium border-r-2 max-w-fit">
//               LowStockAmount
//             </th>
//             <th className="px-5 py-3 font-medium border-r-2 max-w-fit">
//               LowStockAmount
//             </th>
//             {/* <th className="px-5 py-3 font-medium"></th> */}
//           </tr>
//         </thead>

//         {/* Load Data */}
//         <tbody className="divide-y divide-gray-200">
//           {/* Loadin Animation */}
//           {loading && (
//             <>
//               <tr>
//                 <td colSpan={10} className="p-4">
//                   <div className="w-full h-10 rounded-md bg-brand-400/40 animate-fade-in">
//                     Loading...
//                   </div>
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan={10} className="p-4">
//                   <div className="w-full h-10 rounded-md bg-brand-400/40 animate-fade-in">
//                     Loading...
//                   </div>
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan={10} className="p-4">
//                   <div className="w-full h-10 rounded-md bg-brand-400/40 animate-fade-in">
//                     Loading...
//                   </div>
//                 </td>
//               </tr>
//             </>
//           )}

//           {data?.map((product) => (
//             <tr key={product?._id} className="hover:bg-gray-50">
//               <td className="flex justify-center items-center py-2 pointer-event-none hover:text-brand-100">
//                 <button contentEditable={true}>Update</button>
//                 <LucidePackagePen className="text-center " />
//               </td>
//               <td className="px-5 py-4 font-medium text-gray-900">
//                 <div className="w-5 h-5 m-auto bg-brand rounded-xl">
//                   <img src={product?.image} alt="" />
//                 </div>
//               </td>
//               <td className="px-5 py-4 font-medium text-gray-900">
//                 {product?.title}
//               </td>
//               <td className="px-5 py-4 text-gray-600">{product?.category}</td>
//               <td className="px-5 py-4 text-gray-600">
//                 {product?.price?.currency + product?.price?.original}
//               </td>
//               <td className="px-5 py-4 text-gray-600">{product?.stock}</td>
//               <td className="px-5 py-4 text-gray-600">
//                 {product?.low_stock_amount}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
import { Package, CalendarDays, Tag, Search, RefreshCw } from "lucide-react";

const Table12 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = JSON.parse(localStorage.getItem("access_token"));

        const response = await fetch(`${baseUrl}/ingredient`, {
          method: "GET",
        });

        const dt = await response.json();

        if (dt?.message?.includes("expired")) {
          await tokenRefresh();
          return;
        }

        console.log(dt);
        setData(dt?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((product) =>
    product?.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("ka-GE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full relative space-y-5">
      {/* Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className=" flex flex-row gap-2 items-center ">
          <div>
            <div className="flex items-center gap-2">
              <Package size={22} className="text-brand-500" />
              <h2 className="text-xl font-semibold tracking-tight">
                ინგრედიენტები
              </h2>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              ინგრედიენტები და მარაგების მართვა
            </p>
          </div>
          <button className="sync-btn py-2">ინგრედიენტის დამატება</button>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-lg bg-muted px-3 py-2 text-sm font-medium">
            სულ: {data.length}
          </span>

          <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm">
            <Search size={16} className="text-muted-foreground" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ძებნა..."
              className="w-36 bg-transparent text-sm outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table container */}
      <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-muted/60 hover:bg-muted/60">
                <TableHead className="z-30 w-32 min-w-32 border-r bg-muted backdrop-blur  font-semibold">
                  ID
                </TableHead>

                <TableHead className="sticky left-0 z-30 min-w-52 border-r  bg-brand-400/40 backdrop-blur font-semibold">
                  დასახელება
                </TableHead>

                <TableHead className="min-w-36 font-semibold">
                  კატეგორია
                </TableHead>

                <TableHead className="min-w-36 font-semibold">
                  შექმნის თარიღი
                </TableHead>

                <TableHead className="min-w-36 font-semibold">
                  ცვლილების თარიღი
                </TableHead>

                <TableHead className="min-w-32 text-center font-semibold">
                  საშუალო რაოდენობა
                </TableHead>

                <TableHead className="min-w-32 text-center font-semibold">
                  ხელმისაწვდომი რაოდენობა
                </TableHead>

                <TableHead className="min-w-28 text-right font-semibold">
                  ფასი
                </TableHead>

                <TableHead className="min-w-28 text-center font-semibold">
                  ფასდაკლება %
                </TableHead>

                <TableHead className="min-w-28 text-right font-semibold">
                  საბოლოო ფასი
                </TableHead>

                <TableHead className="min-w-24 font-semibold">ვალუტა</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Loading */}
              {loading &&
                [1, 2, 3].map((item) => (
                  <TableRow key={item}>
                    <TableCell colSpan={11} className="p-4">
                      <div className="h-8 w-full animate-pulse rounded-md bg-muted" />
                    </TableCell>
                  </TableRow>
                ))}

              {/* Empty */}
              {!loading && filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={11} className="h-40 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Package size={28} />
                      <span>
                        {search
                          ? "პროდუქტი ვერ მოიძებნა"
                          : "პროდუქტები არ არის"}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Data */}
              {!loading &&
                filteredData.map((emp) => (
                  <TableRow
                    key={emp?._id}
                    className="group transition-colors hover:bg-brand-400/5"
                  >
                    <TableCell className=" z-20 border-r  bg-muted backdrop-blurfont-mono text-xs text-muted-foreground group-hover:bg-muted/50">
                      <span title={emp?._id}>{emp?._id}</span>
                    </TableCell>

                    <TableCell className=" sticky left-0 z-20 border-r bg-brand-400/40 backdrop-blur font-medium group-hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-brand-500">
                          <Package size={16} />
                        </div>

                        <span className="max-w-40 truncate">{emp?.title}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs">
                        <Tag size={12} />
                        {typeof emp?.category === "object"
                          ? emp?.category?.title || "-"
                          : emp?.category || "-"}
                      </span>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      <span className="flex items-center gap-2 text-xs">
                        <CalendarDays size={14} />
                        {formatDate(emp?.createdAt)}
                      </span>
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(emp?.updatedAt)}
                    </TableCell>

                    <TableCell className="text-center tabular-nums">
                      {emp?.low_stock_amount ?? "-"}
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="rounded-md bg-muted px-2.5 py-1 font-medium tabular-nums">
                        {emp?.stock ?? 0}
                      </span>
                    </TableCell>

                    <TableCell className="text-right font-medium tabular-nums">
                      {emp?.price?.original ?? "-"}
                    </TableCell>

                    <TableCell className="text-center">
                      <span className="rounded-md bg-orange-500/10 px-2 py-1 text-xs font-semibold text-orange-600">
                        {emp?.price?.discount_percentage ?? 0}%
                      </span>
                    </TableCell>

                    <TableCell className="text-right font-semibold tabular-nums">
                      {emp?.price?.final_price ?? "-"}
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground">
                      {emp?.price?.currency ?? "-"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t bg-muted/20 px-5 py-3">
          <p className="text-xs text-muted-foreground">
            ნაჩვენებია {filteredData.length} / {data.length} პროდუქტი
          </p>

          <span className="text-xs text-muted-foreground">
            Product inventory
          </span>
        </div>
      </div>
    </div>
  );
};

export function Ingredient() {
  return (
    <>
      <main>
        <Table12 />
        {/* <div>e</div> */}
        {/* <Table /> */}
      </main>
    </>
  );
}
