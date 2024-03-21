import Footer from "@/components/common/footer/footer";
import Navbar from "@/components/common/navbar/navbar";
import SaveBookComponent from "@/components/pages/(auth)/save-book/save-book";
import { MetaTags } from "@/contants/meta-data";
import { Metadata } from "next";
export const metadata: Metadata = MetaTags?.saveBooks;

export default function SaveBook() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SaveBookComponent />
      <Footer />
    </div>
  );
}
