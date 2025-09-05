import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "../features/layout/components/LayoutContent";
import { ToastContainer } from "../components/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Modeo.pl - Personalizowane koszulki, bluzy i gadżety z nadrukiem",
  description: "Sklep z personalizowaną odzieżą, koszulkami, bluzami i gadżetami z nadrukiem. Profesjonalne znakowanie dla firm - haft, sitodruk, DTF, flex i flock.",
  keywords: "koszulki z nadrukiem, bluzy, znakowanie odzieży, haft, sitodruk, personalizowane gadżety, odzież firmowa",
  authors: [{ name: "Modeo" }],
  creator: "Modeo",
  publisher: "Modeo",
  applicationName: "Modeo.pl",
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any", type: "image/png" },
      { url: "/logo.svg", sizes: "any", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: "/logo.png"
  },
  manifest: undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutContent>
          {children}
        </LayoutContent>
        <ToastContainer />
      </body>
    </html>
  );
}
