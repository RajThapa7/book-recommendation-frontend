"use client";
import Footer from "@/components/common/footer/footer";
import Navbar from "@/components/common/navbar/navbar";
import { setUserInfo } from "@/store/features/user-info/user-info.slice";
import { getCookie } from "cookies-next";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (getCookie("user")) {
      dispatch(setUserInfo(JSON.parse(getCookie("user")!)));
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-6 w-4/5 mx-auto  py-24 book-container">
        {children}
      </div>
      <Footer />
    </>
  );
}
