import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Makje`,
  description: siteConfig.description,
};
export default async function RootLayout({
  children,
  authModal,
}: Readonly<{
  children: React.ReactNode;
  authModal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen max-w-screen-2xl mx-auto text-foreground bg-background">
        <NextTopLoader showSpinner={false} height={5} />
        <Providers>
          {authModal}
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
