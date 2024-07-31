export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 flex w-full items-center justify-center">
      {children}
    </div>
  );
}
