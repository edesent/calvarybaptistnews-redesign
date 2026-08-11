import type { NextConfig } from "next";
import path from "path";

/**
 * The old site's URLs were auto-generated ("/newpage", "/2youth",
 * "/missions9192758b"). Those addresses are in Google's index, on printed
 * bulletins, and in people's bookmarks, so every one of them is redirected to
 * its new home rather than left to 404.
 */
const LEGACY_REDIRECTS: [from: string, to: string][] = [
  ["/newpage", "/leadership"],
  ["/our-future", "/vision"],
  ["/newe-building-project", "/new-building"],
  ["/new-building-project", "/new-building"],
  ["/how-to-join-our-church", "/join"],
  ["/ladies-ministry", "/ministries/ladies"],
  ["/2youth", "/ministries/youth"],
  ["/youth", "/ministries/youth"],
  ["/empty-page", "/ministries/children"],
  ["/senior-fellowship", "/ministries/seniors"],
  ["/missions9192758b", "/missions"],
  ["/new-page", "/special-projects"],
  ["/mcminnville-school-of-the-bible", "/school-of-the-bible"],
  ["/this-weeks-bulletincacb9e0a", "/bulletin"],
  ["/this-weeks-bulletin", "/bulletin"],
  ["/resource-page", "/resources"],
  ["/radio-broadcasts", "/radio"],
  ["/about", "/leadership"],
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Sermon thumbnails come straight off the church's YouTube channel feed.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  async redirects() {
    return LEGACY_REDIRECTS.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
