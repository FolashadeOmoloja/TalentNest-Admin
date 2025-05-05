export default function ControlLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-[2400px] mx-auto bg-[#EAEEFE] pb-28">
      {children}
    </main>
  );
}
