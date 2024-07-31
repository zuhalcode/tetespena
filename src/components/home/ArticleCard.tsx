import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  title?: string;
  desc?: string;
};

const ArticleCard = ({ title = "", desc = "" }: Props) => {
  return (
    <div className="flex w-full gap-5 rounded-lg bg-white px-10 py-5 shadow-md">
      <div className="space-y-5">
        <h1 className="cursor-pointer text-3xl font-semibold transition-all duration-300 hover:underline hover:underline-offset-4">
          {title}
        </h1>
        <p className="text-base leading-loose text-slate-700">{desc}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <div className="text-xs font-medium">Code</div>
            <div className="text-xs font-medium">Code</div>
            <div className="text-xs font-medium">Code</div>
          </div>
          <div className="">
            <div className="flex items-center gap-3">
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-xs font-medium">
                Jonathan Alexandre Despacito Eruguein Jobs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
