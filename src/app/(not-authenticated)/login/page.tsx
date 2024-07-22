/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { font, fontBold, fontSemiBold, fontTitle } from "@/app/lib/utils/fonts";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import Emailicon from "@/assets/icons/Emailicon";
import FacebookLogoIcon from "@/assets/icons/FacebookLogoIcon";
import GoogleLogoIcon from "@/assets/icons/GoogleLogoIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import PhoneMobileIcon from "@/assets/icons/PhoneMobileIcon";
import UserIcon from "@/assets/icons/UserIcon";
import WebIcon from "@/assets/icons/WebIcon";
import FormMail from "@/shared/forms/FormMail";
import FormPassword from "@/shared/forms/FormPassword";
import FormUser from "@/shared/forms/FormUser";
import { Button, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import bgLogin from "../../../assets/img/backgroundLogin.png";
import {
  login,
  loginFacebookAuth,
  loginGoogleAuth,
  redirectOauth,
  signup,
} from "./login";

interface LoginInputs {
  password: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  secundary_phone?: string;
  web_site?: string;
}

const LoginPage = ({
  searchParams,
}: {
  searchParams: { message: string; code: string };
}) => {
  const { control, handleSubmit, getValues } = useForm<LoginInputs>({
    mode: "onSubmit",
    defaultValues: {
      password: "",
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      secundary_phone: "",
      web_site: "",
    },
    shouldUnregister: true,
  });
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const register: SubmitHandler<LoginInputs> = (data): void => {
    // setLoading(true);
    void signup({
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      web_site: data.web_site,
    });
  };
  const loginForm: SubmitHandler<LoginInputs> = (data): void => {
    // setLoading(true);
    void login({ email: data.email, password: data.password });
  };
  const loginGoogle = () => {
    // setLoading(true);
    void loginGoogleAuth();
  };
  const loginFacebook = (): void => {
    // setLoading(true);
    void loginFacebookAuth();
  };

  useEffect(() => {
    if (searchParams?.code) {
      void redirectOauth(searchParams.code);
    }
  }, []);

  return (
    <div className="bg-white w-4/5 min-h-full shadow-xl flex !overflow-hidden">
      <div
        className={`${
          !showRegister ? "w-2/5" : "w-full transition-transform"
        } h-full p-5`}
      >
        <div className="flex justify-between">
          <Button
            disabled={!showRegister}
            className={`${fontTitle.className} ${
              !showRegister
                ? `text-black border-b-black border-b-4`
                : `text-gray-300 hover:cursor-pointer`
            } text-2xl`}
            onClick={() => {
              if (showRegister) setShowRegister(!showRegister);
            }}
          >
            Login
          </Button>
          <Button
            disabled={showRegister}
            className={`${fontTitle.className} ${
              showRegister
                ? `text-black border-b-black border-b-4 `
                : `text-gray-300 hover:cursor-pointer`
            } text-2xl`}
            onClick={() => {
              if (!showRegister) setShowRegister(!showRegister);
            }}
          >
            Register
          </Button>
        </div>
        {!showRegister ? (
          <div className="flex flex-col h-full justify-between p-10">
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center outline-yellow-500 rounded-md outline outline-2">
                {searchParams.message}
              </p>
            )}
            <div className="flex flex-col justify-center mt-10">
              <span className={`${fontSemiBold.className} text-center`}>
                Ingresa con tu correo electrónico o tu número de teléfono
              </span>
              <form
                onSubmit={(...args) => {
                  void handleSubmit(loginForm)(...args);
                }}
                className="mt-20 flex flex-col gap-5 items-center"
              >
                <FormMail
                  control={control}
                  rules={{ required: true }}
                  controlName="email"
                  placeholder="Correo o teléfono"
                />
                <FormPassword
                  control={control}
                  rules={{ required: true }}
                  controlName="password"
                  placeholder="Contraseña"
                  // isDisabled={loading}
                />
                <Button
                  className={`${fontBold.className} text-white h-12 bg-button-login rounded-full w-1/2 mt-10`}
                  type="submit"
                >
                  Continuar <ArrowRightIcon />
                </Button>
                <span
                  className={`${fontSemiBold.className} text-center text-[#797979]`}
                >
                  ¿Cambiaste tu teléfono?
                </span>
              </form>
            </div>
            <div className="flex justify-center gap-5 mb-20">
              {/* <Button className="bg-[#F4F4F4]  h-14 flex justify-center  items-center w-24 rounded-full">
                <AppleLogoIcon />
              </Button> */}
              <Button
                onClick={loginGoogle}
                className="bg-[#F4F4F4]  h-14 flex  justify-center items-center w-24  rounded-full"
              >
                <GoogleLogoIcon />
              </Button>
              <Button
                onClick={loginFacebook}
                className="bg-[#F4F4F4]  h-14 flex justify-center items-center w-24  rounded-full"
              >
                <FacebookLogoIcon />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full justify-between p-10">
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center outline-green-500 rounded-md outline outline-2">
                {searchParams.message}
              </p>
            )}
            <form
              onSubmit={(...args) => {
                void handleSubmit(register)(...args);
              }}
              className="flex flex-col justify-center items-center mt-10"
            >
              <span className={`${fontSemiBold.className} text-center`}>
                Únete a la revolución, para comenzar a utilizar la plataforma
                ingresa los siguientes datos y se parte del movimiento de
                Dyshez.
              </span>
              <div className="flex flex-row gap-2 mt-10">
                <div className="w-1/2 flex flex-col gap-5">
                  <FormUser
                    control={control}
                    rules={{ required: true }}
                    controlName="first_name"
                    placeholder="Nombre(s)*"
                    icon={<UserIcon />}
                  />
                  <FormUser
                    control={control}
                    rules={{ required: true }}
                    controlName="phone"
                    placeholder="3323408165"
                    icon={
                      <div className="flex items-center">
                        <PhoneMobileIcon />
                        <span
                          className={`${fontSemiBold.className} text-center`}
                        >
                          +52
                        </span>
                      </div>
                    }
                  />
                  <FormUser
                    control={control}
                    rules={{ required: true }}
                    controlName="web_site"
                    placeholder="Sitio web"
                    icon={<WebIcon />}
                  />
                  <FormPassword
                    control={control}
                    rules={{ required: true }}
                    controlName="password"
                    placeholder="Contraseña"
                    // isDisabled={loading}
                  />
                </div>
                <div className="w-1/2 flex flex-col gap-5">
                  <FormUser
                    control={control}
                    rules={{ required: true }}
                    controlName="last_name"
                    placeholder="Apellidos*"
                    icon={<UserIcon />}
                  />
                  <FormUser
                    control={control}
                    rules={{ required: true }}
                    controlName="aux_phone"
                    placeholder="3323408165"
                    icon={
                      <div className="flex items-center">
                        <PhoneIcon />
                        <span
                          className={`${fontSemiBold.className} text-center`}
                        >
                          +52
                        </span>
                      </div>
                    }
                  />
                  <FormUser
                    control={control}
                    rules={{ required: true }}
                    controlName="email"
                    placeholder="Email *"
                    icon={<Emailicon />}
                  />
                  <FormPassword
                    control={control}
                    rules={{ required: true }}
                    controlName="verify_password"
                    placeholder="Verificar contraseña"
                    // isDisabled={loading}
                  />
                </div>
              </div>
              <div className="mt-10">
                <Checkbox color="danger" />
                <span className={`${fontSemiBold.className} text-center`}>
                  Acepto los términos y condiciones
                </span>
              </div>
              <Button
                className={`${fontBold.className} text-white h-12 bg-button-login rounded-full w-1/4 mt-10`}
                type="submit"
              >
                Crear cuenta <ArrowRightIcon />
              </Button>
              <span
                className={`${font.className} text-center mt-10 text-[#797979]`}
              >
                Si ya tienes un restaurante en Dyshez y quieres agregar una
                nueva sucursal, conoce cómo hacerlo
              </span>
            </form>
          </div>
        )}
      </div>
      <div
        className={` bg-[#F6F6F6] ${
          showRegister ? "w-0" : "w-3/5 !overflow-hidden"
        } `}
      >
        <div
          className={`hidden lg:block w-full h-full !bg-cover !bg-bottom !bg-no-repeat`}
          // className="hidden lg:block w-full !bg-cover !bg-bottom !bg-no-repeat"
          style={{
            background: `
            url('${bgLogin.src}')`,
          }}
        ></div>
      </div>
    </div>
  );
};
export default LoginPage;
