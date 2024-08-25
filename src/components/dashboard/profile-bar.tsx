import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Moon, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SidebarDrawer from "./sidebar-drawer";

type Props = {
  useLogo?: boolean;
};

const ProfileBar = ({ useLogo = true }: Props) => {
  return (
    <div className="fixed right-0 top-0 z-10 mx-auto h-fit w-full border-b border-b-slate-500 bg-[#1F2937] xl:right-7 xl:w-[76%]">
      <div className="flex w-full items-center justify-between px-3 py-2">
        <div className="lg:hidden">
          <SidebarDrawer />
        </div>

        {/* Logo */}
        <div className="w-12 pb-2 xl:w-12 xl:pb-0">
          {useLogo && (
            <Link href="/dashboard" className="lg:hidden">
              <Image
                src="/images/tp.png"
                width={100}
                height={100}
                layout="responsive"
                alt="Picture of the author"
              />
            </Link>
          )}
        </div>
        {/* Logo */}

        <div className="flex items-center gap-2 pl-7">
          <div className="hidden h-7 w-full border-l-2 border-slate-600 px-3 xl:block" />
          <Link href="/submission" className="hidden md:inline">
            <div className="flex cursor-pointer items-center gap-1 rounded-lg p-2 font-medium text-slate-400 hover:bg-[#2b384c] hover:text-slate-200">
              <Plus className="h-5 w-5" />
              <p className="text-sm font-medium xl:text-base">Create</p>
            </div>
          </Link>

          <div className="cursor-pointer rounded-full p-3 text-slate-400 hover:bg-[#2b384c] hover:text-slate-200">
            <Moon className="h-6 w-6" />
          </div>

          <Avatar className="h-7 w-7">
            <AvatarImage src="/images/default.png" alt="profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
