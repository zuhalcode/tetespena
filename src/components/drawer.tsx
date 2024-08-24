import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import Link from "next/link";
import { Button } from "./ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

const Drawer = () => {
  const pathname = usePathname();
  if (pathname === "/dashboard") return;

  const menu = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Sign In",
      href: "/sign-in",
    },
    {
      title: "Sign Up",
      href: "/sign-up",
    },
  ];

  return (
    <Sheet>
      <motion.span whileTap={{ translateY: 5 }}>
        <SheetTrigger>
          <LayoutGrid className="h-8 w-8 cursor-pointer rounded-lg p-1 transition-all duration-100 hover:scale-105 hover:bg-slate-800 hover:text-white xl:h-8 xl:w-8" />
        </SheetTrigger>
      </motion.span>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="mx-auto mt-12 w-36">
              <Image
                src="/images/tetespena.png"
                width={100}
                height={100}
                layout="responsive"
                alt="Picture of the author"
              />
            </div>
          </SheetTitle>
          <SheetDescription className="text-center text-xs text-black">
            Share and Inspire.
          </SheetDescription>
        </SheetHeader>

        <SheetHeader className="mt-10 flex flex-col gap-5 px-10 text-start">
          {menu.map((m, i) => (
            <Link key={i} href={m.href} legacyBehavior passHref>
              <p className="cursor-pointer text-lg capitalize hover:underline">
                {m.title}
              </p>
            </Link>
          ))}
        </SheetHeader>

        <SheetHeader>
          <SignOutButton>
            <Button variant="destructive" className="mt-24">
              Logout
            </Button>
          </SignOutButton>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
