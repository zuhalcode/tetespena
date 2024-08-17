import { motion } from "framer-motion";
import React from "react";

type Props = {
  size?: "xs" | "sm" | "md" | "lg";
};

const Loading = ({ size = "sm" }: Props) => {
  const sizeClasses = {
    xs: "h-6 w-6 border-[4px] border-t-[4px]",
    sm: "h-12 w-12 border-[8px] border-t-[8px]",
    md: "h-24 w-24 border-[12px] border-t-[12px]",
    lg: "h-36 w-36 border-[16px] border-t-[16px]",
  };

  const sizeBoxes = {
    xs: "h-6 w-6",
    sm: "h-12 w-12",
    md: "h-24 w-24",
    lg: "h-36 w-36",
  };

  return (
    <div className={`relative mx-auto ${sizeBoxes[size]}`}>
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5, ease: "linear", repeat: Infinity }}
        className={`absolute left-0 top-0 h-full w-full rounded-full border-slate-400 border-t-blue-600 ${sizeClasses[size]}`}
      />
    </div>
  );
};

export default Loading;
