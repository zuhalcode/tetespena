import React, { ReactNode } from "react";
type Props = {
  title: string;
  icon: ReactNode;
  editor?: any;
  isActive: string | any;
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
      {icon}
    </button>
  );
};

export default ToolbarButton;
