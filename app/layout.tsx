import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SITE } from "@/lib/constants";
import "./globals.css";

const mapleMono = localFont({
  src: [
    {
      path: "../public/fonts/maple-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/maple-mono-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/maple-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/maple-mono-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-maple-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.title}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Personal Website`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="dark" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={SITE.name}
          href="/feed.xml"
        />
      </head>
      <body
        className={`${mapleMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <a href="#main" className="skip-to-content">
            Skip to content
          </a>
          <div className="mx-auto max-w-[640px] px-6 pt-16 pb-8 sm:pt-32">
            <Nav />
            <main id="main" className="mt-16 sm:mt-24">
              {children}
            </main>
            <div className="mt-16 sm:mt-24">
              <Footer />
            </div>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
