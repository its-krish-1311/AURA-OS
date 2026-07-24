import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LivingBackground from "@/components/background/LivingBackground";
import { OSProvider } from "@/context/OSContext";
import { AuthProvider } from "@/context/AuthProvider";
import { OSDataProvider } from "@/context/OSDataContext";
import CommandPalette from "@/components/os-core/CommandPalette";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Krish OS",
  description: "AI Operating System Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased relative`}>
        <AuthProvider>
          <OSProvider>
            <OSDataProvider>
              <LivingBackground />
              <div className="relative z-10">{children}</div>
              <CommandPalette />
            </OSDataProvider>
          </OSProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
