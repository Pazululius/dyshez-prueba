import { fontBold } from "@/app/lib/utils/fonts";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import Input from "../nextui/Input";

const FormUser = ({
  control,
  controlName,
  label,
  placeholder,
  disabled = false,
  icon,
  rules,
  ...inputProps
}: {
  control: Control<any, any>;
  controlName: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  icon: any;
  rules: Partial<RegisterOptions>;
}) => {
  return (
    <Controller
      name={controlName}
      control={control}
      rules={rules}
      render={({ field, fieldState: { invalid } }) => {
        return (
          <Input
            className={`${fontBold.className} `}
            label={label}
            placeholder={placeholder}
            isInvalid={invalid}
            isDisabled={disabled}
            startContent={icon}
            {...inputProps}
            {...field}
          />
        );
      }}
    />
  );
};
export default FormUser;
