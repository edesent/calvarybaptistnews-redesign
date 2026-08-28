import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { BULLETINS } from "@/content/bulletins";

/** Every route on the site, with the pages we update most weighted highest. */
const ROUTES: [path: string, priority: number, freq: "weekly" | "monthly" | "yearly"][] =
  [
    ["", 1.0, "weekly"],
    ["/visit", 0.9, "monthly"],
    ["/leadership", 0.8, "monthly"],
    ["/what-we-believe", 0.7, "yearly"],
    ["/history", 0.7, "yearly"],
    ["/vision", 0.7, "monthly"],
    ["/new-building", 0.8, "monthly"],
    ["/join", 0.7, "yearly"],
    ["/ministries", 0.8, "monthly"],
    ["/ministries/children", 0.6, "monthly"],
    ["/ministries/youth", 0.6, "monthly"],
    ["/ministries/ladies", 0.6, "monthly"],
    ["/ministries/seniors", 0.6, "monthly"],
    ["/ministries/music", 0.6, "monthly"],
    ["/ministries/outreach", 0.6, "monthly"],
    ["/school-of-the-bible", 0.7, "monthly"],
    ["/missions", 0.7, "monthly"],
    ["/special-projects", 0.6, "monthly"],
    ["/sermons", 0.9, "weekly"],
    ["/radio", 0.6, "monthly"],
    ["/resources", 0.7, "monthly"],
    ["/bulletin", 0.7, "weekly"],
    ["/contact", 0.7, "yearly"],
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(([path, priority, changeFrequency]) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
