import { ReactNode } from "react";

export interface ITableColumn {
  key: string;
  label: string;
  allowSorting: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  className?: string;
  formatter?: (param: any) => string;
  customcol?: (row: any) => ReactNode;
}
