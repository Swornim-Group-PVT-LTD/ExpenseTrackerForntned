import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import I18nProvider from "./i18n/I18nProvider";

import { AuthProvider } from "@/context/AuthContext";
import { BalanceVisibilityProvider } from "./context/BalanceHideShowContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track Your Money",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <BalanceVisibilityProvider>
            <I18nProvider>{children}</I18nProvider>
          </BalanceVisibilityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
