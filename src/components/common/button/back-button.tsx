"use client";
import React from "react";
import { routes } from "@/contants/routes";
import { useRouter } from "next-nprogress-bar";

export default function BackButton() {
  const navigate = useRouter();
  return (
    <button
      type="button"
      onClick={() => navigate.push(routes.book.book)}
      className="underline font-link text-p text-primary"
    >
      Go Back
    </button>
  );
}
