import React from "react";

export default function ButtonComponent({
  text,
  type,
  bgColor,
  size,
  btnClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={btnClick}
      className={`${size ?? "font-h1"} rounded-md border border-solid ${
        bgColor ?? "border-black bg-black"
      }  py-2 px-4 text-white hover:scale-105 ease-in-out duration-150 text-btn`}
    >
      {text}
    </button>
  );
}
