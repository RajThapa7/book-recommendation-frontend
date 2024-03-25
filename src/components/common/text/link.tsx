import Link from "next/link";
import React from "react";
interface Props {
  text: string;
  link: string;
}
export default function LinkTag({ text, link }: Props) {
  return (
    <Link
      className="text-p-sm text-primary underline font-p-sm"
      href={link || "#"}
    >
      {text}
    </Link>
  );
}
