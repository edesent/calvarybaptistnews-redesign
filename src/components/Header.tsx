"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/config/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes. Adjusting state during render
  // (rather than in an effect) is React's documented pattern for this and
  // avoids a cascading re-render on every navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setOpenGroup(null);
  }

  // Stop the page behind the drawer from scrolling while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Announcement strip — the two facts a first-time visitor needs */}
      <div className="bg-wine text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-5 py-2 text-center text-[12.5px] sm:flex-row sm:text-[13px]">
          <p className="font-medium tracking-wide">
            Sunday School 10:00 · Morning Worship 12:00 noon · Evening 6:00
          </p>
          <p className="text-wine-pale">
            <span className="hidden sm:inline">{SITE.address.full} · </span>
            <a href={SITE.phoneHref} className="hover:text-white">
              {SITE.phone}
            </a>
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-rule bg-ivory/95 shadow-[0_1px_20px_rgba(23,19,26,0.07)] backdrop-blur"
            : "border-transparent bg-ivory"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center py-3"
            aria-label={`${SITE.name} — home`}
          >
            <Image
              src="/logo.png"
              alt={`${SITE.name}, ${SITE.city}, Tennessee`}
              width={655}
              height={247}
              priority
              className={`w-auto transition-all duration-300 ${
                scrolled ? "h-[52px] sm:h-[60px]" : "h-[58px] sm:h-[82px]"
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded px-3 py-6 text-[15px] font-medium text-ink transition-colors hover:text-wine"
                    aria-expanded={false}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 10 6"
                      className="h-[5px] w-[9px] fill-current opacity-50 transition-transform duration-200 group-hover:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="M0 0h10L5 6z" />
                    </svg>
                  </button>
                  <div className="invisible absolute left-0 top-full w-[268px] translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-md border border-rule bg-paper py-1.5 shadow-[0_16px_44px_-12px_rgba(23,19,26,0.28)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block border-l-2 border-transparent px-4 py-2.5 text-[14.5px] text-body transition-colors hover:border-wine hover:bg-wine-pale hover:text-wine"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded px-3 py-6 text-[15px] font-medium transition-colors hover:text-wine ${
                    pathname === item.href ? "text-wine" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <a
              href={SITE.giveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 rounded-sm bg-wine px-5 py-2.5 text-[14px] font-semibold tracking-wide text-white transition-colors hover:bg-wine-deep"
            >
              Give Online
            </a>
          </nav>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-[1.5px] w-6 bg-current transition-all duration-300 ${
                  open ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-[1.5px] w-6 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-6 bg-current transition-all duration-300 ${
                  open ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer. It must sit ABOVE the sticky header (z-50), or the
          header swallows taps on the drawer's top menu rows. */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/45 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav
          aria-label="Mobile"
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-ivory shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-rule px-5 py-4">
            <Image
              src="/mark.png"
              alt=""
              width={170}
              height={232}
              className="h-9 w-auto"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center text-2xl leading-none text-muted"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <div className="flex-1 px-5 py-2">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-rule/70">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenGroup((g) => (g === item.label ? null : item.label))
                    }
                    className="flex w-full items-center justify-between py-4 text-left font-serif text-[19px] text-ink"
                    aria-expanded={openGroup === item.label}
                  >
                    {item.label}
                    <span
                      className={`text-wine transition-transform duration-200 ${
                        openGroup === item.label ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openGroup === item.label
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-3 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block border-l border-rule-strong py-2.5 pl-4 text-[15px] text-body"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-rule/70 py-4 font-serif text-[19px] text-ink"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="space-y-3 border-t border-rule px-5 py-5">
            <a
              href={SITE.giveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-sm bg-wine py-3.5 text-center text-[15px] font-semibold text-white"
            >
              Give Online
            </a>
            <a
              href={SITE.phoneHref}
              className="block rounded-sm border border-wine py-3.5 text-center text-[15px] font-semibold text-wine"
            >
              Call {SITE.phone}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
