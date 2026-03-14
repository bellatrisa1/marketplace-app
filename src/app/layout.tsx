import type { Metadata } from "next";
import "./globals.scss";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Orvix",
  description: "Marketplace UI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}