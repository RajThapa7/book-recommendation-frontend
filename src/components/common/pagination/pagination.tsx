import type { PaginationProps } from "antd";
import { Pagination } from "antd";

interface PaginationComponent extends PaginationProps {
  onChange: (pageNumber: number) => void;
  total: number;
  defaultCurrent: number;
  onPageSizeChange: (current: number, size: number) => void;
}
export default function PaginationComponent({
  onChange,
  total,
  defaultCurrent,
  onPageSizeChange,
}: PaginationComponent) {
  return (
    <div className="w-max mx-auto mt-4">
      <Pagination
        showQuickJumper
        // pageSize={pageSize}
        onShowSizeChange={onPageSizeChange}
        defaultCurrent={defaultCurrent}
        total={total}
        onChange={onChange}
      />
    </div>
  );
}
