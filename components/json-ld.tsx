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
          sameAs: [SOCIAL.linkedin, SOCIAL.twitter],
        }),
      }}
    />
  );
}
