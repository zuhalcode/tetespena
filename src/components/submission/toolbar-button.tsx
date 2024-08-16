import TextAlign from "@tiptap/extension-text-align";
import { Editor } from "@tiptap/react";
import React, { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  editor: Editor | null;
  isActive: string | { textAlign: string };
  onClick: () => void;
};

const ToolbarButton = ({
  title,
  icon,
  editor,
  onClick,
  isActive = "",
}: Props) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`${editor?.isActive(isActive) && "bg-[#374151] text-white"} cursor-pointer rounded-md p-2 text-slate-300 hover:bg-[#374151]`}
    >
      {React.cloneElement(icon as React.ReactElement, {
        className: "xl:w-6 xl:h-6 w-5 h-5",
      })}
    </button>
  );
};

export default ToolbarButton;
