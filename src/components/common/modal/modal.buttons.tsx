"use client";
import React from "react";

import { HtmlHTMLAttributes } from "react";

export interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

export const PrimaryButton = ({
  type,
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      {...rest}
      className="capitalize flex w-full min-w-max justify-center rounded-md bg-blue-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 transition-all duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {children}
    </button>
  );
};
export const CancelButton = ({
  type,
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      {...rest}
      className="flex  items-center justify-center gap-2 bg-primary-blue w-full px-3 py-1.5 border border-solid border-[#A2A9B0] bg-transparent rounded text-button text-[#697077] shadow-none hover:cursor-pointer"
    >
      {children}
    </button>
  );
};
