import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "WearTac - Professional Tactical Equipment Manufacturer",
    template: "%s | WearTac",
  },
  description: "Leading manufacturer of tactical boots, military backpacks, security equipment, and rescue gear. Quality certified for global markets.",
  keywords: ["tactical equipment", "military boots", "tactical backpacks", "security equipment", "rescue gear", "OEM manufacturer"],
  authors: [{ name: "WearTac" }],
  creator: "WearTac",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    siteName: "WearTac",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
