# Calvary Baptist Church — McMinnville, Tennessee

A redesign of [calvarybaptistnews.com](https://calvarybaptistnews.com) for Calvary
Baptist Church, 610 Myers Lane, McMinnville, TN 37110. Pastor Tom Fittis.

Built and maintained by Pastor Eli — **[elijahdesent.com](https://www.elijahdesent.com)**.

---

## Edit this site in plain English (no code)

You do not have to touch any of the files below by hand. This site can be edited
in plain English through the **Custom Website Editor** — a hosted
[Model Context Protocol](https://modelcontextprotocol.io) tool. You describe the
change ("change Sunday evening to 5:30", "add a paragraph about VBS", "swap the
hero photo") and it makes the exact edit and ships it to the live site in about
thirty seconds.

**Add it to ChatGPT or Claude:**

- **Endpoint:** `https://www.elijahdesent.com/api/mcp`
- **Transport:** Streamable HTTP
- **Auth:** OAuth (handled automatically — you sign in once)
- **MCP Registry name:** `com.elijahdesent/custom-website-editor`

In ChatGPT (Settings → Connectors → Add) or Claude (Settings → Connectors → Add
custom connector), paste the endpoint above and sign in.

---

## The one file that matters

**`src/config/site.ts`** holds nearly all the church's content: address, phone,
service times, leadership bios, the missionary roster, ministries, testimonies,
broadcast times, and the navigation menu. Change a service time there and it
updates in the header strip, the homepage, `/visit`, `/ministries`, `/bulletin`,
`/contact`, the footer, and the structured data Google reads — all at once.

Longer documents live beside it:

| File | What it holds |
| --- | --- |
| `src/config/site.ts` | Church facts, times, staff, missionaries, ministries, nav |
| `src/content/articles-of-faith.ts` | The 29 Articles of Faith, verbatim |
| `src/content/ministries.ts` | Detail copy for each `/ministries/<name>` page |

## Design

"Wine & Ivory" — the palette is taken straight off the church logo: the wine of
the script and the brush-drawn oval (`#84284d`), plain black for the wordmark,
and a warm ivory for paper. Nothing else is invented.

- **Display type:** Lora · **Body type:** Source Sans 3
- **The motif** is the logo's oval. It reappears as the pastor's portrait frame
  (`OvalPhoto`), as a faint watermark behind page headers, and as the favicon.
- All colour tokens are defined once, at the top of `src/app/globals.css`.
  Change a hex there and the whole site reskins.

`src/components/ui.tsx` holds the shared pieces every page is built from:
`Section`, `Heading`, `Button`, `PageHero`, `Figure`, `Scripture`, `OvalPhoto`,
`Card`. Use them rather than writing new one-off styles.

## Pages

```
/                        Home
/visit                   Plan your visit — times, what to expect, FAQs
/leadership              Pastor & leaders
/what-we-believe         Articles of Faith (29 articles)
/history                 Church history, 1972 to now
/vision                  Drive-in → open-air → the Tabernacle → next
/new-building            The building project, with the walkthrough video
/join                    How to join the church
/ministries              Hub
/ministries/children     …/youth  …/ladies  …/seniors  …/music  …/outreach
/school-of-the-bible     McMinnville School of the Bible
/missions                59 missionaries across four fields
/special-projects        Disaster relief, Mongolia, Panama
/sermons                 Auto-updating from the church's YouTube channel
/radio                   Radio & BLTV broadcast times
/resources               Anchors of Faith, Discipleship 101, newsletter
/bulletin                This week's bulletin pages
/contact                 Contact form + map
```

### Things that update themselves

- **`/sermons`** reads the church's public YouTube RSS feed every thirty
  minutes. New uploads appear with no edit. Nothing to maintain — the channel id
  is `SITE.youtubeChannelId`.

### Old URLs

The previous site used auto-generated addresses (`/newpage`, `/2youth`,
`/missions9192758b`). Every one is redirected to its new home in
`next.config.ts` → `LEGACY_REDIRECTS`, so old links and Google results keep
working. Add to that list rather than deleting rows.

## The contact form

`/contact` posts to `src/app/api/contact/route.ts`, which delivers by whichever
of these is configured (in this order):

1. **`SLACK_WEBHOOK_URL`** — posts into a Slack channel. Works immediately, no
   domain verification needed. This is the easy option.
2. **`RESEND_API_KEY`** — emails `CHURCH_INBOX` in `src/lib/email.ts`. The
   sending domain must be verified at [resend.com/domains](https://resend.com/domains)
   first.

With neither set, the form tells the visitor to phone the church instead of
silently swallowing the message.

## Photos

Everything in `public/img/` is a real photograph of Calvary Baptist Church or its
property — several were pulled from the church's own video footage (the interior,
the congregation, the groundbreaking, the property before it was built on). The
three `new-church-building*.jpg` files are the architect's renderings.

**No AI-generated or stock imagery.** If a new photo is needed, get a real one
from the church.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · no database.

> **A note for AI assistants:** this is Next.js 16, which has breaking changes
> from earlier versions. Read the relevant guide in `node_modules/next/dist/docs/`
> before writing code. See `AGENTS.md`.
