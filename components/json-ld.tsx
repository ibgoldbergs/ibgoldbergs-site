import { SITE, SOCIAL } from "@/lib/constants";

export function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE.name,
          url: SITE.url,
          jobTitle: "Senior Product Manager",
          worksFor: {
            "@type": "Organization",
            name: "OneVision Resources",
          },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Texas Tech University",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Asheville",
            addressRegion: "NC",
          },
          sameAs: [SOCIAL.linkedin, SOCIAL.twitter],
        }),
      }}
    />
  );
}
