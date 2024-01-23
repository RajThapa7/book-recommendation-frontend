import React from "react";
interface Props {
  onChangeHandler: (value: any) => void;
}
export default function Option({ onChangeHandler }: Props) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <p className="text-link font-link text-black">Sort By</p>
      <select className="cursor-pointer" onChange={onChangeHandler}>
        <option value={"no"}>Select Filter By</option>
        <option value={"order-asc"}>Ascending Order</option>
        <option value={"order-desc"}>Descending Order</option>
        <option value={"sort-average_rating"}>Top Rated</option>
        <option value={"average_rating->=3"}>Rating Greater than 3</option>
      </select>
    </div>
  );
}
