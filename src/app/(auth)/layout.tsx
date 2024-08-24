import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      {children}
    </div>
  );
}
