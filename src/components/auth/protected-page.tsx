import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import React, { ReactNode } from "react";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
};

export default ProtectedPage;
