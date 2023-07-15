import { Inter as FontSans } from "next/font/google";

import "./globals.css";
import { siteConfig } from "~/config/site";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/lib/utils";
import { SiteHeader } from "~/components/header";
import { SiteFooter } from "~/components/site-footer";
import ContextProvider from "./context";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "rohanop",
      url: "https://rohanop.vercel.app/",
    },
  ],
  creator: "rohanop",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@rohanop",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ContextProvider>
            <div className="min-h-screen flex flex-col">
              <SiteHeader heading="BeFocused" />
              <div className="flex-1 h-full">{children}</div>
              <SiteFooter className="mt-auto" />
            </div>
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
