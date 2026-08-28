/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  THE WEEKLY BULLETIN — this is the only file that changes each week.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  TO POST A NEW BULLETIN (assistant: follow these four steps exactly)
 *
 *  1. Ask the pastor for a photo or scan of EACH page of the bulletin, in
 *     order, front page first. Two pages is the usual, but any number works.
 *
 *  2. Upload each page with `upload_photo`, using this exact naming pattern
 *     so the files never collide and a new week never serves last week's
 *     cached picture:
 *
 *         public/img/bulletins/YYYY-MM-DD-1.jpg
 *         public/img/bulletins/YYYY-MM-DD-2.jpg     (and -3, -4 … if needed)
 *
 *     YYYY-MM-DD is the SUNDAY the bulletin is for — e.g. 2026-09-06.
 *     Keep whatever extension the pastor's file actually has (.jpg, .jpeg,
 *     .png, .webp). When the uploads are done, run `list_photos` on
 *     'public/img/bulletins' and copy the exact filenames it reports. A
 *     mistyped filename is the number one cause of a blank bulletin.
 *
 *  3. Add ONE new entry to the TOP of the BULLETINS list below, following the
 *     shape of the entry already there. Newest first: whatever sits at the
 *     top is what the site calls "this week's bulletin" and what shows on the
 *     home page.
 *
 *  4. Done. Nothing else needs touching — the home page, the bulletin page,
 *     the library, the individual week pages, and the sitemap all read from
 *     this list.
 *
 *  Never delete an old entry. Every past bulletin stays in the library and
 *  keeps its own permanent page at /bulletin/YYYY-MM-DD.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export type Bulletin = {
  /** The Sunday this bulletin was handed out, written as YYYY-MM-DD. */
  date: string;
  /** Every page image, front page first. Any number of pages is fine. */
  pages: string[];
  /** Optional one line under the date, e.g. "Homecoming Sunday". */
  note?: string;
};

/** Newest at the top. Add this week's bulletin directly above the others. */
export const BULLETINS: Bulletin[] = [
  {
    date: "2026-08-23",
    pages: ["/img/bulletin-1.jpg", "/img/bulletin-2.jpg"],
  },
];

/* ── Everything below is machinery. There is no need to edit it. ─────────── */

/**
 * Sorted rather than trusted, so a bulletin added in the wrong place in the
 * list above still lands in the right spot on the page. An entry with no
 * pages yet is skipped rather than rendered as a broken frame — a half-typed
 * entry should never take the bulletin page down.
 */
export const BULLETINS_NEWEST_FIRST: Bulletin[] = BULLETINS.filter(
  (b) => b.pages.length > 0
).sort((a, b) => b.date.localeCompare(a.date));

/** This week's — the one shown large on /bulletin and on the home page. */
export const LATEST_BULLETIN: Bulletin | null =
  BULLETINS_NEWEST_FIRST[0] ?? null;

/** Everything older, which is what fills the library. */
export const PAST_BULLETINS: Bulletin[] = BULLETINS_NEWEST_FIRST.slice(1);

export function bulletinByDate(date: string): Bulletin | undefined {
  return BULLETINS.find((b) => b.date === date);
}

/** The week before and after, for paging through the library. */
export function bulletinNeighbours(date: string): {
  newer: Bulletin | null;
  older: Bulletin | null;
} {
  const i = BULLETINS_NEWEST_FIRST.findIndex((b) => b.date === date);
  if (i === -1) return { newer: null, older: null };
  return {
    newer: BULLETINS_NEWEST_FIRST[i - 1] ?? null,
    older: BULLETINS_NEWEST_FIRST[i + 1] ?? null,
  };
}

/**
 * "Sunday, August 23, 2026".
 *
 * Built from the three numbers rather than `new Date("2026-08-23")` and
 * rendered in UTC, because parsing a bare date string and then formatting it
 * in a local timezone west of Greenwich prints the day before.
 */
export function formatBulletinDate(date: string): string {
  return toUtcDate(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** "August 23, 2026" — the same date without the weekday, for tight spaces. */
export function formatBulletinDateShort(date: string): string {
  return toUtcDate(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** The four-digit year, used to group the library. */
export function bulletinYear(date: string): string {
  return date.slice(0, 4);
}

const ORDINALS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
];

/** "Page one", "Page two", … falling back to digits past twelve. */
export function pageLabel(index: number): string {
  return ORDINALS[index] ? `Page ${ORDINALS[index]}` : `Page ${index + 1}`;
}

function toUtcDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}
