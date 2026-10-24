import type { Metadata } from "next";

type SocialMetadata = {
  title: string;
  description: string;
  path: string;
  site: { url: string; name: string; locale: string };
  publishedTime?: string;
};

export function socialMetadata({ title, description, path, site, publishedTime }: SocialMetadata): Pick<Metadata, "openGraph" | "twitter" | "alternates"> {
  const image = {
    url: new URL("/og-image.png", site.url).href,
    width: 1200,
    height: 630,
    alt: "Ian Goldberg, ibgoldbergs.com",
  };
  return {
    alternates: { canonical: new URL(path, site.url).href },
    openGraph: {
      title,
      description,
      url: new URL(path, site.url).href,
      siteName: site.name,
      locale: site.locale,
      images: [image],
      ...(publishedTime ? { type: "article", publishedTime } : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
