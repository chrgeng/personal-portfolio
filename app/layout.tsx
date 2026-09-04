import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christine Geng | AI & Data Scientist",
  description: "Christine Geng builds rigorous, human-centered AI systems for high-stakes decisions.",
  openGraph: {
    title: "Christine Geng | AI & Data Scientist",
    description: "Rigorous, scalable, and deeply human AI systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
