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
      <div className="flex h-screen bg-[#1F2937]">
        <div className="relative z-20 hidden h-screen w-5/12 lg:block xl:w-3/12">
          <Sidebar />
        </div>

        <div className="scroll-hidden relative z-10 w-full overflow-y-auto">
          <ProfileBar />
          <div className="mt-24">{children}</div>
        </div>
      </div>
    </ProtectedPage>
  );
}
