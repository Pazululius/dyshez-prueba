import {
  Checkbox,
  extendVariants,
  Select as NextSelect,
  SelectItem,
  type SelectProps,
} from "@nextui-org/react";
import { forwardRef } from "react";

export const SelectVariant: any = extendVariants(NextSelect, {
  variants: {
    color: {
      default: {
        label: ["text-xs", "!font-semibold", "w-fit", "!text-neutral-700"],
        trigger: [
          "min-h-[44px]",
          "max-h-[44px]",
          "py-2",
          "px-4",
          "border",
          "border-neutral-400",
          "rounded",
          "bg-white",
          "shadow-none",
          "data-[hover=true]:border-primary-400",
          "data-[focus=true]:border-primary",
          "data-[open=true]:border-primary",
        ],
        value: [
          "font-normal",
          "text-sm",
          "opacity-1",
          "group-data-[filled=true]:text-black",
        ],
      },
    },
    isDisabled: {
      true: {
        base: "!opacity-100",
        trigger: "border-neutral-400 bg-neutral-200",
      },
    },
  },
  defaultVariants: {
    color: "default",
    variant: "bordered",
    labelPlacement: "outside",
  },
});

export interface ISelectOption {
  value: string;
  label: string;
}

const Select = forwardRef(function Select(
  { items, ...selectProps }: Partial<SelectProps>,
  ref
) {
  return (
    <SelectVariant
      listboxProps={{
        itemClasses: {
          base: [
            "group",
            "capitalize",
            "text-primary-800",
            "data-[selected=true]:!bg-primary",
            "data-[selected=true]:!text-white",
            "data-[selectable=true]:focus:bg-primary-100",
            "data-[hover=true]:bg-primary-100",
            "data-[hover=true]:text-primary-700",
            [selectProps.selectionMode === "multiple" ? "gap-0" : ""],
          ],
          title: "group-data-[selected=true]:!font-semibold",
          selectedIcon: [selectProps.selectionMode === "multiple" ? "w-0" : ""],
        },
      }}
      ref={ref}
      scrollShadowProps={{
        hideScrollBar: false,
        isEnabled: false,
      }}
      {...selectProps}
    >
      {(items as ISelectOption[])?.map((item: any) => (
        <SelectItem key={item.value} textValue={item.label}>
          <div className="flex gap-2">
            {selectProps.selectionMode === "multiple" && (
              <Checkbox
                color="default"
                classNames={{
                  wrapper: "after:!bg-white",
                  icon: "!text-primary-600",
                }}
                isSelected={
                  ((selectProps?.selectedKeys ?? null) as Set<string>)?.has(
                    item.value
                  ) ?? false
                }
                className="pointer-events-none"
              />
            )}
            {item.label}
          </div>
        </SelectItem>
      ))}
    </SelectVariant>
  );
});

export default Select;
