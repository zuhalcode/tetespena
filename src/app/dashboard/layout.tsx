"use client";

import ProtectedPage from "@/components/auth/protected-page";
import ProfileBar from "@/components/dashboard/profile-bar";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedPage>
      <div className="flex bg-[#1F2937]">
        <div className="w-3/12">
          <Sidebar />
        </div>
        <div className="h-screen w-full overflow-y-scroll">
          <ProfileBar />
          {children}
        </div>
      </div>
    </ProtectedPage>
  );
}
