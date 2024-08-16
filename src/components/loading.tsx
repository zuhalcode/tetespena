import { motion } from "framer-motion";
import React from "react";

type Props = {
  size?: "small" | "base" | "large";
};

const Loading = ({ size = "base" }: Props) => {
  const sizeClasses = {
    small: "h-12 w-12 border-[8px] border-t-[8px]",
    base: "h-24 w-24 border-[12px] border-t-[12px]",
    large: "h-36 w-36 border-[16px] border-t-[16px]",
  };

  const sizeBoxes = {
    small: "h-12 w-12",
    base: "h-24 w-24",
    large: "h-36 w-36",
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
