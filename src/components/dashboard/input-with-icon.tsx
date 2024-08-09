import React from "react";
import { Input } from "../ui/input";

const InputWithIcon = () => {
  return (
    <div className="relative w-full">
      <Input
        placeholder={item.placeholder}
        {...field}
        className="pl-9 text-slate-200"
      />
      <Search className="absolute left-0 top-0 m-2.5 h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default InputWithIcon;
