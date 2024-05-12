import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "DND Admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b text-white from-purple-900 via-indigo-800 to-blue-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
