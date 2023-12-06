import type { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";
import { Vina_Sans as FontSerif } from "next/font/google";
import "./globals.css";

import { cn } from "@nextui-org/react";
import { siteConfig } from "../config/site";
import { Providers } from "@/providers/providers";
import { SiteHeader } from "@/components/site-header";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400"],
});

const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("antialiased", fontSans.className)}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
