import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import IntroController from "@/components/IntroController";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ramanarayanan G | Electronics & Communication Engineer",
  description: "Portfolio of Ramanarayanan G, an Electronics & Communication Engineering student, builder, and product-development enthusiast specializing in embedded systems and IoT.",
  keywords: [
    "Ramanarayanan G",
    "Ramanarayanan",
    "Ramanarayanan portfolio",
    "Electronics and Communication Engineer",
    "Embedded Systems Engineer",
    "IoT developer portfolio",
    "Hardware engineer portfolio",
    "GASSENTIAL project",
    "Invisible Security System",
    "RoadSense",
    "Hardware product development",
    "C/C++ embedded programmer"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)]">
        <IntroController />
        <CustomCursor />
        <Navigation />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
