"use client";
import React from "react";

import CusTable from "@/components/common/table/Table";
import { useGetAllUserQuery } from "@/store/features/admin/user/user.api";

const UserComponent = () => {
  const { data, isLoading } = useGetAllUserQuery({
    refetchOnMountOrArgChange: true,
  });

  const sampleColumns = [
    {
      title: "SN",
      dataIndex: "index",
      key: "index",
      width: 70,
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <div className="p-[20px] min-h-screen">
      <div className="flex justify-between items-center mb-3 items-center">
        <p className="font-semibold text-[25px]">Users</p>
      </div>
      <CusTable
        columns={sampleColumns}
        dataSource={data?.data
          ?.slice()
          ?.sort((a: { id: number }, b: { id: number }) => a?.id - b?.id)
          ?.map((p: any, index: number) => {
            return {
              id: p?.id,
              username: p?.username,
              email: p?.email,
              index: index + 1,
            };
          })}
        loading={isLoading}
        bordered={true}
        sticky={true}
      />
    </div>
  );
};
export default UserComponent;
