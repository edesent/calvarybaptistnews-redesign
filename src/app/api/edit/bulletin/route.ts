import { sameOrigin, sessionEmail } from "@/edit/auth";
import { commitFiles, readFile, snapshot, type FileChange } from "@/edit/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Entry = { date: string; pages: string[]; note?: string };

const LIST = "src/content/bulletins.json";
const DIR = "public/img/bulletins";

function sunday(date: string) {
  const d = new Date(`${date}T12:00:00Z`);
  return d.toLocaleDateString("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

/**
 * Post a bulletin: its page images (already uploaded, by id) and an entry in
 * bulletins.json, in one commit. A Sunday that already has a bulletin is only
 * replaced when the editor says so, and then its old page images go too.
 */
export async function POST(req: Request) {
  const email = await sessionEmail();
  if (!email) return Response.json({ error: "Your sign-in ran out. Sign in again to post." }, { status: 401 });
  if (!sameOrigin(req)) return Response.json({ error: "Bad origin." }, { status: 403 });

  const body = (await req.json().catch(() => null)) as { date?: unknown; note?: unknown; pages?: unknown; replace?: unknown } | null;
  const date = typeof body?.date === "string" ? body.date : "";
  const real = /^\d{4}-\d{2}-\d{2}$/.test(date) && new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) === date;
  if (!real) return Response.json({ error: "Pick the Sunday this bulletin is for." }, { status: 400 });
  const pages = Array.isArray(body?.pages) ? body.pages.filter((p): p is string => typeof p === "string" && /^[0-9a-f]{40}$/.test(p)) : [];
  if (!pages.length || pages.length > 12) return Response.json({ error: "Add between 1 and 12 pages." }, { status: 400 });
  const note = typeof body?.note === "string" ? body.note.replace(/\s+/g, " ").trim().slice(0, 120) : "";

  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      const snap = await snapshot({ withFiles: false });
      const text = await readFile(LIST, snap);
      if (text === null) throw new Error(`${LIST} is missing`);
      const list = JSON.parse(text) as Entry[];
      const existing = list.find((b) => b.date === date);
      if (existing && body?.replace !== true) {
        return Response.json({ error: "exists", pages: existing.pages.length }, { status: 409 });
      }

      // A fresh name when this Sunday's usual names are taken, so no browser shows a cached old page.
      const taken = pages.some((_, i) => snap.paths.has(`${DIR}/${date}-${i + 1}.jpg`));
      const stamp = taken ? `-${Date.now().toString(36)}` : "";
      const names = pages.map((_, i) => `${date}-${i + 1}${stamp}.jpg`);

      const entry: Entry = { date, pages: names.map((n) => `/img/bulletins/${n}`), ...(note ? { note } : {}) };
      const next = [entry, ...list.filter((b) => b.date !== date)].sort((a, b) => b.date.localeCompare(a.date));

      const changes: FileChange[] = [
        ...pages.map((sha, i) => ({ path: `${DIR}/${names[i]}`, sha })),
        { path: LIST, content: `${JSON.stringify(next, null, 2)}\n` },
        // Replacing: the old images go, unless a new page reuses the name.
        ...(existing?.pages ?? [])
          .map((p) => `public${p}`)
          .filter((p) => p.startsWith(`${DIR}/`) && snap.paths.has(p) && !names.some((n) => `${DIR}/${n}` === p))
          .map((path) => ({ path, remove: true as const })),
      ];
      const what = `${pages.length} page${pages.length === 1 ? "" : "s"}${note ? `, “${note}”` : ""}`;
      const message = `${existing ? "Replace" : "Post"} the bulletin for ${sunday(date)} (${what})\n\nPosted by ${email} on ${req.headers.get("host")}.`;

      const done = await commitFiles(snap.commit, changes, message);
      if (done) return Response.json({ ok: true, commit: done.commit, path: `/bulletin/${date}` });
    }
    return Response.json({ error: "The site changed while posting. Post again." }, { status: 409 });
  } catch (e) {
    console.error("bulletin post", e);
    return Response.json({ error: "Posting failed — nothing was changed. Try again in a minute." }, { status: 502 });
  }
}
