"use client";
import { font, fontSemiBold } from "@/app/lib/utils/fonts";
import { UserContext } from "@/providers/userProvider";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { uploadImg } from "./pictures";

const PicturesPage = () => {
  const { user } = useContext(UserContext);
  const [imgSel, setImgSel] = useState<any>(null);
  const files = useRef<any>();

  const updateImg = async (e: any) => {
    const data = await uploadImg(e);
    if (data) {
    }
  };

  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="">
      <span className={`${fontSemiBold.className} text-[28px]`}>Pictures</span>
      <div className="flex gap-5 h-full ">
        <div className="w-1/2">
          <div className=" w-32 h-32  flex justify-center items-center">
            <Button
              title="+"
              name="file"
              className={`${font.className} hover:cursor-pointer text-center rounded-lg border border-gray-400 text-3xl text-gray-400 w-full h-full `}
              onClick={() => {
                files.current.click();
              }}
            >
              +
            </Button>
            <input
              name="file"
              id="files"
              ref={files}
              className={`${font.className} hover:cursor-pointer text-center rounded-lg border border-gray-400 text-3xl text-gray-400 w-full h-full hidden`}
              type="file"
              onChange={(data) => {
                if (data.target.files?.[0]) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setImgSel(e.target?.result);
                    console.log(e.target?.result);

                    void updateImg(data.target.files?.[0]);
                  };
                  reader.readAsDataURL(data.target.files?.[0]);
                }
              }}
            />
          </div>
        </div>
        <div className="w-1/2 bg-[#F4F4F4]">
          {imgSel !== null && (
            <div className="flex flex-col py-10  gap-10 items-center justify-around">
              <div className="text-center">
                <b className={`${font.className} text-base`}>PREVIEW 1:1</b>
                <div
                  style={{ background: imgSel }}
                  className="w-[163.5px] h-[163.5px] bg-white rounded-xl relative"
                >
                  <Image
                    fill
                    objectFit="cover"
                    src={imgSel}
                    alt="Dyshez"
                    className="rounded-xl"
                  ></Image>
                </div>
              </div>
              <div className="text-center">
                <b className={`${font.className} text-base`}>PREVIEW 16:9</b>
                <div className="w-[256.5px] h-[144px] bg-white rounded-xl  relative">
                  <Image
                    fill
                    objectFit="cover"
                    src={imgSel}
                    alt="Dyshez"
                    className="rounded-xl"
                  ></Image>
                </div>
              </div>
              <div className="text-center">
                <b className={`${font.className} text-base`}>PREVIEW 9:16</b>
                <div className="w-[144px] h-[256.5px] bg-white rounded-xl relative">
                  <Image
                    fill
                    objectFit="cover"
                    src={imgSel}
                    alt="Dyshez"
                    className="rounded-xl"
                  ></Image>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PicturesPage;
