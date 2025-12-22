import type { Metadata } from "next";
import localFont from "next/font/local";
import { Libre_Franklin, Libre_Caslon_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const paradiseSeashore = localFont({
  src: [
    {
      path: "../public/fonts/paradise-seashore-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/paradise-seashore-italic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-paradise-seashore",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  display: "swap",
});

const libreCaslonDisplay = Libre_Caslon_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-libre-caslon-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shannon & Austin | August 8, 2026",
  description: "We're getting married! Join us to celebrate our wedding on August 8, 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${paradiseSeashore.variable} ${libreFranklin.variable} ${libreCaslonDisplay.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
