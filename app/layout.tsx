
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/lib/react-query/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickHire Job Board Application",
  description: " QuickHire  Simple Job Board Application built with Next.js, Prisma, and Tailwind CSS. It allows users to create and manage job postings, as well as apply for jobs. The application features a clean and responsive design, making it easy to use on both desktop and mobile devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1440px] mx-auto`}
      >
        <QueryProvider>
          {children}
          <Toaster richColors position="top-center" />
        </QueryProvider>

      </body>
    </html>
  );
}
