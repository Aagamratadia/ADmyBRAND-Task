import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import AnimatedNavbar from "@/components/ui/AnimatedNavbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADmyBRAND AI Suite",
  description: "A premium AI SaaS suite for modern brands.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} bg-background text-foreground font-sans min-h-screen antialiased flex flex-col`}>
        {/* Animated Navbar replaces old header */}
        <AnimatedNavbar />
        <main className="flex-1 flex flex-col w-full">{children}</main>
        <footer className="w-full py-6 px-6 text-center text-xs text-slate-500 border-t border-white/5 bg-background/80 backdrop-blur-lg">
          © {new Date().getFullYear()} ADmyBRAND. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

