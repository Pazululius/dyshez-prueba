import { font } from "@/app/lib/utils/fonts";
import { extendVariants, Table as NextTable } from "@nextui-org/react";

export const Table: any = extendVariants(NextTable, {
  variants: {
    color: {
      default: {
        base: ["h-full"],
        wrapper: ["p-0", "min-h-[250px]", "h-full"],
        table: ["outline-none"],
        thead: ["m-0", "[&>tr]:!m-0"],
        th: [
          font.className,
          "text-primary",
          "py-5",
          "px-5",
          "bg-white",
          "border-t",
          "border-b",
          "border-neutral-200",
        ],
        tr: ["odd:bg-neutral-100", "even:bg-white", "m-0"],
        td: [
          font.className,
          "text-sm",
          "border-b",
          "text-[#475467]",
          "py-2",
          "px-5",
          "rounded-none",
          "first:before:rounded-none",
          "last:before:rounded-none",
          "border-r ",
          "last:border-r-0",
          "border-neutral-200",
          "whitespace-nowrap",
        ],
      },
    },
  },
  defaultVariants: {
    color: "default",
    labelPlacement: "outside",
    shadow: "none",
  },
});
