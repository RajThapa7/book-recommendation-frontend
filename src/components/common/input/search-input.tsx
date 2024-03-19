import Image from "next/image";
import React from "react";
import { SearchInputProps } from "./index.interface";

export default function SearchInput({
  value,
  id,
  name,
  onChange,
}: SearchInputProps) {
  return (
    <div className="flex flex-row gap-2 items-end">
      <input
        className="text-p text-grey font-p bg-white w-80 px-2 py-3 pr-0 outline-none border-b border-solid border-black search-input"
        type="text"
        value={value}
        name={name}
        id={id}
        onChange={onChange}
        placeholder="Search by book title, book author"
      />
      <button type="submit" className="bg-black p-2 rounded-md">
        <Image
          src="/icons/search-icon.svg"
          alt="search-icon"
          width={19}
          height={19}
        />
      </button>
    </div>
  );
}
