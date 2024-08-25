import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Edit, Ellipsis, FileInput, Trash, Trash2 } from "lucide-react";

const ArticleAction = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl hover:bg-slate-700"
      >
        <div>
          <Ellipsis className="h-5 w-5 text-slate-400" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 w-56 rounded-2xl border border-slate-500 bg-[#111827]">
        <DropdownMenuGroup className="space-y-2 p-1">
          <DropdownMenuItem className="rounded-lg bg-transparent py-2 text-slate-300 focus:bg-slate-800 focus:text-white">
            <FileInput className="mr-2 h-5 w-5" />
            <span className="text-base">Publish Article</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg bg-transparent py-2 text-slate-300 focus:bg-slate-800 focus:text-white">
            <Edit className="mr-2 h-5 w-5" />
            <span className="text-base">Edit Article</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg bg-transparent py-2 text-slate-300 focus:bg-slate-800 focus:text-white">
            <Trash2 className="mr-2 h-5 w-5" />
            <span className="text-base">Move to Trash</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ArticleAction;
