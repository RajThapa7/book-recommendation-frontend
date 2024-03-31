import React from "react";
import Image from "next/image";
import { Header } from "antd/es/layout/layout";
export default function AdminNavbar() {
  return (
    <Header className="flex items-center justify-between sticky top-0 z-50 py-2 px-6 w-full">
      <div className=" h-full flex items-center">
        <p className="text-white font-semibold text-[20px] tracking-wide">readRadar</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-[6px]">
          <Image
            src={"/icons/profile-image.svg"}
            alt="logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-paragraph text-white ">Admin</span>
        </div>
      </div>
    </Header>
  );
}
