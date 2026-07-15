import logoIcon from "@/assets/nomads-logo-official.png?url";

export function getPackageUrlPrefix(category: string): string {
  const cat = (category || "").toLowerCase();
  if (cat === "trekking") return "trekking";
  if (cat === "climbing" || cat === "expedition" || cat === "peak-climbing") return "peak-climbing";
  return "tours";
}

export interface SeoOptions {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  robots?: string;
  author?: string;
  siteName?: string;
  themeColor?: string;
}

/**
 * Standardizes metadata configuration for TanStack Router routes.
 */
export function generateMeta(options: SeoOptions) {
  const title = options.title || "Nomads Navigate Nepal — Himalayan Treks & Adventures";
  const description =
    options.description ||
    "Premium Himalayan trekking and adventure travel. Everest, Annapurna, Langtang and beyond — locally led journeys since 2011.";
  const keywords = options.keywords || "Nepal Trekking, Everest Base Camp Trek, Annapurna Base Camp, Peak Climbing";
  const ogImage = options.ogImage || logoIcon;
  const canonicalUrl = options.canonicalUrl || "";
  const robots = options.robots || "index, follow";
  const author = options.author || "Nomads Navigate Nepal";
  const siteName = options.siteName || "Nomads Navigate Nepal";
  const themeColor = options.themeColor || "#f59e0b"; // Golden/sunset accent

  const meta = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: author },
    { name: "robots", content: robots },
    { name: "theme-color", content: themeColor },
    
    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: options.ogType || "website" },
    { property: "og:image", content: ogImage },
    { property: "og:site_name", content: siteName },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { name: "twitter:site", content: "@NomadsNepal" },
  ];

  const links = [];
  if (canonicalUrl) {
    links.push({ rel: "canonical", href: canonicalUrl });
  }

  return { meta, links };
}

/**
 * JSON-LD Structured Data Schema Generators
 */
export const schemaBuilders = {
  // 1. Local Business & Travel Agency Schema
  localBusiness: (settings: {
    name?: string;
    logo?: string;
    phone?: string;
    email?: string;
    address?: string;
    url?: string;
    sameAs?: string[];
  }) => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${settings.url || "https://nomadsnavigatenepal.com"}/#organization`,
        "name": settings.name || "Nomads Navigate Nepal",
        "url": settings.url || "https://nomadsnavigatenepal.com",
        "logo": settings.logo || logoIcon,
        "image": settings.logo || logoIcon,
        "telephone": settings.phone || "+9779769364689",
        "email": settings.email || "nomadsnavigatenepal5@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": settings.address || "Thamel",
          "addressLocality": "Kathmandu",
          "addressCountry": "NP"
        },
        "priceRange": "$$",
        "areaServed": "Nepal",
        "sameAs": settings.sameAs || [
          "https://www.facebook.com/share/1K8PDHZgfM/",
          "https://www.instagram.com/nomadsnavigatenepal5"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${settings.url || "https://nomadsnavigatenepal.com"}/#website`,
        "url": settings.url || "https://nomadsnavigatenepal.com",
        "name": settings.name || "Nomads Navigate Nepal",
        "publisher": {
          "@id": `${settings.url || "https://nomadsnavigatenepal.com"}/#organization`
        }
      }
    ]
  }),

  // 2. TouristTrip / Tour / Package Schema
  touristTrip: (options: {
    name: string;
    description: string;
    image: string;
    url: string;
    durationDays: number;
    price: number;
    currency: string;
    difficulty: string;
    destination: string;
    ratingValue?: number;
    reviewCount?: number;
    faqs?: { question: string; answer: string }[];
  }) => {
    const mainSchema: any = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": options.name,
      "description": options.description,
      "image": options.image,
      "touristType": "Trekkers, Hikers, Climbers",
      "subjectOf": {
        "@type": "CreativeWork",
        "name": options.name,
        "url": options.url
      },
      "itinerary": {
        "@type": "ItemList",
        "numberOfItems": options.durationDays,
        "itemListElement": []
      },
      "offers": {
        "@type": "Offer",
        "price": options.price,
        "priceCurrency": options.currency,
        "availability": "https://schema.org/InStock",
        "url": options.url,
        "seller": {
          "@type": "TravelAgency",
          "name": "Nomads Navigate Nepal",
          "url": "https://nomadsnavigatenepal.com"
        }
      }
    };

    if (options.ratingValue && options.reviewCount) {
      mainSchema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": options.ratingValue,
        "reviewCount": options.reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      };
    }

    return mainSchema;
  },

  // 3. Article / Blog Schema
  article: (options: {
    title: string;
    description: string;
    image: string;
    url: string;
    publishedDate: string;
    modifiedDate?: string;
    authorName: string;
    publisherName?: string;
    publisherLogo?: string;
    category?: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": options.url
    },
    "headline": options.title,
    "description": options.description,
    "image": options.image,
    "datePublished": options.publishedDate,
    "dateModified": options.modifiedDate || options.publishedDate,
    "author": {
      "@type": "Person",
      "name": options.authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": options.publisherName || "Nomads Navigate Nepal",
      "logo": {
        "@type": "ImageObject",
        "url": options.publisherLogo || logoIcon
      }
    },
    "articleSection": options.category || "Trekking Guides"
  }),

  // 4. Breadcrumb Schema
  breadcrumbs: (items: { name: string; item: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  }),

  // 5. FAQPage Schema
  faqPage: (faqs: { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  })
};
