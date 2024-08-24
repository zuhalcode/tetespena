export const generateNewSlug = (title: string) =>
  title
    ?.toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[^\w\s]/g, "") // Remove non-word characters (except spaces)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
