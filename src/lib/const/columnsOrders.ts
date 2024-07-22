import { ITableColumn } from "@/app/lib/types/table.types";

export const TABLE_COLS: ITableColumn[] = [
  {
    key: "order_id",
    label: "Order ID",
    allowSorting: true,
    className: "",
  },
  {
    key: "customer_name",
    label: "Customer",
    allowSorting: true,
    className: "",
  },
  {
    key: "date_order",
    label: "Date",
    allowSorting: true,
    className: "",
  },

  {
    key: "time_order",
    label: "Time",
    allowSorting: true,
    className: "",
  },
  {
    key: "mode",
    label: "Mode",
    allowSorting: true,
    className: "",
  },
  {
    key: "total",
    label: "Total",
    allowSorting: true,
    className: "",
  },
  {
    key: "payment_method",
    label: "Payment method",
    allowSorting: true,
    className: "",
  },
  {
    key: "status",
    label: "Status",
    allowSorting: true,
    className: "",
  },
];
