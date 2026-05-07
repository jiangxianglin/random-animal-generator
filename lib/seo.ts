import type { Metadata } from "next";
import { SITE_NAME, SITE_TWITTER, SITE_URL } from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
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
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = "/RandomAnimalGenerator-hero.png",
  imageAlt = `${SITE_NAME} preview image`,
}: MetadataInput): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const fullUrl = canonical === "/" ? SITE_URL : `${SITE_URL}${canonical}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    authors: [{ name: SITE_NAME }],
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
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: SITE_TWITTER,
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
}: WebAppSchemaInput) {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const fullUrl = canonical === "/" ? SITE_URL : `${SITE_URL}${canonical}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    applicationCategory,
    description,
    url: fullUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}
