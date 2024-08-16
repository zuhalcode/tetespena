import ProfileBar from "@/components/dashboard/profile-bar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect, usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) redirect("/");

  return (
    <div className="flex bg-[#1F2937]">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="h-screen w-full overflow-y-scroll">
        <ProfileBar />
        {children}
      </div>
    </div>
  );
}
