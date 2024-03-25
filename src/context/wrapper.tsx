"use client";

import React from "react";

import StoreProvider from "@/store/provider";
import { AppProgressBar } from "next-nprogress-bar";

export interface ChildrenType {
  children: React.ReactNode;
}
export default function ProvidersWrapper({ children }: ChildrenType) {
  return (
    <StoreProvider>
      <AppProgressBar
        height="3px"
        color="red"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </StoreProvider>
  );
}
