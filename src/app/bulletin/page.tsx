import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, Heading, PageHero, Section } from "@/components/ui";
import { BROADCASTS, SERVICES, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "The Weekly Bulletin",
  description:
    "This week's bulletin from Calvary Baptist Church, McMinnville — the pastor's letter, service order, announcements, prayer list, and broadcast times.",
  alternates: { canonical: "/bulletin" },
};

const PAGES = [
  {
    src: "/img/bulletin-1.jpg",
    alt: "Page one of the Calvary Baptist Church weekly bulletin — the pastor's letter to the church family, service information, and broadcast times",
    label: "Page one",
    note: "The pastor's letter, service times, and broadcast schedule.",
  },
  {
    src: "/img/bulletin-2.jpg",
    alt: "Page two of the Calvary Baptist Church weekly bulletin — announcements, the prayer list, and the week ahead",
    label: "Page two",
    note: "Announcements, the prayer list, and the week ahead.",
  },
];

export default function BulletinPage() {
  return (
    <>
      <PageHero
        eyebrow="Every week"
        title="The Weekly Bulletin"
        lead="The bulletin handed out at the door each Sunday — the pastor's letter, the week's announcements, the prayer list, and who is serving where."
      />

      <Section tone="paper">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[16.5px] leading-relaxed text-body">
              A new bulletin is printed for each Sunday. Tap either page to open
              it full size, or pick one up at the welcome table when you visit.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-2">
          {PAGES.map((p, i) => (
            <Reveal key={p.src} delay={i * 80}>
              <figure>
                <a
                  href={p.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-sm border border-rule bg-white shadow-[0_10px_36px_-18px_rgba(23,19,26,0.3)]"
                >
                  <div className="relative aspect-[1400/2152]">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 768px) 480px, 100vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                  </div>
                </a>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-wine">
                    {p.label}
                  </span>
                  <span className="text-right text-[13.5px] leading-snug text-muted">
                    {p.note}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The recurring facts from the bulletin masthead */}
      <Section tone="ivory">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Heading eyebrow="From the masthead" title="The week at Calvary" />
            <dl className="mt-8 divide-y divide-rule border-y border-rule">
              {SERVICES.map((s) => (
                <div
                  key={s.name}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <dt className="font-serif text-[18px] text-ink">{s.name}</dt>
                  <dd className="shrink-0 text-[15px] text-body">
                    <span className="text-muted">{s.day} · </span>
                    <span className="font-medium text-wine">{s.time}</span>
                  </dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="font-serif text-[18px] text-ink">
                  Men’s Prayer Meeting
                </dt>
                <dd className="shrink-0 text-[15px] text-body">
                  <span className="text-muted">Thursday · </span>
                  <span className="font-medium text-wine">8:00 am</span>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <Heading eyebrow="Weekly broadcasts" title="On the air" />
            <dl className="mt-8 divide-y divide-rule border-y border-rule">
              {BROADCASTS.map((b) => (
                <div key={b.station} className="py-4">
                  <dt className="font-serif text-[18px] text-ink">
                    {b.station}
                  </dt>
                  <dd className="mt-1 text-[14.5px] text-body">{b.when}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/radio" variant="outline">
                More About Broadcasts
              </Button>
              <Button href={SITE.phoneHref} variant="outline">
                Call the Church
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
