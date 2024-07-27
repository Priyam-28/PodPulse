import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import { Manrope } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "PodPulse",
  description: "Generate your podcasts using AI",
  icons:{
    icon:'./icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
    <html lang="en">
      <body className={`${manrope.className}`}>
      {children}</body>
    </html>
    </ConvexClerkProvider>
  );
}
