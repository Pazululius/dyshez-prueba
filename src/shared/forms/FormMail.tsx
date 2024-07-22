import { fontBold } from "@/app/lib/utils/fonts";
import { MailIcon } from "@/assets/icons/MailIcon";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import Input from "../nextui/Input";

const FormMail = ({
  control,
  controlName,
  label,
  placeholder,
  disabled = false,
  rules,
  ...inputProps
}: {
  control: Control<any, any>;
  controlName: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
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
            type="email"
            isInvalid={invalid}
            isDisabled={disabled}
            startContent={<MailIcon />}
            {...inputProps}
            {...field}
          />
        );
      }}
    />
  );
};
export default FormMail;
