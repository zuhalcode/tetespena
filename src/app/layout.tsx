"use client";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useTitle from "@/hooks/useTitle";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";

// Create a new Query Client at the module scope
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useTitle("home");

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence>
          <html lang="en">
            <body className={`bg-slate-50`}>
              <main>
                <Navbar />
                {children}
              </main>
            </body>
          </html>
        </AnimatePresence>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
