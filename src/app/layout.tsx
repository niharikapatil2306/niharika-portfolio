import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Montserrat } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import ScrollControls from "@/components/ScrollControls";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Niharika Patil | Marketing & Customer Insight Analyst",
  description: "Marketing and customer insight analyst with an MSc in Machine Learning — SQL, Python and Power BI, focused on fashion and retail in the UK.",
  keywords: ["Marketing Analyst", "Customer Insight", "Fashion", "Retail", "Power BI", "SQL", "Python"],
  authors: [{ name: "Niharika Patil" }],
  icons: {
    icon: "/PortfolioLogo1.png",
    apple: "/PortfolioLogo1.png",
  },
  openGraph: {
    title: "Niharika Patil | Marketing & Customer Insight Analyst",
    description: "Marketing & customer insight analyst — fashion and retail, UK",
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
        className={`${cormorant.variable} ${montserrat.variable} ${jost.variable} antialiased`}
      >
        {children}
        <ScrollControls />
        <Analytics />
      </body>
    </html>
  );
}
