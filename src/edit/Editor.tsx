"use client";

import "./editor.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { BULLETINS_NEWEST_FIRST, formatBulletinDate } from "@/content/bulletins";
import { PUBLIC_SITE } from "./hosts";

/**
 * The pastor's editor, opened at /edit.
 *
 * Text: any text inside <main> that the server can trace to exactly one place
 * in the source gets outlined on hover. Clicking it opens a box to rewrite it;
 * Publish sends every change (with the text around it, to tell repeats apart)
 * to /api/edit/text, which commits them. The site itself is never restructured
 * for this — the page's own text nodes are read and updated in place.
 *
 * Bulletins: "Post a bulletin" turns photos or a PDF into page images in the
 * browser and commits them with a bulletins.json entry (/api/edit/bulletin).
 */

type Note = { tone: "info" | "good" | "bad"; text: string };
type Edit = { path: string; text: string; to: string; context: string[]; where: string };
type Deploy = {
  commit: string;
  state: "pending" | "live" | "failed";
  startedAt: number;
  kind: "text" | "bulletin";
  /** Text edits to look for on the live pages once deployed. */
  check?: { path: string; to: string }[];
  /** Where the posted bulletin will appear. */
  link?: string;
};
type Confirm = { kind: "publish"; problems?: Record<string, string> } | { kind: "exit" } | { kind: "bulletin" };
type Page = { id: string; blob: Blob; url: string };

const DRAFT_KEY = "cbc-edit-draft";
/** What we tell people a publish takes to reach the live site (Vercel build + deploy). */
const LIVE_SECONDS = 120;

const tidy = (s: string) => s.replace(/\s+/g, " ").trim();
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;
const clip = (s: string, n = 140) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const clock = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
const keyOf = (path: string, text: string, context: string[]) => `${path}\u0000${text}\u0000${context.join("\u0001")}`;
/** /edit shows the home page. */
const pagePath = (p: string) => (p === "/edit" ? "/" : p);

const btn =
  "inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-[14.5px] font-semibold tracking-wide transition-colors disabled:cursor-progress disabled:opacity-60";
const solid = `${btn} bg-wine text-white hover:bg-wine-deep`;
const outline = `${btn} border border-wine text-wine hover:bg-wine hover:text-white`;
const onDark = `${btn} border border-white/30 text-white hover:bg-white/10`;
const field =
  "w-full rounded-sm border border-rule-strong bg-white px-4 py-3 text-[16px] text-ink placeholder:text-faint focus:border-wine focus:outline-none";

function loadDraft(): Edit[] {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "[]") as Edit[];
  } catch {
    return [];
  }
}
function saveDraft(list: Edit[]) {
  try {
    if (list.length) localStorage.setItem(DRAFT_KEY, JSON.stringify(list));
    else localStorage.removeItem(DRAFT_KEY);
  } catch {}
}

/* ── Reading the page ───────────────────────────────────────────────────── */

const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "OPTION", "SELECT", "TEMPLATE"]);

function textNodes(root: Node) {
  const out: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const el = n.parentElement;
      if (!el || SKIP.has(el.tagName) || el.closest("svg, [data-edit-skip]")) return NodeFilter.FILTER_REJECT;
      return /[A-Za-z0-9]/.test(n.nodeValue ?? "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) out.push(n as Text);
  return out;
}

/** The texts nearest this one on the page — up to four levels out, closest first. */
function contextOf(node: Text, all: Text[], original: (t: Text) => string) {
  const order = new Map(all.map((n, i) => [n, i]));
  const here = order.get(node) ?? 0;
  const seen = new Set<Text>([node]);
  const out: string[] = [];
  let el: Element | null = node.parentElement;
  for (let level = 0; el && level < 4 && out.length < 8; level++, el = el.parentElement) {
    const inside = all.filter((n) => !seen.has(n) && el!.contains(n));
    inside.sort((a, b) => Math.abs((order.get(a) ?? 0) - here) - Math.abs((order.get(b) ?? 0) - here));
    for (const n of inside) {
      seen.add(n);
      out.push(tidy(original(n)));
      if (out.length >= 8) break;
    }
  }
  return out;
}

/* ── Turning a bulletin into page images ────────────────────────────────── */

function toJpeg(canvas: HTMLCanvasElement, quality = 0.84) {
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode"))), "image/jpeg", quality),
  );
}

async function imagePage(file: File) {
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return toJpeg(canvas);
}

async function pdfPages(file: File) {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const out: Blob[] = [];
  for (let n = 1; n <= Math.min(doc.numPages, 12); n++) {
    const page = await doc.getPage(n);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: Math.min(3, 1800 / Math.max(base.width, base.height)) });
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    out.push(await toJpeg(canvas));
  }
  return out;
}

/** The coming Sunday (today, if it is Sunday), as YYYY-MM-DD in local time. */
function nextSunday() {
  const d = new Date();
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ── The dialog shell ───────────────────────────────────────────────────── */

function Dialog({ title, wide, children }: { title: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-dialog-title"
        className={`my-auto w-full ${wide ? "max-w-[640px]" : "max-w-[500px]"} rounded-sm border-t-4 border-wine bg-paper p-7 shadow-[0_30px_80px_-20px_rgba(23,19,26,0.55)] sm:p-9`}
      >
        <h2 id="edit-dialog-title" className="font-serif text-[27px] leading-tight text-ink">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

/** `onClose` leaves edit mode (EditGate reloads the page fresh, without the editor). */
export function Editor({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState<string | null | undefined>(undefined);
  const [preview, setPreview] = useState(false);
  const [edits, setEdits] = useState<Edit[]>([]);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<Note | null>(null);
  const [deploy, setDeploy] = useState<Deploy | null>(null);
  const [confirm, setConfirm] = useState<Confirm | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [addr, setAddr] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [missing, setMissing] = useState<string[]>([]);
  // The text box for one piece of text.
  const [open, setOpen] = useState<{ node: Text; text: string; context: string[]; where: string; value: string } | null>(null);
  // The bulletin form.
  const [bDate, setBDate] = useState(nextSunday);
  const [bNote, setBNote] = useState("");
  const [bPages, setBPages] = useState<Page[]>([]);
  const [bWork, setBWork] = useState<string | null>(null);
  const [bReplace, setBReplace] = useState<number | null>(null);
  const shas = useRef<Map<string, string>>(new Map());

  /** Per text node: its words as the source has them (before any edit here) and where they live. */
  const original = useRef(new WeakMap<Text, string>());
  const placed = useRef(new WeakMap<Text, { where: string; context: string[] }>());
  const answers = useRef(new Map<string, string | null>());
  const editsRef = useRef<Edit[]>([]);
  editsRef.current = edits;

  const textOf = useCallback((n: Text) => original.current.get(n) ?? n.nodeValue ?? "", []);

  const writeEdits = useCallback((next: Edit[]) => {
    setEdits(next);
    saveDraft(next);
  }, []);

  /** Show every change on the page, gold-outlined; anything else shows its original words. */
  const paint = useCallback(() => {
    const main = document.querySelector("main");
    if (!main) return;
    const path = location.pathname;
    for (const node of textNodes(main)) {
      const info = placed.current.get(node);
      if (!info) continue;
      const was = textOf(node);
      const edit = editsRef.current.find((e) => e.path === path && e.text === tidy(was) && e.context.join() === info.context.join());
      const raw = node.nodeValue ?? "";
      const lead = raw.match(/^\s*/)![0];
      const trail = raw.match(/\s*$/)![0];
      const want = edit ? `${lead}${edit.to}${trail}` : was;
      if (!original.current.has(node)) original.current.set(node, raw);
      if (raw !== want) node.nodeValue = want;
      node.parentElement?.toggleAttribute("data-txt-changed", Boolean(edit));
    }
  }, [textOf]);

  /** Ask which texts on this page can be edited, then mark them. */
  const scan = useCallback(async () => {
    const main = document.querySelector("main");
    if (!main) return;
    const path = location.pathname;
    const nodes = textNodes(main);
    const items = nodes.map((n) => {
      const text = tidy(textOf(n));
      const context = contextOf(n, nodes, textOf);
      return { n, text, context, key: keyOf(path, text, context) };
    });
    const unknown = items.filter((it) => !answers.current.has(it.key));
    if (unknown.length) {
      setScanning(true);
      try {
        const r = await fetch("/api/edit/locate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ path: pagePath(path), items: unknown.map(({ text, context }) => ({ text, context })) }),
        });
        if (r.status === 401) return setEmail(null);
        const j = (await r.json()) as { results?: (string | null)[]; error?: string };
        if (!r.ok || !j.results) throw new Error(j.error);
        unknown.forEach((it, i) => answers.current.set(it.key, j.results![i] ?? null));
      } catch {
        setNote({ tone: "bad", text: "Couldn’t check which text is editable. Reload the page to try again." });
        return;
      } finally {
        setScanning(false);
      }
    }
    if (location.pathname !== path) return;
    for (const it of items) {
      const where = answers.current.get(it.key);
      if (where) {
        placed.current.set(it.n, { where, context: it.context });
        it.n.parentElement?.setAttribute("data-txt", "");
      }
    }
    paint();
    // Changes waiting for a page that shows them; flag any this page can no longer place.
    setMissing(
      editsRef.current
        .filter((e) => e.path === path && !items.some((it) => it.text === e.text && answers.current.get(it.key)))
        .map((e) => e.text),
    );
  }, [paint, textOf]);

  /* ── Session ── */

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.editor = "";
    const url = new URL(location.href);
    if (url.searchParams.get("signin") === "expired") {
      setNote({ tone: "bad", text: "That sign-in link has expired. Send yourself a new one." });
      url.searchParams.delete("signin");
      history.replaceState(history.state, "", url);
    }
    fetch("/api/edit/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((j: { email?: string | null }) => setEmail(j.email ?? null))
      .catch(() => setEmail(null));
    const draft = loadDraft();
    if (draft.length) {
      setEdits(draft);
      setNote({ tone: "info", text: `${plural(draft.length, "change")} you hadn’t published yet ${draft.length === 1 ? "is" : "are"} back, outlined in gold.` });
    }
    return () => {
      delete html.dataset.editor;
    };
  }, []);

  const editing = Boolean(email) && !preview;

  /* ── Edit mode: mark text, follow page changes, catch clicks ── */

  useEffect(() => {
    if (!editing) return;
    const html = document.documentElement;
    html.dataset.editing = "";
    scan();

    let timer = 0;
    let lastPath = location.pathname;
    const mo = new MutationObserver(() => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (location.pathname !== lastPath) lastPath = location.pathname;
        scan();
      }, 350);
    });
    const main = document.querySelector("main");
    if (main) mo.observe(main, { childList: true, subtree: true });

    let hovered: Element | null = null;
    const onOver = (e: MouseEvent) => {
      const el = e.target instanceof Element ? e.target.closest("main [data-txt]") : null;
      if (el === hovered) return;
      hovered?.removeAttribute("data-txt-hover");
      hovered = el;
      el?.setAttribute("data-txt-hover", "");
    };
    const onClick = (e: MouseEvent) => {
      const el = e.target instanceof Element ? e.target.closest("main [data-txt]") : null;
      if (!el) return;
      // Which of this element's own texts was clicked.
      const own = [...el.childNodes].filter((n): n is Text => n.nodeType === Node.TEXT_NODE && placed.current.has(n as Text));
      // The text under the pointer; an element with just one text counts anywhere on it.
      const node =
        own.find((n) => {
          const range = document.createRange();
          range.selectNodeContents(n);
          return [...range.getClientRects()].some((r) => e.clientX >= r.left - 2 && e.clientX <= r.right + 2 && e.clientY >= r.top - 2 && e.clientY <= r.bottom + 2);
        }) ?? (own.length === 1 ? own[0] : undefined);
      if (!node) return;
      e.preventDefault();
      e.stopPropagation();
      setNote(null);
      const info = placed.current.get(node)!;
      setOpen({ node, text: tidy(textOf(node)), context: info.context, where: info.where, value: tidy(node.nodeValue ?? "") });
    };
    document.addEventListener("mouseover", onOver);
    window.addEventListener("click", onClick, true);
    return () => {
      delete html.dataset.editing;
      clearTimeout(timer);
      mo.disconnect();
      hovered?.removeAttribute("data-txt-hover");
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("click", onClick, true);
    };
  }, [editing, scan, textOf]);

  /* ── Dialog plumbing ── */

  const dialogOpen = email === null || confirm !== null || open !== null;
  useEffect(() => {
    if (!dialogOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [dialogOpen]);

  useEffect(() => {
    if (!confirm && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || busy || bWork) return;
      setConfirm(null);
      setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirm, open, busy, bWork]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (editsRef.current.length || bPages.length) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [bPages.length]);

  /* ── After publishing: count down, watch the deploy, then check the page ── */

  useEffect(() => {
    if (deploy?.state !== "pending") return;
    const tick = setInterval(() => setNow(Date.now()), 1000);
    let tries = 0;
    const poll = setInterval(async () => {
      if (++tries > 72) return clearInterval(poll);
      const j = (await fetch(`/api/edit/status?commit=${deploy.commit}`, { cache: "no-store" })
        .then((r) => r.json())
        .catch(() => null)) as { state?: Deploy["state"] } | null;
      if (!j?.state || j.state === "pending") return;
      setDeploy({ ...deploy, state: j.state });
      if (j.state !== "live" || !deploy.check?.length) return;
      // Make sure each change shows up on the page it was made on.
      const notShown: string[] = [];
      for (const c of deploy.check) {
        const html = await fetch(`${c.path}?fresh=${Date.now()}`, { cache: "no-store" })
          .then((r) => r.text())
          .catch(() => "");
        const doc = new DOMParser().parseFromString(html, "text/html");
        if (!tidy(doc.querySelector("main")?.textContent ?? "").includes(c.to)) notShown.push(c.to);
      }
      if (notShown.length) {
        setNote({
          tone: "bad",
          text: `Published, but ${plural(notShown.length, "change")} didn’t show up where you made ${notShown.length === 1 ? "it" : "them"}: “${clip(notShown[0], 60)}”. Let Eli know.`,
        });
      }
    }, 5000);
    return () => {
      clearInterval(tick);
      clearInterval(poll);
    };
  }, [deploy]);

  /* ── Actions ── */

  async function requestLink(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNote(null);
    try {
      const r = await fetch("/api/edit/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: addr }),
      });
      const j = (await r.json().catch(() => ({}))) as { error?: string };
      if (r.ok) setSent(addr.trim());
      else setNote({ tone: "bad", text: j.error ?? "Couldn’t send the link. Try again." });
    } catch {
      setNote({ tone: "bad", text: "Couldn’t reach the server. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  }

  function saveText() {
    if (!open) return;
    const to = tidy(open.value);
    if (!to) return setNote({ tone: "bad", text: "Text can’t be left empty — use Cancel to keep it." });
    const path = location.pathname;
    const rest = edits.filter((e) => !(e.path === path && e.text === open.text && e.context.join() === open.context.join()));
    writeEdits(to === open.text ? rest : [...rest, { path, text: open.text, to, context: open.context, where: open.where }]);
    setOpen(null);
    setNote(null);
    requestAnimationFrame(paint);
  }

  function undoText() {
    if (!open) return;
    const path = location.pathname;
    writeEdits(edits.filter((e) => !(e.path === path && e.text === open.text && e.context.join() === open.context.join())));
    setOpen(null);
    requestAnimationFrame(paint);
  }

  async function publish() {
    if (!edits.length || busy) return;
    setBusy(true);
    setNote(null);
    try {
      const r = await fetch("/api/edit/text", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ changes: edits.map(({ path, text, to, context }) => ({ path: pagePath(path), text, to, context })) }),
      });
      const j = (await r.json().catch(() => ({}))) as { error?: string; problems?: { i: number; reason: string }[]; commit?: string };
      if (r.status === 401) {
        setConfirm(null);
        setEmail(null);
        setNote({ tone: "bad", text: "Your sign-in ran out. Sign in again — your changes are saved on this device." });
        return;
      }
      if (j.error === "problems" && j.problems) {
        const problems: Record<string, string> = {};
        for (const p of j.problems) {
          const e = edits[p.i];
          problems[keyOf(e.path, e.text, e.context)] =
            p.reason === "repeated" ? "This text now appears in more than one place." : "This text has changed since you opened the page.";
        }
        setConfirm({ kind: "publish", problems });
        return;
      }
      if (!r.ok || !j.commit) {
        setNote({ tone: "bad", text: j.error ?? "Publishing failed. Try again." });
        setConfirm(null);
        return;
      }
      const check = edits.map((e) => ({ path: pagePath(e.path), to: e.to }));
      // The new words are the page's words now.
      for (const node of textNodes(document.querySelector("main") ?? document.body)) {
        if (placed.current.has(node) && node.parentElement?.hasAttribute("data-txt-changed")) {
          original.current.set(node, node.nodeValue ?? "");
          node.parentElement.removeAttribute("data-txt-changed");
        }
      }
      answers.current.clear();
      writeEdits([]);
      setConfirm(null);
      setDeploy({ commit: j.commit, state: "pending", startedAt: Date.now(), kind: "text", check });
      setNow(Date.now());
      scan();
    } catch {
      setNote({ tone: "bad", text: "Couldn’t reach the server. Nothing was published — try again." });
      setConfirm(null);
    } finally {
      setBusy(false);
    }
  }

  function discardAll() {
    writeEdits([]);
    setNote(null);
    requestAnimationFrame(paint);
  }

  async function exit(signOut: boolean) {
    saveDraft([]);
    editsRef.current = [];
    setEdits([]);
    for (const p of bPages) URL.revokeObjectURL(p.url);
    setBPages([]);
    if (signOut) await fetch("/api/edit/session", { method: "DELETE" }).catch(() => null);
    onClose();
  }

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    setBWork("Getting the pages ready…");
    setNote(null);
    try {
      const added: Page[] = [];
      for (const file of [...files]) {
        const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
        let blobs: Blob[];
        try {
          blobs = isPdf ? await pdfPages(file) : [await imagePage(file)];
        } catch {
          setNote({
            tone: "bad",
            text: `“${file.name}” couldn’t be opened. Use a photo (JPG or PNG) or a PDF${/heic|heif/i.test(file.name) ? " — iPhone HEIC photos need to be saved as JPG first" : ""}.`,
          });
          continue;
        }
        for (const blob of blobs) added.push({ id: crypto.randomUUID(), blob, url: URL.createObjectURL(blob) });
      }
      setBPages((p) => [...p, ...added].slice(0, 12));
    } finally {
      setBWork(null);
    }
  }

  function movePage(i: number, d: number) {
    setBPages((p) => {
      const next = [...p];
      const [page] = next.splice(i, 1);
      next.splice(i + d, 0, page);
      return next;
    });
  }

  function removePage(i: number) {
    setBPages((p) => {
      URL.revokeObjectURL(p[i].url);
      return p.filter((_, k) => k !== i);
    });
  }

  async function postBulletin(replace: boolean) {
    if (!bPages.length || bWork) return;
    setNote(null);
    setBReplace(null);
    try {
      const ids: string[] = [];
      for (const [i, page] of bPages.entries()) {
        setBWork(`Uploading page ${i + 1} of ${bPages.length}…`);
        let sha = shas.current.get(page.id);
        if (!sha) {
          const r = await fetch("/api/edit/bulletin/page", { method: "POST", headers: { "content-type": "image/jpeg" }, body: page.blob });
          const j = (await r.json().catch(() => ({}))) as { sha?: string; error?: string };
          if (r.status === 401) return setEmail(null);
          if (!r.ok || !j.sha) throw new Error(j.error ?? "Uploading a page failed.");
          sha = j.sha;
          shas.current.set(page.id, sha);
        }
        ids.push(sha);
      }
      setBWork("Posting the bulletin…");
      const r = await fetch("/api/edit/bulletin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ date: bDate, note: bNote, pages: ids, replace }),
      });
      const j = (await r.json().catch(() => ({}))) as { error?: string; commit?: string; path?: string; pages?: number };
      if (r.status === 401) return setEmail(null);
      if (j.error === "exists") return setBReplace(j.pages ?? 0);
      if (!r.ok || !j.commit) throw new Error(j.error ?? "Posting failed.");
      for (const p of bPages) URL.revokeObjectURL(p.url);
      setBPages([]);
      setBNote("");
      setConfirm(null);
      setDeploy({ commit: j.commit, state: "pending", startedAt: Date.now(), kind: "bulletin", link: j.path });
      setNow(Date.now());
    } catch (e) {
      setNote({ tone: "bad", text: e instanceof Error ? e.message : "Posting failed. Try again." });
    } finally {
      setBWork(null);
    }
  }

  /* ── Status line ── */

  const left = deploy ? Math.max(0, LIVE_SECONDS - Math.floor((now - deploy.startedAt) / 1000)) : 0;
  const what = deploy?.kind === "bulletin" ? "The bulletin" : "Your changes";
  const status: Note | null =
    note ??
    (deploy?.state === "pending"
      ? {
          tone: "info",
          text: left
            ? `Published. ${what} will be on the live site in about ${clock(left)} — until then it still shows the old version.`
            : "Still updating the live site — almost there.",
        }
      : deploy?.state === "live"
        ? { tone: "good", text: `${what} ${deploy.kind === "bulletin" ? "is" : "are"} live.` }
        : deploy?.state === "failed"
          ? { tone: "bad", text: "Saved, but the live site didn’t rebuild. Let Eli know." }
          : missing.length
            ? { tone: "bad", text: `${plural(missing.length, "unpublished change")} on this page can’t be placed any more — Discard and make ${missing.length === 1 ? "it" : "them"} again.` }
            : null);

  /* ── Signed out: the sign-in box ── */

  if (email === null) {
    return sent ? (
      <Dialog title="Check your email">
        <p className="mt-4 text-[16px] leading-relaxed text-body">
          We sent a sign-in link to <span className="font-semibold text-ink">{sent}</span>. It works for 20 minutes.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Not in your inbox after a minute? Look in Spam and mark it “Not spam” so the next one comes straight through.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button type="button" onClick={() => setSent(null)} className="text-[15px] text-wine underline underline-offset-4">
            Use a different email
          </button>
          <button type="button" onClick={onClose} className="text-[15px] text-muted underline underline-offset-4">
            Close
          </button>
        </div>
      </Dialog>
    ) : (
      <Dialog title="Edit the website">
        <form onSubmit={requestLink}>
          <p className="mt-3 text-[16px] leading-relaxed text-body">Enter your email and we’ll send you a link to sign in.</p>
          <label htmlFor="edit-email" className="eyebrow mt-7 block">
            Email
          </label>
          <input
            id="edit-email"
            type="email"
            required
            autoFocus
            autoComplete="email"
            placeholder="you@example.com"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            className={`${field} mt-2`}
          />
          <button type="submit" disabled={busy} className={`${solid} mt-4 w-full py-3.5`}>
            {busy ? "Sending…" : "Email me a sign-in link"}
          </button>
          <button type="button" onClick={onClose} className="mt-5 text-[14px] text-muted underline underline-offset-4">
            Close
          </button>
        </form>
        {note && <p className={`mt-5 text-[15px] ${note.tone === "bad" ? "text-wine" : "text-body"}`}>{note.text}</p>}
      </Dialog>
    );
  }

  /* ── Signed in: the bar and its dialogs ── */

  const lastPosted = BULLETINS_NEWEST_FIRST[0];

  return (
    <>
      <div
        role="region"
        aria-label="Website editor"
        className="fixed inset-x-0 bottom-0 z-[90] bg-ink/95 text-[15px] text-white/85 shadow-[0_-12px_40px_rgba(23,19,26,0.35)] backdrop-blur"
      >
        <div className="h-[3px] bg-wine" aria-hidden="true" />
        <div className="mx-auto flex min-h-[76px] max-w-7xl flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3 sm:px-6">
          {email === undefined ? (
            <p>Loading the editor…</p>
          ) : (
            <>
              <div className="min-w-0 flex-1 basis-[260px]">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white">
                  {preview ? "Preview" : "Editing"}
                  {edits.length > 0 && <span className="ml-3 text-[#f0b429]">{plural(edits.length, "unpublished change")}</span>}
                </p>
                <p className="mt-0.5 truncate text-[14px] text-white/60">
                  {preview
                    ? "This is how the page reads. Links work; nothing is editable until you go back."
                    : scanning
                      ? "Finding the text you can change…"
                      : "Point at any text — it lights up gold — and click to change it."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" onClick={() => setConfirm({ kind: "bulletin" })} className={`${onDark} !px-4`}>
                  Post a bulletin
                </button>
                <button type="button" onClick={() => setPreview((p) => !p)} className={`${onDark} !px-4`}>
                  {preview ? "Back to editing" : "Preview"}
                </button>
                {edits.length > 0 && (
                  <>
                    <button type="button" onClick={discardAll} disabled={busy} className={`${onDark} !px-4`}>
                      Discard
                    </button>
                    <button type="button" onClick={() => setConfirm({ kind: "publish" })} disabled={busy} className={`${solid} !px-5`}>
                      Publish
                    </button>
                  </>
                )}
                <button type="button" onClick={() => setConfirm({ kind: "exit" })} className={`${onDark} !px-4`}>
                  Exit
                </button>
              </div>
            </>
          )}
          {status && (
            <p
              aria-live="polite"
              className={`basis-full text-[14px] ${status.tone === "bad" ? "text-[#f0b429]" : status.tone === "good" ? "text-white" : "text-white/75"}`}
            >
              {status.text}
              {deploy?.state === "live" && !note && (
                <>
                  {" "}
                  <a
                    href={`${deploy.link ?? location.pathname}?fresh=${deploy.commit.slice(0, 7)}`}
                    target="_blank"
                    rel="noopener"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    See it
                  </a>
                </>
              )}
            </p>
          )}
        </div>
      </div>

      {open && (
        <Dialog title="Change this text">
          <p className="mt-2 text-[13.5px] text-muted">Saved in: {open.where}</p>
          <textarea
            autoFocus
            value={open.value}
            onChange={(e) => setOpen({ ...open, value: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                saveText();
              }
            }}
            rows={Math.min(10, Math.max(2, Math.ceil(open.value.length / 48)))}
            className={`${field} mt-5 resize-y leading-relaxed`}
          />
          {open.text !== tidy(open.value) && (
            <p className="mt-3 text-[13.5px] text-muted">
              Was: <span className="line-through">{clip(open.text, 160)}</span>
            </p>
          )}
          {note?.tone === "bad" && <p className="mt-3 text-[14.5px] text-wine">{note.text}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button type="button" onClick={saveText} className={solid}>
              Done
            </button>
            <button type="button" onClick={() => setOpen(null)} className={outline}>
              Cancel
            </button>
            {edits.some((e) => e.path === location.pathname && e.text === open.text && e.context.join() === open.context.join()) && (
              <button type="button" onClick={undoText} className="ml-auto text-[14px] text-muted underline underline-offset-4">
                Put back the original
              </button>
            )}
          </div>
          <p className="mt-5 text-[13px] text-faint">Nothing goes live until you press Publish in the bar.</p>
        </Dialog>
      )}

      {confirm?.kind === "publish" && (
        <Dialog title={`Publish ${plural(edits.length, "change")}?`} wide>
          {confirm.problems && (
            <p className="mt-4 rounded-sm border border-wine/30 bg-wine-pale p-4 text-[15px] leading-relaxed text-ink">
              Nothing was published. The changes marked below can’t be saved any more — remove them with ✕, then publish the rest.
            </p>
          )}
          <ul className="mt-5 max-h-[40vh] space-y-4 overflow-y-auto pr-1">
            {edits.map((e) => {
              const problem = confirm.problems?.[keyOf(e.path, e.text, e.context)];
              return (
                <li key={keyOf(e.path, e.text, e.context)} className="flex gap-3 border-l-2 border-wine pl-4 text-[15px] leading-snug">
                  <div className="min-w-0 flex-1">
                    <p className="text-muted line-through decoration-faint">{clip(e.text)}</p>
                    <p className="mt-1 text-ink">{clip(e.to)}</p>
                    <p className="mt-1 text-[12.5px] text-faint">
                      {e.where} · {pagePath(e.path)}
                    </p>
                    {problem && <p className="mt-1 text-[13.5px] font-semibold text-wine">{problem}</p>}
                  </div>
                  <button
                    type="button"
                    aria-label="Remove this change"
                    onClick={() => {
                      const next = edits.filter((x) => x !== e);
                      writeEdits(next);
                      requestAnimationFrame(paint);
                      if (!next.length) setConfirm(null);
                    }}
                    className="h-8 w-8 shrink-0 rounded-sm text-muted hover:bg-ivory-dark hover:text-ink"
                  >
                    ✕
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 rounded-sm border border-[#d99a00]/45 bg-[#d99a00]/10 p-4 text-[15px] leading-relaxed text-ink">
            <span className="font-semibold">Give it about 2 minutes.</span> The live site rebuilds after you publish. Until it finishes, the
            website — for visitors and for you — still shows the old wording. The bar counts down and tells you when it’s live.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button type="button" onClick={publish} disabled={busy || !edits.length} className={solid}>
              {busy ? "Publishing…" : "Publish"}
            </button>
            <button type="button" onClick={() => setConfirm(null)} disabled={busy} className={outline}>
              Cancel
            </button>
          </div>
        </Dialog>
      )}

      {confirm?.kind === "bulletin" && (
        <Dialog title="Post a bulletin" wide>
          <p className="mt-3 text-[15.5px] leading-relaxed text-body">
            Add a photo of each page, or the PDF. They go up in the order shown — front page first.
            {lastPosted && <span className="text-muted"> Last posted: {formatBulletinDate(lastPosted.date)}.</span>}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-[200px_1fr]">
            <label className="block">
              <span className="eyebrow">Sunday</span>
              <input type="date" value={bDate} onChange={(e) => setBDate(e.target.value)} className={`${field} mt-2`} />
            </label>
            <label className="block">
              <span className="eyebrow">Note (optional)</span>
              <input
                type="text"
                value={bNote}
                maxLength={120}
                placeholder="e.g. Homecoming Sunday"
                onChange={(e) => setBNote(e.target.value)}
                className={`${field} mt-2`}
              />
            </label>
          </div>

          {bPages.length > 0 && (
            <ol className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {bPages.map((p, i) => (
                <li key={p.id} className="list-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={`Page ${i + 1}`} className="aspect-[17/22] w-full rounded-sm border border-rule bg-white object-contain" />
                  <div className="mt-2 flex items-center justify-between text-[13px] text-muted">
                    <span className="font-semibold uppercase tracking-[0.12em] text-wine">Page {i + 1}</span>
                    <span className="flex gap-1">
                      <button type="button" aria-label="Move earlier" disabled={i === 0} onClick={() => movePage(i, -1)} className="h-7 w-7 rounded-sm hover:bg-ivory-dark disabled:opacity-30">
                        ←
                      </button>
                      <button
                        type="button"
                        aria-label="Move later"
                        disabled={i === bPages.length - 1}
                        onClick={() => movePage(i, 1)}
                        className="h-7 w-7 rounded-sm hover:bg-ivory-dark disabled:opacity-30"
                      >
                        →
                      </button>
                      <button type="button" aria-label="Remove page" onClick={() => removePage(i)} className="h-7 w-7 rounded-sm hover:bg-ivory-dark">
                        ✕
                      </button>
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          )}

          <label className={`${outline} mt-6 w-full cursor-pointer py-4 ${bWork ? "pointer-events-none opacity-60" : ""}`}>
            {bPages.length ? "Add more pages" : "Choose photos or a PDF"}
            <input
              type="file"
              accept="image/*,application/pdf"
              multiple
              className="sr-only"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </label>

          {bWork && <p className="mt-4 text-[15px] text-body">{bWork}</p>}
          {note?.tone === "bad" && !bWork && <p className="mt-4 text-[15px] text-wine">{note.text}</p>}

          {bReplace !== null ? (
            <div className="mt-6 rounded-sm border border-wine/30 bg-wine-pale p-4">
              <p className="text-[15px] leading-relaxed text-ink">
                There’s already a bulletin for {formatBulletinDate(bDate)}
                {bReplace ? ` (${plural(bReplace, "page")})` : ""}. Replace it with these pages?
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" onClick={() => postBulletin(true)} className={solid}>
                  Replace it
                </button>
                <button type="button" onClick={() => setBReplace(null)} className={outline}>
                  Keep the old one
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-6 rounded-sm border border-[#d99a00]/45 bg-[#d99a00]/10 p-4 text-[14.5px] leading-relaxed text-ink">
                <span className="font-semibold">Give it about 2 minutes</span> after posting before it shows on the Bulletin page.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => postBulletin(false)} disabled={!bPages.length || Boolean(bWork) || !bDate} className={solid}>
                  Post bulletin for {bDate ? formatBulletinDate(bDate).replace(/, \d{4}$/, "") : "…"}
                </button>
                <button type="button" onClick={() => setConfirm(null)} disabled={Boolean(bWork)} className={outline}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </Dialog>
      )}

      {confirm?.kind === "exit" && (
        <Dialog title="Exit the editor?">
          {edits.length > 0 && (
            <p className="mt-4 text-[16px] leading-relaxed text-ink">
              You have {plural(edits.length, "unpublished change")}. Exiting throws {edits.length === 1 ? "it" : "them"} away.
            </p>
          )}
          {bPages.length > 0 && (
            <p className="mt-4 text-[16px] leading-relaxed text-ink">The bulletin pages you added haven’t been posted and will be thrown away.</p>
          )}
          {deploy?.state === "pending" && (
            <p className="mt-4 text-[16px] leading-relaxed text-ink">
              Your last publish is still going live{left ? ` — about ${clock(left)} left` : ""}. If you exit now, the site may show the old version until
              then; refresh after that.
            </p>
          )}
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Exiting clears the editor from this browser and reloads the page fresh, the way visitors see it. You stay signed in, so /edit brings you
            straight back.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => exit(false)} className={solid}>
              Exit and clear
            </button>
            <button type="button" onClick={() => setConfirm(null)} className={outline}>
              Keep editing
            </button>
          </div>
          <button type="button" onClick={() => exit(true)} className="mt-5 text-[14px] text-muted underline underline-offset-4">
            Exit and sign out
          </button>
        </Dialog>
      )}
    </>
  );
}
