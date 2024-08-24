import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Moon, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  useLogo?: boolean;
};

const ProfileBar = ({ useLogo = false }: Props) => {
  return (
    <div className="mx-auto h-fit w-full border-b border-b-slate-500 xl:w-11/12">
      <div className="flex w-full items-center justify-between px-3 py-3">
        <div className="mt-1 w-8 sm:w-12">
          {useLogo && (
            <Link href="/dashboard">
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

        <div className="flex items-center gap-2 pl-7">
          <div className="hidden h-7 w-full border-l-2 border-slate-600 px-3 xl:block" />
          <Link href="/submission">
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
