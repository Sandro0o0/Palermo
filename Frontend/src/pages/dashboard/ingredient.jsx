import { useEffect, useState } from "react";
import { baseUrl } from "../auth/api/api";
import { tokenRefresh } from "../auth/api/refresh";
import Swal from "sweetalert2";

import {
  LucideArrowRight,
  LucideArrowLeft,
  LucideRecycle,
  MailWarning,
  Package,
  CalendarDays,
  Tag,
  Search,
  RefreshCw,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SyncBtn from "../../components/syncBtn";

const CreateIngredient = ({ openCreateItem, setOpenCreateItem }) => {
  const [value, setValue] = useState({});
  const [titleValue, setTitleValue] = useState("");
  const [amountType, setAmountType] = useState("kilo");
  const [amountValue, setAmountValue] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const access_token = JSON.parse(localStorage.getItem("access_token"));

  useEffect(() => {
    const objValue = {
      title: titleValue,
      amount: amountType === "kilo" ? Number(amountValue) * 1000 : amountValue,
    };

    setValue(objValue);
  }, [titleValue, amountValue, amountType]);

  useEffect(() => {
    setAmountValue(
      amountType === "kilo" ? amountValue / 1000 : amountValue * 1000,
    );
  }, [amountType]);

  const createIngredient = async () => {
    try {
      if (titleValue === "" || amountValue === 0) {
        setError("გთხოვთ შეავსეთ ველები");
        return;
      }
      const respone = await fetch(`${baseUrl}/ingredient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(value),
      });
      setIsSubmitting(true);

      const dt = await respone.json();
      if (dt?.message?.includes("expired")) {
        tokenRefresh();
        return;
      }
      console.log(dt);
      setSuccessMessage("Created Successfuly");
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setTitleValue("");
      setAmountValue(0);
    }
  };

  console.log(value);
  console.log(amountType);

  return (
    <>
      <div
        className={`absolute!  flex flex-col z-40 backdrop-blur-md flex justify-center items-center top-0 left-0 w-screen h-screen bg-black/20 ${openCreateItem ? "visible" : "hidden"}`}
      >
        <div className=" flex flex-row justify-between items-center px-3 relative w-full max-w-200 h-20 bg-brand-200 top-5 rounded-xl">
          <div className="flex flex-col">
            <h2 className="text-2xl font-geofont!   text-brand-600">
              ინგრედიენტის დამატება
            </h2>
            <p className="text-sm  mt-1 text-brand-500">
              შეიყვანე ქვემოთ მოცემული ველები
            </p>
          </div>{" "}
          <div className=" relative bottom-3 left-3 bg-white rounded-[50%] p-2 flex justify-between items-center mb-8">
            <button
              onClick={setOpenCreateItem}
              type="button"
              className=" bg-gray-400 text-white rounded-[50%] p-2 px-4 text-center   hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="bg-white w-full max-w-200 mx-4 rounded-2xl shadow-xl p-6 md:p-8">
          {/* Header */}

          {/* Form */}
          <form className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ინგრედიენტის სახელი
              </label>
              <input
                onChange={(e) => {
                  setError("");
                  setSuccessMessage("");
                  setTitleValue(e.target.value);
                }}
                value={titleValue}
                type="text"
                name="title"
                placeholder="მაგ: ფქვილი"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="flex flex-row gap-2 block text-sm font-medium text-gray-700 mb-2">
                რაოდენობა
                <select
                  onChange={(e) => {
                    setError("");
                    setSuccessMessage("");
                    setAmountType(e.target.value);
                  }}
                  className="outline-none bg-brand-400 text-white font-noto-georgian rounded-sm px-2 py-1"
                  name=""
                  id=""
                >
                  <option className="" value="kilo">
                    კილო
                  </option>
                  <option value="gram">გრამი</option>
                </select>
              </label>
              <input
                onChange={(e) => setAmountValue(e.target.value)}
                type="number"
                name="amount"
                value={amountValue}
                min="0"
                step={amountType === "gram" ? "100" : "1"}
                placeholder="e.g. 10"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            {error && (
              <div className="flex justify-center items-center">
                <MailWarning />
                <h1 className="text-center text-error/80">{error}</h1>
              </div>
            )}
            {successMessage && (
              <div className="flex justify-center items-center">
                <MailWarning />
                <h1 className="text-center text-succsess/80">
                  {successMessage}
                </h1>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">
              <button
                disabled={isSubmitting}
                onClick={setOpenCreateItem}
                type="button"
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                გაუქმება
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  createIngredient();
                }}
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                ინგრედიენტის დაამტება
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const Table12 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [openCreateItem, setOpenCreateItem] = useState(false);
  const [createItem, setCreateItem] = useState({});
  const [searchItems, setSearchItems] = useState({
    search: "",
  });
  const [isSearchable, setIsSearchable] = useState(false);

  // Filter data
  const [page, setPage] = useState(1);
  const [arrowLeftDisable, setArrowLeftDisable] = useState(false);
  const [arrowRightDisable, setArrowRightDisable] = useState(false);

  const changePage = (value) => {
    let pg = page;
    console.log(pg + value < 1);
    console.log(pg + value > data?.maxPage);

    if (pg + value < 1) {
      setArrowLeftDisable(true);
    } else {
      setArrowLeftDisable(false);
    }
    if (pg + value >= data?.maxPage) {
      setArrowRightDisable(true);
    } else {
      setArrowRightDisable(false);
    }
    setPage((pg += value));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/ingredient?page=${page}`, {
          method: "GET",
        });

        const dt = await response.json();

        if (dt?.message?.includes("expired")) {
          await tokenRefresh();
          return;
        }

        console.log(dt);
        setData(dt || []);
        console.log(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);
  const deleteIngredient = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      // Your delete request here
      // await handleDelete(id);
    }
  };
  const handleDelete = async (id) => {
    try {
      const respone = await fetch(`${baseUrl}/ingredient`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const searchObj = {
      search,
    };

    setSearchItems(searchObj);

    const hasChanged = Object.keys(searchObj).some(
      (key) => searchObj[key] !== searchItems[key],
    );

    setIsSearchable(
      Object.values(searchObj).some((value) => value !== "" && value !== null),
    );
    console.log(isSearchable);
    // if(searchItems)
  }, [search]);

  const filteredData = data?.data;
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("ka-GE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <CreateIngredient
        openCreateItem={openCreateItem}
        setOpenCreateItem={() => setOpenCreateItem(false)}
      />
      <div className="font-geofont w-full relative space-y-5">
        {/* Heading */}
        <div className="px-5 py-2  border-4 border-white/30 rounded-lg mt-2 shadow-white flex flex-wrap items-center justify-between gap-4">
          <div className=" flex flex-row gap-2 items-center ">
            <div>
              <div className="flex items-center gap-2">
                <Package size={22} className="text-brand-500" />
                <h2 className="text-xl font-geofont tracking-tight">
                  ინგრედიენტები
                </h2>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                ინგრედიენტები და მარაგების მართვა
              </p>
            </div>
            <button
              onClick={() => setOpenCreateItem(true)}
              className="sync-btn py-2"
            >
              ინგრედიენტის დამატება
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-muted px-3 py-2 text-sm font-medium">
              სულ: {data?.totalIngredients}
            </span>
            <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm">
              <Search size={16} className="text-muted-foreground" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ძებნა..."
                className="w-36 bg-transparent text-sm outline-none"
              />
              <button
                disabled={isSearchable}
                className={`px-2 py-1 rounded-md  ${isSearchable ? "bg-blue text-white cursor-pointer" : "text-black/20"}`}
              >
                ძიება
              </button>
            </div>

            <SyncBtn />
          </div>
        </div>

        {/* Table container */}
        <div className="  overflow-hidden  bg-background ">
          <div className=" border-4 border-white/30 rounded-xl overflow-x-auto ">
            <Table className="border-2">
              <TableHeader>
                <TableRow className=" text-lg! border-b bg-muted/60 hover:bg-muted/60">
                  <TableHead className="  z-30 w-32 min-w-32 border-r bg-muted backdrop-blur  font-semibold">
                    ID
                  </TableHead>

                  <TableHead className=" sticky left-0 z-30 min-w-52 border-r  bg-brand-400/40 backdrop-blur font-semibold">
                    დასახელება
                  </TableHead>

                  <TableHead className="min-w-36 font-semibold">
                    შექმნის თარიღი
                  </TableHead>

                  <TableHead className="min-w-36 font-semibold">
                    ცვლილების თარიღი
                  </TableHead>
                  <TableHead className="min-w-36 font-semibold">
                    წაშლა
                  </TableHead>
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
                {!loading && filteredData?.length === 0 && (
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
                  filteredData?.map((emp, index) => (
                    <TableRow
                      key={emp?._id}
                      className="text-xl group transition-colors hover:bg-brand-400/5"
                    >
                      <TableCell className=" z-20 border-r  bg-muted backdrop-blurfont-mono text-xs text-muted-foreground group-hover:bg-muted/50">
                        <span title={emp?._id}>{emp?._id}</span>
                      </TableCell>

                      <TableCell className=" sticky left-0 z-20 border-r bg-brand-400/40 backdrop-blur font-medium group-hover:bg-muted/50">
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-brand-500">
                            <Package size={16} />
                          </div>

                          <span className="max-w-40 truncate">
                            {emp?.title}
                          </span>
                        </div>
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
                      <TableCell className="flex flex-row gap-2 items-center text-xs text-muted-foreground hover:bg-error">
                        <div
                          className=" cursor-pointer"
                          onClick={() => {
                            deleteIngredient(emp._id);
                            // console.log(selectedItem);
                          }}
                        >
                          <LucideRecycle />
                          ინგრეიდიენტის წაშლა
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between border-t bg-muted/20 px-5 py-3">
              <p className="text-xs text-muted-foreground">
                ნაჩვენებია {filteredData?.length} / {data?.limit} პროდუქტი
              </p>

              <span className="text-xs text-muted-foreground">
                ინგრედიენტების ინვენტარი
              </span>
            </div>
          </div>

          {/* Footer */}

          <div className="flex flex-row items-center justify-center gap-2 py-3">
            <button
              disabled={arrowLeftDisable}
              onClick={() => {
                changePage(-1);

                // = { setArrowLeftDisable };
              }}
              className={`p-2 border-3 border-black/40 bg-neutral-300/10 ${arrowLeftDisable ? "border-transparent" : ""} transition-all hover:border-transparent`}
            >
              <LucideArrowLeft />
            </button>
            <span>
              {data?.page}/{data?.maxPage}
            </span>
            <button
              disabled={arrowRightDisable}
              onClick={() => {
                changePage(+1);
              }}
              className={`p-2 border-3 border-black/40 bg-neutral-300/10 ${arrowRightDisable ? "border-transparent" : ""} transition-all hover:border-transparent`}
            >
              <LucideArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
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
