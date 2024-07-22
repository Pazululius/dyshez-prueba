/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { fontSemiBold } from "@/app/lib/utils/fonts";
import { TABLE_COLS } from "@/lib/const/columnsOrders";
import { UserContext } from "@/providers/userProvider";
import TableFooter from "@/shared/table/TableFooter";
import TablePage from "@/shared/table/TablePage";
import { createClient } from "@/utils/supabase/client";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const OrdersPage = () => {
  const { user } = useContext(UserContext);

  const [data, setData] = useState<any>([]);
  const [infoPagination, setInfoPagination] = useState<any>({
    countTotal: 0,
    pages: 1,
    selectedPage: 1,
  });
  const [initialVal, setInitialVal] = useState<number>(0);
  const [dataFilter, setDataFilter] = useState<any>([]);
  const [filters, setFilters] = useState([
    { key: "all", label: "All", active: true },
    { key: "accepted", label: "Accepted", active: false },
    { key: "rejected", label: "Rejected", active: false },
  ]);

  const obtainData = async (initial: number, last: number) => {
    const supabase = createClient();
    const response = await supabase
      .from("orders")
      .select("*")
      .range(initial, last);
    if (!response.error) {
      setData(response.data);
      setDataFilter(response.data);
    }
  };
  const obtainPagination = async (selectedPage: number) => {
    const supabase = createClient();
    const response = await supabase.from("orders").select("count");
    if (!response.error) {
      const { count } = response.data?.[0];
      setInfoPagination({
        countTotal: count,
        pages: Math.ceil(count / 10),
        selectedPage: selectedPage,
      });
    }
  };
  useEffect(() => {
    void obtainPagination(1);
    void obtainData(0, 9);
  }, []);
  if (!user) {
    return redirect("/login");
  }
  return (
    <div>
      <div>
        <span className={`${fontSemiBold.className} text-[28px]`}>Orders</span>
      </div>
      <div>
        <Card className="mt-10 mb-16 rounded-md shadow-[0_0px_10px_rgba(0,0,0,0.20)] ">
          <CardBody className="p-0">
            <div className="pt-5 px-5 flex items-center gap-5">
              <b className={` ${fontSemiBold.className} text-[#101828]`}>
                Number of orders
              </b>
              <div className="flex gap-2">
                {filters.map((button) => (
                  <Button
                    key={button.key}
                    className={
                      button.active
                        ? "rounded-full min-w-10 h-10 text-button-login border-title-login border"
                        : "rounded-full min-w-10 h-10 text-gray-400 border-gray-400 border"
                    }
                    onClick={() => {
                      setDataFilter(
                        button.key === "all"
                          ? data
                          : button.key === "accepted"
                          ? data.filter((d: any) => d.status)
                          : data.filter((d: any) => !d.status)
                      );
                      setFilters((oldFilters) => {
                        return oldFilters.map((fil) => {
                          if (fil.key === button.key) {
                            return { ...fil, active: true };
                          } else {
                            return { ...fil, active: false };
                          }
                        });
                      });
                    }}
                  >
                    {button.key !== "all" ? (
                      <b>{`${button.label} (${
                        button.key === "accepted"
                          ? data.filter((d: any) => d.status).length
                          : data.filter((d: any) => !d.status).length
                      })`}</b>
                    ) : (
                      <b>{button.label}</b>
                    )}
                  </Button>
                ))}
              </div>
            </div>
            <TablePage
              data={dataFilter}
              loading={false}
              redirectParentLink="/administradores/"
              tableProps={
                {
                  // sortDescriptor: tableSort,
                  // onSortChange: (e: SortDescriptor) => {
                  //   handleSortChange(e);
                  // },
                }
              }
              cols={TABLE_COLS}
            />
            <CardFooter>
              <TableFooter
                paginationProps={{
                  page: infoPagination.selectedPage,
                  total: infoPagination.pages,
                  onChange: (page) => {
                    const initialIndex = page === 1 ? 0 : (page - 1) * 10;
                    const lastIndex = page === 1 ? 9 : (page - 1) * 10 + 9;

                    void obtainData(initialIndex, lastIndex);
                  },
                }}
              ></TableFooter>
            </CardFooter>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default OrdersPage;
