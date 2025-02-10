import clsx from "clsx";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import { ContextProvider } from "@/providers/ContextProvider";

import type { Metadata } from "next";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Remove People From Photos",
  description: "Magically remove unwanted people from your photos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "bg-orange-50 min-h-screen font-inter text-black antialiased",
          inter.variable,
        )}
      >
        <ContextProvider>{children}</ContextProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
