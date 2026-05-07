import { MetadataRoute } from "next";
import { CORE_SITE_ROUTES, LAST_MAJOR_UPDATE, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return CORE_SITE_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: LAST_MAJOR_UPDATE,
    changeFrequency: route.path === "/" ? "daily" : "weekly",
    priority: route.priority,
  }));
}
