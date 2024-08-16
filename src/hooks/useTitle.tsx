"use client";

import { useEffect } from "react";

const capitalize = (title: string): string => {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = capitalize(title);
  }, [title]);
};

export default useTitle;
