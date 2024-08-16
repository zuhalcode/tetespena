import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { LayoutGrid, MenuSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Drawer = () => {
  return (
    <Sheet>
      <motion.span whileTap={{ translateY: 5 }}>
        <SheetTrigger>
          <LayoutGrid className="h-8 w-8 cursor-pointer rounded-lg p-1 transition-all duration-100 hover:scale-105 hover:bg-slate-800 hover:text-white xl:h-8 xl:w-8" />
        </SheetTrigger>
      </motion.span>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
