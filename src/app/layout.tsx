import type { Metadata, Viewport } from "next";
import { Assistant, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/config/site";

// The two typefaces of the site (Cormorant Garamond for headings, Assistant for text). Self-hosted by next/font: no request to Google at runtime.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["latin"],
  variable: "--font-assistant",
  display: "swap",
});

const description =
  "Aurelle is a clean, precise Shopify theme for skincare brands. Complete on install, in a Clinical Skincare style that stays fully editable.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Aurelle: a Shopify theme for skincare and beauty",
    template: "%s | Aurelle",
  },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Aurelle: a Shopify theme for skincare and beauty",
    description,
  },
  twitter: { card: "summary", title: "Aurelle", description },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${assistant.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
