import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Dock } from "lucide-react";
import DockDemo from "./_ui/dock-menu";
import { BackgroundGrid } from "./_ui/background-grid";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZenitsuX Gaming",
  description: "Монголын шилдэг Mobile Legends стримчин",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundGrid/>
        {children}
        <DockDemo />
      </body>
    </html>
  );
}
