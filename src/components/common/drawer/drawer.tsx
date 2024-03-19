import React from "react";
import { Drawer } from "antd";
import Link from "next/link";
import { routes } from "@/contants/routes";
interface DrawerProps {
  onClose: () => void;
  open: boolean;
}
export default function DrawerComponent({ onClose, open }: DrawerProps) {
  return (
    <Drawer title="reaDRadar" onClose={onClose} open={open}>
      <div className="flex flex-col gap-4">
        <Link
          href={routes?.auth?.save_book}
          className="text-xl font-semibold text-blue-800 uppercase"
        >
          Saved Books
        </Link>
        <Link
          href={routes?.auth?.save_book}
          className="text-xl font-semibold text-red-600 uppercase"
        >
          Log-out
        </Link>
      </div>
    </Drawer>
  );
}
