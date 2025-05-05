import type { Metadata } from "next";
import { Archivo, Archivo_Black, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });
const archivo = Archivo({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalentNest",
  description:
    "TalentNest aims to revolutionize the way companies and fractional professionals connect",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.className} `}>
        <ReduxProvider>
          <main className="max-w-[2400px] mx-auto">{children}</main>
          <Toaster closeButton />
        </ReduxProvider>
      </body>
    </html>
  );
}
