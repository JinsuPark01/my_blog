import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "../components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "My Blog",
  description: "웹 개발 학습자를 위한 개인 블로그",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://myblog.com"),
  openGraph: {
    title: "My Blog",
    description: "웹 개발 학습자를 위한 개인 블로그",
    url: "https://myblog.com",
    siteName: "My Blog",
    images: [
      {
        url: "/next.svg",
        width: 800,
        height: 600,
        alt: "My Blog Logo",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={{ locale: "ko-KR" }}>
      <html lang="ko" className={interFont.variable}>
        <body className="bg-gray-50 text-gray-900">
          <Header />
          <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
