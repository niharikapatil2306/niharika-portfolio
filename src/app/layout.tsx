import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Niharika Patil | Software Engineer",
  description: "Software Engineer & ML Enthusiast - Master's student in Machine Learning with expertise in building scalable frontend applications and production-grade ML systems.",
  keywords: ["Software Engineer", "Machine Learning", "React", "Python", "AI", "Frontend Developer"],
  authors: [{ name: "Niharika Patil" }],
  icons: {
    icon: "/PortfolioLogo1.png",
    apple: "/PortfolioLogo1.png",
  },
  openGraph: {
    title: "Niharika Patil | Software Engineer",
    description: "Software Engineer & ML Enthusiast",
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
      <body className={`${cormorant.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
