import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Button, Figure, Heading, PageHero, Section } from "@/components/ui";
import { MINISTRIES, NURSERY_NOTE, SERVICES } from "@/config/site";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Ministries at Calvary Baptist Church, McMinnville — children, youth, ladies, seniors, music, outreach, the School of the Bible, and worldwide missions.",
  alternates: { canonical: "/ministries" },
};

export default function MinistriesPage() {
  return (
    <>
      <PageHero
        eyebrow="For Every Age"
        title="Ministries at Calvary"
        lead="From the nursery to the senior fellowship, there is a place for your whole family — and a place to serve when you are ready."
      />

      <Section tone="paper">
        <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {MINISTRIES.map((m, i) => (
            <Reveal key={m.href} delay={i * 60}>
              <li className="list-none">
                <Link
                  href={m.href}
                  className="group flex h-full flex-col rounded-sm border border-rule bg-ivory p-8 transition-all duration-300 hover:border-wine/35 hover:shadow-[0_14px_38px_-18px_rgba(23,19,26,0.2)]"
                >
                  <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-wine">
                    {m.meta}
                  </span>
                  <span className="mt-3 font-serif text-[23px] leading-snug text-ink">
                    {m.title}
                  </span>
                  <span className="mt-3 flex-1 text-[15px] leading-relaxed text-body">
                    {m.blurb}
                  </span>
                  <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-wine">
                    Learn more
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Beyond the weekly ministries */}
      <Section tone="ivory">
        <Reveal>
          <Heading
            eyebrow="Also at Calvary"
            title="Teaching, missions, and projects"
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {[
            {
              title: "McMinnville School of the Bible",
              href: "/school-of-the-bible",
              blurb:
                "Thursday evenings at 7:00 — Bible teaching classes open to everyone, at no cost.",
              photo: "/img/school-of-the-bible-1.jpg",
              alt: "Poster for the McMinnville School of the Bible, a ministry of Calvary Baptist Church",
            },
            {
              title: "Worldwide Missions",
              href: "/missions",
              blurb:
                "Fifty-nine missionaries and ministries in four fields, each with team leaders here at Calvary.",
              photo: "/img/property-pavilion.jpg",
              alt: "The pavilion and workshop on the church property at 610 Myers Lane",
            },
            {
              title: "Special Outreach Projects",
              href: "/special-projects",
              blurb:
                "Disaster relief in North Carolina, a church building in Mongolia, an orphanage in Panama.",
              photo: "/img/fellowship-outdoors.jpg",
              alt: "Church families gathered on the field at 610 Myers Lane",
            },
          ].map((c, i) => (
            <Reveal key={c.href} delay={i * 70}>
              <Link href={c.href} className="group block">
                <Figure src={c.photo} alt={c.alt} ratio="aspect-[4/3]" />
                <h3 className="mt-5 font-serif text-[21px] leading-snug text-ink transition-colors group-hover:text-wine">
                  {c.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">
                  {c.blurb}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Weekly schedule recap */}
      <Section tone="wine">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <Heading
              eyebrow="One page"
              title="Everything, in one week"
              onDark
              lead="If you are trying to work out which night is which, here is the whole week at Calvary."
            />
            <p className="mt-6 text-[15px] leading-relaxed text-wine-pale/75">
              {NURSERY_NOTE}
            </p>
            <div className="mt-9">
              <Button href="/visit" variant="light">
                Plan Your Visit
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <dl className="divide-y divide-wine-pale/20 border-y border-wine-pale/20">
              {SERVICES.map((s) => (
                <div
                  key={s.name}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <div>
                    <dt className="font-serif text-[18px] text-white">
                      {s.name}
                    </dt>
                    <p className="mt-0.5 text-[13px] text-wine-pale/65">
                      {s.day} · {s.note}
                    </p>
                  </div>
                  <dd className="shrink-0 font-serif text-[20px] text-wine-pale">
                    {s.time}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
