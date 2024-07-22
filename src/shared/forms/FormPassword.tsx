import { fontBold } from "@/app/lib/utils/fonts";
import EyeIcon from "@/assets/icons/EyeIcon";
import PasswordIcon from "@/assets/icons/PasswordIcon";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import Input from "../nextui/Input";

const FormPassword = ({
  control,
  controlName,
  rules,
  label,
  placeholder,
  disabled = false,
  hasTooltip = false,
  tooltipType = "",
  ...inputProps
}: {
  control: Control<any, any>;
  controlName: string;
  rules: Partial<RegisterOptions>;
  label?: string;
  placeholder: string;
  disabled?: boolean;
  hasTooltip?: boolean;
  tooltipType?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [touched, setTouched] = useState(false);
  return (
    <Controller
      name={controlName}
      control={control}
      rules={rules}
      render={({
        field: { onBlur, ...field },
        fieldState: { invalid, error },
      }) => (
        <div className="w-full">
          <Input
            className={`${fontBold.className} `}
            label={label}
            placeholder={placeholder}
            type={isVisible ? "text" : "password"}
            labelPlacement="outside"
            isInvalid={invalid}
            isDisabled={disabled}
            startContent={<PasswordIcon />}
            onFocus={() => {
              setTouched(true);
              onBlur();
            }}
            onBlur={() => {
              setTouched(false);
            }}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
              >
                {isVisible ? (
                  <EyeIcon className="pointer-events-none text-primary text-2xl" />
                ) : (
                  <EyeIcon className="pointer-events-none text-primary text-2xl" />
                )}
              </button>
            }
            {...inputProps}
            {...field}
          />

          <Tooltip
            isOpen={touched && invalid && hasTooltip}
            placement="bottom-start"
            shadow="lg"
            content={
              <>
                {tooltipType === "criteria" && (
                  <div className="p-2">
                    <p className="text-xs font-bold mb-2">
                      La contraseña debe cumplir con <br /> los siguientes
                      criterios:
                    </p>
                    <ul className="list-disc text-xs ml-4">
                      <li
                        className={
                          field.value.match(/(?=.*\d).*$/) !== null
                            ? "text-green-700 font-semibold"
                            : ""
                        }
                      >
                        Un número
                      </li>
                      <li
                        className={
                          field.value.match(/(?=.*[A-Z]).*$/) !== null
                            ? "text-green-700 font-semibold"
                            : ""
                        }
                      >
                        Una letra mayúscula
                      </li>
                      <li
                        className={
                          field.value.match(/(?=.*[a-z]).*$/) !== null
                            ? "text-green-700 font-semibold"
                            : ""
                        }
                      >
                        Una letra minúsula
                      </li>
                      <li
                        className={
                          field.value.match(/.{8,}$/) !== null
                            ? "text-green-700 font-semibold"
                            : ""
                        }
                      >
                        Mínimo 8 carácteres
                      </li>
                    </ul>
                  </div>
                )}

                {tooltipType === "match" && (
                  <div className="p-2">
                    <p className="text-xs font-bold">
                      Las contraseñas no coinciden.
                    </p>
                  </div>
                )}
              </>
            }
          >
            <div className="w-full"></div>
          </Tooltip>
        </div>
      )}
    />
  );
};
export default FormPassword;
