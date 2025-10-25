import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";

const openSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz",
  description: "Play Quiz and predictor to win prizes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable}  antialiased container mx-auto`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
