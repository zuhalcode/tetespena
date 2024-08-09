import React, { ReactNode } from "react";
type Props = {
  icon: ReactNode;
  editor: any;
  onClick: () => void;
};

const BubbleButton = ({ icon, editor, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${editor?.isActive("bold") ? "is-active" : ""} cursor-pointer rounded-md p-1 hover:bg-slate-500`}
    >
      {icon}
    </button>
  );
};

export default BubbleButton;
