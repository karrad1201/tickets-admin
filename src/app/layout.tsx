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
  title: "Визит Калмыкия — билеты на события Элисты",
  description:
    "Покупайте билеты на концерты, спектакли, буддийские фестивали и спортивные события Калмыкии онлайн. Электронный билет — QR-код прямо в телефоне.",
  openGraph: {
    title: "Визит Калмыкия — билеты на события Элисты",
    description:
      "Вся культурная жизнь Калмыкии в одном приложении. Покупайте билеты онлайн.",
    siteName: "Визит Калмыкия",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
