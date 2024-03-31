"use client";
import React from "react";
import { Layout } from "antd";
import AdminNavbar from "./Navbar";
import SideBar from "./SideBar";
import {
  CancelButton,
  PrimaryButton,
} from "@/components/common/modal/modal.buttons";
import { useRouter } from "next-nprogress-bar";
import { routes } from "@/contants/routes";

const { Content } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div>
      <AdminNavbar />
      <Layout className="h-[100%] w-full">
        <SideBar />
        <Content className="pl-[270px]">
          <div className="w-max ml-6 mt-4">
            <CancelButton onClick={() => router.replace(routes.book.book)}>
              Go back
            </CancelButton>
          </div>
          {children}
        </Content>
      </Layout>
    </div>
  );
};

export default AdminLayout;
