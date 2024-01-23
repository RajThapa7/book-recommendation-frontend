import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar/navbar";
import React from "react";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
