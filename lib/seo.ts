import type { Metadata } from "next";
import {
  LAST_MAJOR_UPDATE,
  SITE_AUTHOR,
  SITE_DATE_PUBLISHED,
  SITE_EMAIL,
  SITE_NAME,
  SITE_SAME_AS,
  SITE_TWITTER,
  SITE_URL,
} from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  /** Explicit OG/Twitter image size (defaults for 1200×630 social cards). */
  imageWidth?: number;
  imageHeight?: number;
  imageType?: string;
  datePublished?: string;
  dateModified?: string;
  /** Use "article" on content/tool landing pages that need published/modified times. */
  ogType?: "website" | "article";
  /**
   * Bypass root `title.template` so SERP titles stay within ~60 characters.
   * When true, metadata.title is emitted as `{ absolute: title }`.
   */
  absoluteTitle?: boolean;
};

type FaqItem = {
  question: string;
  answer: string;
};

type WebAppSchemaInput = {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
  featureList?: string[];
  datePublished?: string;
  dateModified?: string;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type HowToStep = {
  name: string;
  text: string;
};

type WebPageSchemaInput = {
  name: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
};

function toAbsoluteUrl(path: string) {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  return canonical === "/" ? SITE_URL : `${SITE_URL}${canonical}`;
}

function organizationEntity() {
  return {
    "@type": "Organization" as const,
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: [...SITE_SAME_AS],
  };
}

function personAuthorEntity() {
  return {
    "@type": "Organization" as const,
    name: SITE_AUTHOR.name,
    url: SITE_AUTHOR.url,
    sameAs: [...SITE_SAME_AS],
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = "/home-hero-field-atelier.png",
  imageAlt = `${SITE_NAME} preview image`,
  imageWidth = 1200,
  imageHeight = 630,
  imageType = "image/png",
  datePublished = SITE_DATE_PUBLISHED,
  dateModified = LAST_MAJOR_UPDATE.toISOString(),
  ogType = "website",
  absoluteTitle = false,
}: MetadataInput): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const fullUrl = toAbsoluteUrl(path);
  const socialImage = {
    url: image,
    secureUrl: toAbsoluteUrl(image),
    width: imageWidth,
    height: imageHeight,
    alt: imageAlt,
    type: imageType,
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    authors: [{ name: SITE_AUTHOR.name, url: SITE_AUTHOR.url }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      images: [socialImage],
      locale: "en_US",
      type: ogType,
      ...(ogType === "article"
        ? {
            publishedTime: datePublished,
            modifiedTime: dateModified,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: image,
          alt: imageAlt,
          width: imageWidth,
          height: imageHeight,
        },
      ],
      creator: SITE_TWITTER,
      site: SITE_TWITTER,
    },
    other: {
      "article:published_time": datePublished,
      "article:modified_time": dateModified,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function buildFaqSchema(faqs: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildWebAppSchema({
  name,
  description,
  path,
  applicationCategory = "UtilityApplication",
  featureList = [],
  datePublished = SITE_DATE_PUBLISHED,
  dateModified = LAST_MAJOR_UPDATE.toISOString(),
}: WebAppSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    applicationCategory,
    description,
    url: toAbsoluteUrl(path),
    datePublished,
    dateModified,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList,
    author: personAuthorEntity(),
    provider: organizationEntity(),
    publisher: organizationEntity(),
  };
}

export function buildWebPageSchema({
  name,
  description,
  path,
  datePublished = SITE_DATE_PUBLISHED,
  dateModified = LAST_MAJOR_UPDATE.toISOString(),
}: WebPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: toAbsoluteUrl(path),
    datePublished,
    dateModified,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    author: personAuthorEntity(),
    publisher: organizationEntity(),
    mainEntity: {
      "@type": "WebApplication",
      name,
      url: toAbsoluteUrl(path),
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    ...organizationEntity(),
    description:
      "Free random animal generator and drawing prompt tools for artists, teachers, and classrooms.",
    email: SITE_EMAIL,
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-US",
    publisher: organizationEntity(),
  };
}

export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function buildHowToSchema(
  name: string,
  description: string,
  path: string,
  steps: readonly HowToStep[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url: toAbsoluteUrl(path),
    totalTime: "PT5M",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
