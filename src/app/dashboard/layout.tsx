import { Sidebar } from "@/components/dashboard/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#282D31]">
      <Sidebar />
      {children}
    </div>
  );
}
