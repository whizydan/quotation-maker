import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quotia | Quotation Maker",
  description: "A simple and elegant app to generate, export, and store quotations — built with Next.js, ShadCN UI, Sequelize, and Nodemailer",
  icons: {
    icon: '/img/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="author" content="whizydan" />
        <meta name="description" content="Generate, export, and manage quotations with ease." />
        <meta name="keywords" content="quotation, invoice, generator, pdf, email, client, business" />

        {/* Open Graph for social media previews */}
        <meta property="og:title" content="Quotation Maker" />
        <meta property="og:description" content="Generate, export, and manage quotations with ease." />
        <meta property="og:image" content="/img/Quotations.webp" />
        <meta property="og:url" content="https://qoutia.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Quotation Maker" />
        <meta name="twitter:description" content="Generate, export, and manage quotations with ease." />
        <meta name="twitter:image" content="/img/Quotations.webp" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
