import React, { ReactNode } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Home, Menu, Newspaper, UserRoundPen, X } from "lucide-react";
import Image from "next/image";

import SidebarButton from "./sidebar-button";

const SidebarDrawer = () => {
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
        {
          name: "trash",
          href: "/dashboard/article/trash",
        },
      ],
    },
    {
      name: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
  ];

  return (
    <Sheet>
      <span className="flex items-center justify-center gap-4">
        <SheetTrigger asChild>
          <Menu className="h-6 w-6 text-white" />
        </SheetTrigger>
        <div className="inline h-7 w-1 border-l border-slate-600 xl:hidden" />
      </span>

      <SheetContent side="left" className="border-r bg-[#1F2937]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="w-12">
              <Image
                src="/images/tp.png"
                width={100}
                height={100}
                layout="responsive"
                alt="Picture of the author"
              />
            </div>
            <SheetClose asChild>
              <X className="text-white" />
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <SheetHeader className="mt-5 flex flex-col text-start">
          {menus.map((m) => (
            <div key={m.name}>
              <SidebarButton
                icon={m.icon}
                text={m.name}
                href={m.href}
                submenu={m.children}
              />
            </div>
          ))}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarDrawer;
