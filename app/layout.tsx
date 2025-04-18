import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import {AppProviders} from "@/app/provider/app-provider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Citipedia",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased`}
      >
      <AppProviders>
        {children}
        </AppProviders>
      </body>
    </html>
  );
}
