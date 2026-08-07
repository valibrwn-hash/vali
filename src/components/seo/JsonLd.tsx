import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";
import { getValidSocialLinks } from "@/lib/social-links";

export function PersonJsonLd() {
  const sameAs = getValidSocialLinks([site.linkedin, site.github]);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.tagline,
    email: site.email,
    url: getSiteUrl(),
    ...(sameAs.length > 0 && { sameAs }),
    knowsAbout: [
      "Software Engineering",
      "Product Architecture",
      "Full-Stack Development",
      "System Design",
      "Enterprise Software",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    description: site.tagline,
    url: getSiteUrl(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
