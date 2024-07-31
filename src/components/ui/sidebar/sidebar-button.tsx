import Link from "next/link";
import React, { ReactNode } from "react";

type SidebarButton = {
  text: string;
  icon: ReactNode;
  active?: boolean;
  href: string;
};

const SidebarButton = ({ text, icon, active = false, href }: SidebarButton) => {
  return (
    <Link
      href={`${href}`}
      className={`my-1 flex items-center gap-3 rounded-lg ${
        active ? "bg-muted text-primary" : "text-white"
      } px-3 py-2 transition-all hover:bg-muted hover:text-primary`}
    >
      {icon}
      {text}
    </Link>
  );
};

export default SidebarButton;
