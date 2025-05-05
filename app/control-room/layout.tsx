export default function ControlLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-[2400px] mx-auto bg-[#F4F5F7] pb-28">
      {children}
    </main>
  );
}
