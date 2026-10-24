import type { MetadataRoute } from "next";
import { settings } from "@/lib/cms";

export default async function robots(): Promise<MetadataRoute.Robots> {
 const SITE=await settings(false);
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
