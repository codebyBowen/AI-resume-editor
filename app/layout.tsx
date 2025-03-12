import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DndProvider from "../components/DndProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Resume Builder",
  description: "Create your professional resume in minutes with AI Resume Builder - The smart way to craft your perfect resume.",
  keywords: ["resume builder", "AI resume", "CV generator", "professional resume"],
  authors: [{ name: "Bowen" }],
  openGraph: {
    title: "AI Resume Builder",
    description: "Create your professional resume in minutes with AI Resume Builder",
    url: "https://github.com/codebyBowen/AI-resume-editor",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DndProvider>{children}</DndProvider>
      </body>
    </html>
  );
}
