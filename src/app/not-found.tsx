import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";

const LINKS = [
  { label: "Plan your visit", href: "/visit" },
  { label: "Pastor & leaders", href: "/leadership" },
  { label: "What we believe", href: "/what-we-believe" },
  { label: "Sermons", href: "/sermons" },
  { label: "Ministries", href: "/ministries" },
  { label: "Contact us", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <Image
        src="/mark.png"
        alt=""
        width={170}
        height={232}
        aria-hidden="true"
        className="pointer-events-none absolute right-[-3%] top-1/2 h-[120%] w-auto -translate-y-1/2 opacity-[0.05]"
      />
      <div className="relative mx-auto max-w-3xl px-5 py-28 text-center lg:py-36">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-5 font-serif text-[clamp(2rem,4.6vw,3rem)] leading-tight text-ink">
          We could not find that page
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-body">
          The page may have moved when we rebuilt the website. Here is where
          most people are going.
        </p>

        <ul className="mx-auto mt-10 flex max-w-lg flex-wrap justify-center gap-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-block rounded-sm border border-rule bg-paper px-4 py-2.5 text-[14.5px] text-body transition-colors hover:border-wine/40 hover:text-wine"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Button href="/">Back to the Home Page</Button>
        </div>
      </div>
    </section>
  );
}
