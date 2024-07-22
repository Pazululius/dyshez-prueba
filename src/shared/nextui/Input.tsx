import { extendVariants, Input as NextInput } from "@nextui-org/react";

const Input: any = extendVariants(NextInput, {
  variants: {
    color: {
      default: {
        label: [
          "text-xs",
          "!font-semibold",
          "w-fit",
          "!text-neutral-700",
          "!text-ellipsis",
          "!whitespace-nowrap",
        ],
        inputWrapper: [
          "min-h-[44px]",
          "max-h-[44px]",
          "px-4",
          "border",
          "border-2",
          "!border-[#E7E7E9]",
          "rounded",
          "rounded-full",
          "bg-white",
          "shadow-none",
          'data-[disabled="true"]:!opacity-100',
        ],
        input: ["font-normal", "text-sm", "placeholder:text-neutral-600"],
        description: ["text-xs", "text-neutral-700"],
      },
    },
    isReadOnly: {
      true: {
        inputWrapper: "border-neutral-400 bg-neutral-200",
      },
    },
    isDisabled: {
      true: {
        base: "!opacity-100",
        inputWrapper: "border-neutral-400 bg-neutral-200",
      },
    },
  },
  defaultVariants: {
    color: "default",
    variant: "bordered",
    labelPlacement: "outside",
  },
});

export default Input;
