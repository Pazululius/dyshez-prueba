"use client";

import Image from "next/image";
import LogoD from "../../assets/img/logo.png";
import { fontTitle } from "../lib/utils/fonts";

export default function NotAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-w-screen min-h-screen h-full overflow-x-hidden flex p-20 bg-white">
      <div className="flex flex-col w-3/5">
        <Image
          className="w-[194px] h-[47.15px]"
          src={LogoD}
          alt="Dyshez"
        ></Image>
        <p className={`${fontTitle.className} text-title-login mt-7`}>
          ¡Bienvenido de vuelta!
        </p>
      </div>
      {children}
    </div>
  );
}
