import type { Metadata } from "next";
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display", // Ini aman karena Variable Font
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  // TAMBAHKAN WEIGHT DI SINI
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Slide Tiles - Puzzle",
  description: "Game geser geser blok",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
