import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

type Props = {
  title: string;
  desc?: string;
  slug: string;
  userName: string;
};

const ArticleCard = ({ title = "", desc = "", slug, userName = "" }: Props) => {
  return (
    <div className="flex w-full gap-5 rounded-lg bg-white px-5 py-5 shadow-md xl:px-10">
      <div className="w-full space-y-5">
        <Link href={`/${slug}`}>
          <h1 className="cursor-pointer text-center text-lg font-semibold capitalize transition-all duration-300 hover:underline hover:underline-offset-4 md:text-start xl:text-3xl">
            {title}
          </h1>
        </Link>
        <p className="text-center text-sm leading-loose text-slate-700 md:text-justify xl:text-base">
          {desc}
        </p>

        <div className="flex w-full items-end justify-end gap-10">
          {/* <div className="hidden gap-5 md:flex">
            <div className="text-xs font-medium">Code</div>
            <div className="text-xs font-medium">Code</div>
            <div className="text-xs font-medium">Code</div>
          </div> */}
          <div className="flex w-full items-center gap-3">
            <Avatar className="h-7 w-7">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-xs font-medium">{userName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
