"use client";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="text-center h-screen flex flex-col justify-center gap-1">
      <h1 className="mb-4 text-8xl font-semibold text-red-500">404</h1>
      <p className="mb-4 text-2xl text-gray-600">
        Oops! Looks like you&apos;re lost.
      </p>
      <div className="animate-bounce">
        <svg
          className="mx-auto h-24 w-32 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p className="mt-4 text-gray-600 text-xl">
        Let&apos;s get you back{" "}
        <a href="/" className="text-blue-500">
          Home
        </a>
        .
      </p>
    </div>
  );
}
