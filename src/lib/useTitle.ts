const capitalize = (title: string): string => {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const setPageTitle = (title: string = "home") => {
  return capitalize(title);
};
