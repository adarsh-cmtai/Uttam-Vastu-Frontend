import type React from "react";
import type { Metadata } from "next";
import { Philosopher, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import StoreProvider from "@/lib/redux/StoreProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const philosopher = Philosopher({ subsets: ["latin"], weight: ["400", "700"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Vastumaye - Vastu Shastra & Astrology",
  description: "Authentic Vastu guidance for harmony, wellness, and prosperity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body
        className={`${lato.className} antialiased`}
        style={{ "--font-philosopher": philosopher.style.fontFamily } as React.CSSProperties}
      >
        <StoreProvider>
          <LanguageProvider>
            {children}
            <Toaster 
              position="top-center"
              toastOptions={{
                success: { style: { background: '#28a745', color: 'white' } },
                error: { style: { background: '#dc3545', color: 'white' } },
              }}
            />
          </LanguageProvider>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}