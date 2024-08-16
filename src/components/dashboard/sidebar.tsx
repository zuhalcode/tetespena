import { Newspaper, UserRoundPen } from "lucide-react";
import Link from "next/link";

import SidebarButton from "./sidebar-button";
import Image from "next/image";
import { ReactNode } from "react";

type SubmenuProps = {
  name: string;
  href: string;
};

type MenuProps = {
  name: string;
  href?: string;
  icon?: ReactNode;
  children?: SubmenuProps[];
};

const menus: MenuProps[] = [
  {
    name: "profile",
    href: "/dashboard/profile",
    icon: <UserRoundPen className="h-5 w-5" />,
    children: [
      {
        name: "general",
        href: "/dashboard/profile",
      },
      {
        name: "picture",
        href: "/dashboard/profile/picture",
      },
      {
        name: "password",
        href: "/dashboard/profile/password",
      },
      {
        name: "socials",
        href: "/dashboard/profile/socials",
      },
    ],
  },
  {
    name: "article",
    href: "/dashboard/article",
    icon: <Newspaper className="h-5 w-5" />,
    children: [
      {
        name: "published",
        href: "/dashboard/article",
      },
      {
        name: "pending",
        href: "/dashboard/article/pending",
      },
      {
        name: "draft",
        href: "/dashboard/article/draft",
      },
    ],
  },
];

export function Sidebar() {
  return (
    <div className="scroll-hidden flex h-screen w-full flex-col gap-2 overflow-y-scroll border-r border-r-slate-600 bg-[#111827]">
      <div className="flex h-14 items-center justify-center px-4 py-7">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <div className="mt-1 flex w-32">
            <Image
              src="/images/tetespena.png"
              width={100}
              height={100}
              layout="responsive"
              alt="Picture of the author"
            />
          </div>
        </Link>
      </div>

      <nav className="items-start px-2 text-sm font-medium">
        {menus.map((menu) => (
          <div key={menu.name}>
            <SidebarButton
              icon={menu.icon}
              text={menu.name}
              href={menu.href}
              submenu={menu.children}
            />
          </div>
        ))}
      </nav>
    </div>
  );
}
