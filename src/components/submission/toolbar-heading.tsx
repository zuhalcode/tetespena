import {
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";

import { HeadingIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Editor } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";

type Props = {
  editor: Editor | null;
};

export function ToolbarHeading({ editor }: Props) {
  const headings = [
    { component: Heading1, level: 1 as const },
    { component: Heading2, level: 2 as const },
    { component: Heading3, level: 3 as const },
    { component: Heading4, level: 4 as const },
    { component: Heading5, level: 5 as const },
    { component: Heading6, level: 6 as const },
  ];

  const toggleHeading = (level: Level) => {
    editor?.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`${editor?.isActive("heading") && "bg-[#374151] text-white"} cursor-pointer rounded-md p-2 text-slate-300 hover:bg-[#374151]`}
        >
          <Heading className="h-5 w-5 xl:h-6 xl:w-6" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-fit border bg-[#1d2633]">
        <DropdownMenuGroup
          className={`grid grid-cols-3 justify-items-center gap-3 px-2 py-3 text-slate-200`}
        >
          {headings.map((head) => (
            <DropdownMenuItem
              key={head.level}
              onClick={() => toggleHeading(head.level)}
            >
              <head.component className="h-6 w-6" />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
