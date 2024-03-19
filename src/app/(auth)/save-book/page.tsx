import React from "react";
import { MetaTags } from "@/contants/meta-data";
import { Metadata } from "next";
import SaveBookComponent from "@/components/pages/(auth)/save-book/save-book";
import Navbar from "@/components/common/navbar/navbar";
import Footer from "@/components/common/footer/footer";
export const metadata: Metadata = MetaTags?.saveBooks;

export default function SaveBook() {
  return (
    <>
      <Navbar />
      <SaveBookComponent />
      <Footer />
    </>
  );
}
