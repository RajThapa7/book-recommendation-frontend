import React from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";

interface PaginationComponent extends PaginationProps {
  onChange: (pageNumber: number) => void;
  total: number;
  defaultCurrent: number;
}
export default function PaginationComponent({
  onChange,
  total,
  defaultCurrent,
}: PaginationComponent) {
  return (
    <div className="w-max mx-auto mt-4">
      <Pagination
        showQuickJumper
        defaultCurrent={defaultCurrent}
        total={total}
        onChange={onChange}
      />
    </div>
  );
}
