import type { Metadata } from "next";
import Footer from "../components/footer";
import Navbar from "@/components/navbar";
import "../app/globals.css";
import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["400", "700"] });

import type { AppProps } from "next/app";

export function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={lora.className}>
      <Component {...pageProps} />
    </main>
  );
}

export const metadata: Metadata = {
  title:
    "中國基督教播道會雅博堂-Evangelical Free Church of China breezy church",
  description:
    "中國基督教播道會雅博堂-Evangelical Free Church of China breezy church",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>{" "}
        {/* Flex-grow ensures content takes available space */}
        <Footer />
      </body>
    </html>
  );
}