"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

type SubmenuProps = {
  name: string;
  href: string;
};

type SidebarButton = {
  text: string;
  icon: ReactNode;
  href?: string;
  submenu?: SubmenuProps[];
};

const SidebarButton = ({ text, icon, href, submenu = [] }: SidebarButton) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleSetActive = () => setIsActive(!isActive);

  const pathname = usePathname();

  return (
    <AnimatePresence>
      {submenu?.length !== 0 ? (
        <>
          <Link
            href={`${href}`}
            className={`my-1 flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 capitalize text-slate-200 transition-all hover:bg-slate-700 hover:text-slate-200`}
            onClick={handleSetActive}
          >
            <div className="flex items-center gap-3 font-semibold">
              {icon}
              <p className="mt-1 text-sm tracking-widest">{text}</p>
            </div>

            <ChevronRight
              className={`h-5 w-5 ${isActive && "rotate-90"} transition-transform duration-300`}
            />
          </Link>

          {isActive &&
            submenu.map((sm, i) => (
              <Link href={sm.href} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={`my-1 ml-4 flex cursor-pointer items-center gap-3 rounded-lg transition-all duration-300 ${
                    pathname === sm.href
                      ? "bg-slate-700 text-slate-200"
                      : "text-slate-200"
                  } px-3 py-2 capitalize transition-all hover:bg-slate-700 hover:text-slate-200`}
                >
                  {sm.name}
                </motion.div>
              </Link>
            ))}
        </>
      ) : (
        <Link
          href={`${href}`}
          className={`my-1 flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 capitalize text-slate-200 transition-all hover:bg-slate-700 hover:text-slate-200`}
          onClick={handleSetActive}
        >
          <div className="flex w-full items-center gap-3 font-semibold">
            {icon}
            <p className="mt-1 text-sm tracking-widest">{text}</p>
          </div>
        </Link>
      )}
    </AnimatePresence>
  );
};

export default SidebarButton;
