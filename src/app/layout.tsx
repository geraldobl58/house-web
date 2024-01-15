import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";

import { ToasterProvider } from "@/providers/toast-provider";

import "./globals.css";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "House Web",
  description: "House Web Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body className={font.className}>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
