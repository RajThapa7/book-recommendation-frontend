import React from "react";
import SignUpForm from "./signup-form";
import SideContent from "./side-content";

export default function SignUpComponent() {
  return (
    <div className="h-screen grid grid-cols-2">
      <SideContent />
      <SignUpForm key={"sign-up-form"} />
    </div>
  );
}
