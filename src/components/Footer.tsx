import Image from "next/image";
import Link from "next/link";
import { SERVICES, SITE } from "@/config/site";

const ABOUT_LINKS = [
  { label: "Pastor & Leaders", href: "/leadership" },
  { label: "What We Believe", href: "/what-we-believe" },
  { label: "Our History", href: "/history" },
  { label: "Our Vision", href: "/vision" },
  { label: "New Building Project", href: "/new-building" },
  { label: "How to Join", href: "/join" },
];

const MORE_LINKS = [
  { label: "Ministries", href: "/ministries" },
  { label: "Missions", href: "/missions" },
  { label: "School of the Bible", href: "/school-of-the-bible" },
  { label: "Special Projects", href: "/special-projects" },
  { label: "Free Resources", href: "/resources" },
  { label: "Weekly Bulletin", href: "/bulletin" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-wine-dark text-wine-pale">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Identity */}
          <div>
            <div className="inline-flex rounded bg-ivory px-4 py-3">
              <Image
                src="/logo.png"
                alt={SITE.name}
                width={655}
                height={247}
                className="h-14 w-auto"
              />
            </div>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-wine-pale/80">
              A friendly, traditional, Independent Baptist church in
              McMinnville, Tennessee — preaching Christ crucified, risen, and
              coming again since {SITE.founded}.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Calvary Broadcast on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-wine-pale/25 transition-colors hover:border-wine-pale hover:bg-wine-pale/10"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
                </svg>
              </a>
              <a
                href={SITE.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sermons on YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-wine-pale/25 transition-colors hover:border-wine-pale hover:bg-wine-pale/10"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M23 12s0-3.7-.47-5.48a2.78 2.78 0 0 0-1.96-1.96C18.8 4.09 12 4.09 12 4.09s-6.8 0-8.57.47a2.78 2.78 0 0 0-1.96 1.96C1 8.3 1 12 1 12s0 3.7.47 5.48a2.78 2.78 0 0 0 1.96 1.96c1.77.47 8.57.47 8.57.47s6.8 0 8.57-.47a2.78 2.78 0 0 0 1.96-1.96C23 15.7 23 12 23 12ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* About */}
          <nav aria-label="About">
            <h3 className="font-serif text-[17px] text-white">About Us</h3>
            <ul className="mt-5 space-y-2.5 text-[14.5px]">
              {ABOUT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-wine-pale/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* More */}
          <nav aria-label="Ministries and resources">
            <h3 className="font-serif text-[17px] text-white">
              Ministries & Resources
            </h3>
            <ul className="mt-5 space-y-2.5 text-[14.5px]">
              {MORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-wine-pale/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div>
            <h3 className="font-serif text-[17px] text-white">Visit Us</h3>
            <address className="mt-5 not-italic text-[14.5px] leading-relaxed text-wine-pale/75">
              {SITE.address.street}
              <br />
              {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
              <br />
              <a
                href={SITE.phoneHref}
                className="mt-2 inline-block transition-colors hover:text-white"
              >
                {SITE.phone}
              </a>
            </address>

            <dl className="mt-6 space-y-1.5 text-[13.5px]">
              {SERVICES.slice(0, 4).map((s) => (
                <div key={s.name} className="flex justify-between gap-4">
                  <dt className="text-wine-pale/70">{s.name}</dt>
                  <dd className="shrink-0 font-medium text-white">{s.time}</dd>
                </div>
              ))}
            </dl>

            <Link
              href="/contact"
              className="mt-6 inline-block border-b border-wine-pale/40 pb-0.5 text-[14.5px] font-medium text-white transition-colors hover:border-white"
            >
              Send us a message
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-wine-pale/15 pt-7 text-[13px] text-wine-pale/55 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}, {SITE.city}, Tennessee.
          </p>
          <p className="italic">
            “We Preach Christ Crucified, Risen, and Coming Again”
          </p>
        </div>
      </div>
    </footer>
  );
}
