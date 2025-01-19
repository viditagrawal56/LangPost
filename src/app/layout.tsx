import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/Providers";
import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next blog | Home",
  description: "A Next.js blog app where user can read and write blog posts",
};

import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scrollbar">
      <Analytics />
      <body>
        <Toaster richColors theme="dark" position="top-right" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
