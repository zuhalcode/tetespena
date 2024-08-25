import {
  Home,
  LayoutGrid,
  LogOut,
  Newspaper,
  Sheet,
  UserRoundPen,
} from "lucide-react";
import Link from "next/link";

import SidebarButton from "./sidebar-button";
import Image from "next/image";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Drawer from "../drawer";

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
  {
    name: "Home",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
];

export function Sidebar() {
  return (
    <>
      <div className="scroll-hidden h-screen w-full flex-col gap-2 overflow-y-scroll border-r border-r-slate-600 bg-[#111827] sm:flex">
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

        <nav className="flex h-full flex-col items-start justify-between px-2 text-sm font-medium">
          <div className="w-full">
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
          </div>
          <SignOutButton>
            <div
              className={`mb-5 flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 capitalize text-slate-200 transition-all hover:bg-slate-700 hover:text-slate-200`}
            >
              <div className="flex w-full items-center gap-3 text-sm font-semibold tracking-widest">
                <LogOut className="h-5 w-5" />
                <button className="text-sm tracking-widest">Sign Out</button>
              </div>
            </div>
          </SignOutButton>
        </nav>
      </div>
    </>
  );
}
