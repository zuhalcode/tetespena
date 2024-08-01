import { Sidebar } from "@/components/dashboard/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#1F2937]">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="h-screen w-full overflow-y-scroll">{children}</div>
    </div>
  );
}
