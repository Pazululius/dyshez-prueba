"use client";
import { Button, Link, Tooltip } from "@nextui-org/react";
// import { Icon } from '@iconify/react';
import NextLink from "next/link";
// import { useLogout } from '@/hooks/useLogout';
// import ModalViewLoader from '../loaders/ModalCrudLoader';
// import { MENUS_PER_ROLE } from '@/lib/consts/menus-per-role';
// import { UserContext } from '@/providers/UserProvider';
import { logout } from "@/app/(auth)/logout";
import { fontBold } from "@/app/lib/utils/fonts";
import BagIcon from "@/assets/icons/BagIcon";
import ImageIcon from "@/assets/icons/ImageIcon";
import LogOutIcon from "@/assets/icons/LogOutIcon";
import MarkIcon from "@/assets/icons/MarkIcon";
import PhotoUser from "@/assets/img/photo.png";
import { ADMIN_MENU } from "@/lib/const/userMenu";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidenav() {
  const pathname = usePathname();
  //   const { logout, loading } = useLogout();
  //   const { role } = useContext(UserContext);

  return (
    <>
      <div
        className={` flex flex-col justify-between bg-white w-[60px] min-h-screen h-full`}
      >
        <div className="flex flex-col items-center">
          <div className="m-5">
            <Image width={40} height={40} src={PhotoUser} alt="user-image" />
          </div>
          <div className="mt-10 w-full">
            {ADMIN_MENU.map((option) => {
              const isActive = pathname.includes(option.route);
              return (
                <Tooltip
                  key={option.route}
                  placement="right"
                  color="primary"
                  shadow="lg"
                  showArrow={true}
                  content={
                    <span className={` ${fontBold.className} text-black py-1`}>
                      {option.label}
                    </span>
                  }
                >
                  <Link
                    color="primary"
                    className={`flex gap-4 h-14 items-center   mb-2 !opacity-100`}
                    href={option.route}
                    as={NextLink}
                  >
                    <div className="flex items-center gap-5">
                      <div>{isActive ? <MarkIcon /> : <></>}</div>
                      {option.route === "/orders" ? (
                        <BagIcon color={isActive ? "#E3026F" : "#A6A6A6"} />
                      ) : (
                        <ImageIcon color={isActive ? "#E3026F" : "#9C9C9C"} />
                      )}
                    </div>
                  </Link>
                </Tooltip>
              );
            })}
          </div>
        </div>

        <div>
          <Tooltip
            placement="right"
            color="primary"
            shadow="lg"
            showArrow={true}
            content={
              <span className={`${fontBold.className} text-black py-1`}>
                Cerrar sesión
              </span>
            }
          >
            <Button
              color="primary"
              variant="light"
              className="!flex !gap-0 !px-4 justify-start h-12 items-center text-primary-700 hover:!bg-primary-700 hover:text-white mb-2 w-full rounded-none !min-w-full"
              onClick={() => {
                void logout();
              }}
            >
              <LogOutIcon />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* {loading && <ModalViewLoader message="Cerrando sesión..." />} */}
    </>
  );
}
