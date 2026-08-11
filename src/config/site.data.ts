// Church data — the ONLY file the self-serve site builder rewrites.
//
// Every component, the layout metadata, sitemap, robots, and manifest read this
// (via site.ts, which adds derived helpers). Edit these values to customize the
// site; leave the helpers in site.ts alone.

export const SITE_DATA = {
  name: "Truth Baptist Church",
  // Short name for the PWA manifest / home-screen icon.
  shortName: "Truth Baptist",
  tagline: "A Bible-Believing, King James Bible Independent Baptist Church",
  description:
    "A friendly Independent King James Bible Baptist church. Join us for Sunday worship at 10:30 AM and Wednesday Bible study at 7:00 PM. Old-fashioned hymns, expository KJV preaching, and warm fellowship — all are welcome.",
  shortDescription: "A Bible-believing, King James Bible Independent Baptist church.",
  url: "https://example.com",

  // Leadership — pastorName is just the name; the title is separate so we can
  // render both "Pastor John Smith" and "Pastor Smith".
  pastorName: "John Smith",
  pastorTitle: "Pastor",

  // Contact
  phone: "(555) 555-0100",
  email: "office@example.com",
  address: {
    street: "123 Church Street",
    city: "Anytown",
    state: "ST",
    zip: "00000",
  },

  // Social (leave blank to hide the link)
  youtubeUrl: "",
  facebookUrl: "",
  // YouTube channel ID (starts with "UC...") — powers the auto-updating sermons
  // library on /messages. Find it at youtube.com/account_advanced. Leave blank
  // to fall back to a "watch on YouTube" link.
  youtubeChannelId: "",

  // Theme — see the site builder's theme presets. accentColor optionally overrides
  // the primary accent. themeColorDark/backgroundColor feed the browser chrome.
  themeKey: "warm-gold",
  accentColor: "",
  themeColorDark: "#2c1810",
  backgroundColor: "#fefcf8",
} as const;
