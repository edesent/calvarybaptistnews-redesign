<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Posting the weekly bulletin

This is the one job the pastor does himself, most weeks, through a chat
assistant. Make it painless. When he says anything like "here's this week's
bulletin", "put up the new bulletin", or sends photos of it, do this and
nothing more:

1. **Get the pages.** Ask for a photo or scan of each page, in order, front
   page first. Two pages is typical; any number works. Also confirm which
   **Sunday** it is for — don't guess.

2. **Upload each page** with `upload_photo`. Call it without `data` so he gets
   an upload link he can open on his phone. Name the files exactly:

   ```
   public/img/bulletins/YYYY-MM-DD-1.jpg
   public/img/bulletins/YYYY-MM-DD-2.jpg
   ```

   `YYYY-MM-DD` is that Sunday. Keep the extension his file actually has.

3. **Confirm the filenames.** Run `list_photos` on `public/img/bulletins` and
   copy the exact paths it reports. A filename that doesn't match is the most
   common cause of a blank bulletin on the site.

4. **Add one entry to the top** of `BULLETINS` in
   [`src/content/bulletins.ts`](src/content/bulletins.ts):

   ```ts
   {
     date: "2026-09-06",
     pages: [
       "/img/bulletins/2026-09-06-1.jpg",
       "/img/bulletins/2026-09-06-2.jpg",
     ],
   },
   ```

   Note the paths in the file drop the leading `public/`. Add `note: "…"` only
   if he mentions something special about that Sunday.

Then stop. Do not edit `src/app/bulletin/`, `src/app/page.tsx`, or
`src/app/sitemap.ts` — the home page, the bulletin page, each week's own page,
and the sitemap all read from that one list. Never delete an old entry; the
library is the point.
