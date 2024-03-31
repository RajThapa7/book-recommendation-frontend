"use client";

import React from "react";

import StoreProvider from "@/store/provider";
import { AppProgressBar } from "next-nprogress-bar";
import { ToastContextComponent } from "@/lib/toast/ToastProvider";

export interface ChildrenType {
  children: React.ReactNode;
}
export default function ProvidersWrapper({ children }: ChildrenType) {
  return (
    <StoreProvider>
      <ToastContextComponent>
        <AppProgressBar
          height="3px"
          color="#20359e"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {children}
      </ToastContextComponent>
    </StoreProvider>
  );
}
