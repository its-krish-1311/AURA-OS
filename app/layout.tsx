import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LivingBackground from "@/components/background/LivingBackground";
import { OSProvider } from "@/context/OSContext";
import { AuthProvider } from "@/context/AuthProvider";
import { OSDataProvider } from "@/context/OSDataContext";
import CommandPalette from "@/components/os-core/CommandPalette";
import { ActionModalProvider } from "@/components/os-core/ActionModalContext";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"], 
  variable: "--font-poppins" 
});

export const metadata: Metadata = {
  title: "Aura OS | AI Operating System",
  description: "Elevate your daily workflow with an intelligent operating system that does the heavy lifting for you.",
  openGraph: {
    title: "Aura OS | AI Operating System",
    description: "Elevate your daily workflow with an intelligent operating system that does the heavy lifting for you.",
    type: "website",
    locale: "en_US",
    siteName: "Aura OS",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura OS | AI Operating System",
    description: "Elevate your daily workflow with an intelligent operating system that does the heavy lifting for you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} font-sans antialiased relative`}>
        <AuthProvider>
          <OSProvider>
            <OSDataProvider>
              <ActionModalProvider>
                <LivingBackground />
                <div className="relative z-10">{children}</div>
                <CommandPalette />
                <Toaster position="bottom-right" toastOptions={{
                  style: {
                    background: 'rgba(10, 10, 10, 0.8)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                  }
                }}/>
              </ActionModalProvider>
            </OSDataProvider>
          </OSProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
