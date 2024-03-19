'use client';
import React from "react";
import LoginForm from "./login-form";

export default function LoginComponent() {
  return (
    <div className="h-screen">
      <LoginForm key={"login-form-key"}/>
    </div>
  );
}
