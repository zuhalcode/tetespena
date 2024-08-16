import { createContext, ReactNode, useContext, useState } from "react";

export const DrawerContext = createContext<
  | {
      isOpen: boolean;
      toggleDrawer: () => void;
    }
  | undefined
>(undefined);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  return (
    <DrawerContext.Provider value={{ isOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }
  return context;
};
