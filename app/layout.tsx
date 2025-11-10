import type React from "react"
import type { Metadata } from "next"
import { Philosopher, Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const philosopher = Philosopher({ subsets: ["latin"], weight: ["400", "700"] })
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] })

export const metadata: Metadata = {
  title: "Uttam Vastu - Vedic Astrology Guidance",
  description: "Unlock the secrets of your birth chart and discover your life's true potential with Uttam Vastu",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
