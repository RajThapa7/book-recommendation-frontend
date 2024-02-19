"use client";

import React from "react";

import StoreProvider from "@/store/provider";

export interface ChildrenType {
  children: React.ReactNode;
}
export default function ProvidersWrapper({ children }: ChildrenType) {
  return <StoreProvider>{children}</StoreProvider>;
}
