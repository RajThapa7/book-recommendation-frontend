"use client";
import { routes } from "@/contants/routes";
import { sidebarItems } from "@/contants/sidebar-items";
import { deleteAllCookies } from "@/lib/delete-cookies";
import { useToast } from "@/lib/toast/useToast";
import { useLogoutMutation } from "@/store/features/auth/auth.api";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SideBar = () => {
  const router = useRouter();
  const [logoutApiCall] = useLogoutMutation();
  const showToast = useToast();
  const handleLogout = async () => {
    deleteAllCookies();
    const data = await logoutApiCall({});
    if (data?.data) {
      router.push(routes.admin.login);
      showToast({ title: "User Logged Out", type: "success" });
      window.location.reload();
    }
  };
  return (
    <Sider
      width={270}
      style={{
        background: "white",
        height: "100%",
        position: "fixed",
      }}
    >
      <div className="flex flex-col h-[92%]  justify-between">
        <div>
          <SidebarItems />
        </div>
        <div
          className={`py-5 px-5 flex gap-2  hover:bg-[#E6F7FF]  opacity-75 cursor-pointer`}
          onClick={handleLogout}
        >
          <Image
            src={"/icons/menu-icons/logout.svg"}
            width={24}
            height={24}
            alt={""}
          />
          <span className={` text-link text-[#697077] `}>Logout</span>
        </div>
      </div>
    </Sider>
  );
};

const SidebarItems = (_: any) => {
  const path: string = usePathname();
  return (
    <div>
      {sidebarItems.map((sidebarItem, index: number) => {
        return (
          <Link
            key={index}
            href={sidebarItem.link}
            className={`flex no-underline  text-link ${
              path.includes(sidebarItem.link)
                ? "  text-[#1890FF] bg-[#E6F7FF]"
                : " text-[#697077] hover:bg-[#E6F7FF]"
            } gap-4 items-center  cursor-pointer px-5 font-medium`}
          >
            <div className="py-5">
              {path.includes(sidebarItem.link)
                ? sidebarItem.activeIcon
                : sidebarItem.inactiveIcon}
            </div>
            <p className={"transition-all"}>{sidebarItem.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;
