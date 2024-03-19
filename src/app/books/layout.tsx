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
      {children}
      <Footer />
    </>
  );
}
