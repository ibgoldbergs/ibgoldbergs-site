import { draftMode } from "next/headers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { settings } from "@/lib/cms";
import { socialMetadata } from "@/lib/metadata";
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

export async function generateMetadata(): Promise<Metadata> {
 const SITE=await settings();
 return {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.title}`,
  },
  description: SITE.description,
  ...socialMetadata({ title: SITE.title, description: SITE.description, path: "/", site: SITE }),
  robots: {
    index: !(await draftMode()).isEnabled,
    follow: !(await draftMode()).isEnabled,
  },
};
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const SITE=await settings();
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
            <Nav name={SITE.name} items={SITE.navigation} homeLabel={SITE.homeLabel} />
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
