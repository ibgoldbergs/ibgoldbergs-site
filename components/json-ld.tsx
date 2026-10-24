import { settings } from "@/lib/cms";

export async function PersonJsonLd() {
 const SITE=await settings(); const SOCIAL=SITE;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE.name,
          url: SITE.url,
          jobTitle: SITE.jobTitle,
          worksFor: {
            "@type": "Organization",
            name: SITE.organization,
          },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: SITE.alumni,
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: SITE.city,
            addressRegion: SITE.region,
          },
          sameAs: [SOCIAL.linkedin, SOCIAL.twitter],
        }).replace(/</g,"\\u003c"),
      }}
    />
  );
}
