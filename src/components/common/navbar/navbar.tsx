"use client";
import React, { useState } from "react";
import Image from "next/image";
import { routes } from "@/contants/routes";
import { getToken } from "@/lib/getToken";
import { useLogoutMutation } from "@/store/features/auth/auth.api";
import DrawerComponent from "../drawer/drawer";
import { useRouter } from "next-nprogress-bar";
import { deleteAllCookies } from "@/lib/delete-cookies";
import { useToast } from "@/lib/toast/useToast";

export default function Navbar() {
  const toast = useToast();
  const router = useRouter();
  const [logoutApiCall] = useLogoutMutation();
  const [breadCrum, setBreadCrum] = useState<boolean>(false);
  const logoutHandler = async () => {
    deleteAllCookies();
    const data = await logoutApiCall({});
    if (data?.data) {
      router.replace(routes.auth.login);
      toast({ title: "User Logged Out", type: "success" });
      window.location.reload();
    }
  };
  return (
    <div
      className="px-20 py-6 flex flex-row justify-between items-center sticky top-0 left-0 z-20 nav-header"
      style={{
        background: "linear-gradient(0deg, #050A24 0%, #050A24 100%), #D9D9D9",
      }}
    >
      <Image
        alt="logo"
        width={195}
        height={28}
        src={"/images/logo.png"}
        className="cursor-pointer"
        onClick={() => router.push(routes.book.book)}
      />
      <div className="large-screen-nav">
        {!getToken() ? (
          <div className="flex flex-row gap-4">
            <p
              className="text-white cursor-pointer uppercase text-btn font-p-sm"
              onClick={() => router.push(routes?.auth?.login)}
            >
              Login
            </p>
            <p
              className="text-white uppercase cursor-pointer text-btn font-p-sm"
              onClick={() => router.push(routes?.auth?.signup)}
            >
              Sign up
            </p>
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            <p
              className="text-white cursor-pointer uppercase text-btn font-p-sm"
              onClick={() => router.push(routes?.admin?.login)}
            >
              Admin Panel
            </p>
            <p
              className="text-white cursor-pointer uppercase text-btn font-p-sm"
              onClick={() => router.push(routes?.auth?.save_book)}
            >
              Saved Books
            </p>
            <p
              onClick={logoutHandler}
              className="text-white uppercase cursor-pointer text-btn font-p-sm"
            >
              Logout
            </p>
          </div>
        )}
      </div>
      <div
        className=" flex-col gap-1 hidden breadcrumb"
        onClick={() => setBreadCrum(true)}
      >
        <div className="w-6 h-1 bg-white"></div>
        <div className="w-6 h-1 bg-white"></div>
        <div className="w-6 h-1 bg-white"></div>
      </div>
      <DrawerComponent onClose={() => setBreadCrum(false)} open={breadCrum} />
    </div>
  );
}
