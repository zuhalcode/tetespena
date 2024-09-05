"use client";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

import { Provider } from "react-redux";
import { store } from "@/store";

// Create a new Query Client at the module scope
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <AnimatePresence>
            <body className={`bg-slate-50`} suppressHydrationWarning>
              <Provider store={store}>
                <main>
                  <Navbar />
                  {children}
                </main>
                <Toaster />
              </Provider>
            </body>
          </AnimatePresence>
        </html>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
