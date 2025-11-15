import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import ClientLayout from "./client-layout";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammad Qasim - Full Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Muhammad Qasim, a Full Stack Developer certified in AI, Metaverse & Web 3.0",
  generator: "Next.js",
  icons: {
    icon: "/icon.svg", // your SVG icon
    apple: "/apple-icon.png", // Apple touch icon
    shortcut: "/favicon.ico", // classic favicon
  },
  manifest: "/manifest.json", // web app manifest
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Extra RealFaviconGenerator recommended links */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon1.png" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`font-sans antialiased`}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
