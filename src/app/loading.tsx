import LogoFull from "@/assets/img/logo.png";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center">
      <Image src={LogoFull} width={164} height={32} alt="Logo" />
      <div>Cargando...</div>
    </div>
  );
}
