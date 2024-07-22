import { ITableColumn } from "@/app/lib/types/table.types";
import {
  getKeyValue,
  Spinner,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type TableProps,
} from "@nextui-org/react";
import { PropsWithChildren } from "react";
import { Table } from "../nextui/Table";

interface TablePageProps {
  cols: ITableColumn[];
  data: any[];
  loading: boolean;
  tableProps: Partial<TableProps>;
  redirectParentLink?: string;
  lastColFullwidth?: boolean;
}
const TablePage = ({
  cols,
  data,
  loading,
  tableProps,
  redirectParentLink,
  lastColFullwidth = false,
}: PropsWithChildren<TablePageProps>) => {
  return (
    <Table aria-label="Tabla" {...tableProps}>
      <TableHeader columns={cols}>
        {(column) => (
          <TableColumn
            key={column.key}
            allowsSorting={column.allowSorting}
            className={`${column.allowSorting ? "!text-primary-600" : ""} ${
              column?.className ?? ""
            }`}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={data ?? []}
        emptyContent={
          !loading && (
            <div className="pt-6">No hay resultados con estos criterios.</div>
          )
        }
        isLoading={loading}
        loadingContent={<Spinner className="pt-14" label="Cargando..." />}
      >
        {(item) => (
          <TableRow key={item?.guid ?? "error-guid"}>
            {cols.map((col) => (
              <TableCell key={col.key}>
                <div className={`flex gap-1 items-center `}>
                  {col.startContent ?? null}

                  {col.key === "status" && (
                    <div
                      style={
                        item.status
                          ? {
                              background: "#DEF2E6",
                              width: "60%",
                              borderRadius: "20px",
                              color: "#11845B",
                              textAlign: "center",
                            }
                          : {
                              background: "#FFEFF0",
                              width: "60%",
                              color: "#DC2B2B",
                              textAlign: "center",
                              borderRadius: "20px",
                            }
                      }
                    >
                      <b>{item.status ? "Accepted" : "Rejected"}</b>
                    </div>
                  )}
                  {col.key === "total" && <div>{`$${item.total}`}</div>}

                  {col.key !== "status" &&
                    col.key !== "total" &&
                    (col.customcol !== undefined
                      ? col.customcol(item)
                      : col.formatter !== undefined
                      ? col.formatter(item)
                      : getKeyValue(item, col.key) ?? "-")}
                  {}
                </div>
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default TablePage;
