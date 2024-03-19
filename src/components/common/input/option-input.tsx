import React from "react";
import { Select } from "antd";
interface Props {
  onChangeHandler: (value: any) => void;
  value: string;
}
export default function Option({ onChangeHandler, value }: Props) {
  return (
    <div className="flex flex-row gap-2 items-center sort-by">
      <p className="text-link font-link text-black">Sort By</p>
      <Select
        className="cursor-pointer w-44"
        onChange={onChangeHandler}
        value={value}
        options={[
          { value: "average-rating->=3", label: "Rating Greater than 3" },
          { value: "order-asc", label: "Ascending Order" },
          { value: "order-desc", label: "Descending Order" },
          { value: "sort-average-rating", label: "Top Rated" },
        ]}
      />
    </div>
  );
}
