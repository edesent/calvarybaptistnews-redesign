import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import BulletinPages from "@/components/BulletinPages";
import Reveal from "@/components/Reveal";
import { Button, Heading, PageHero, Section } from "@/components/ui";
import { BROADCASTS, SERVICES, SITE } from "@/config/site";
import {
  bulletinYear,
  formatBulletinDate,
  formatBulletinDateShort,
  LATEST_BULLETIN,
  PAST_BULLETINS,
} from "@/content/bulletins";

export const metadata: Metadata = {
  title: "The Weekly Bulletin",
  description:
    "This week's bulletin from Calvary Baptist Church, McMinnville — the pastor's letter, service order, announcements, prayer list, and broadcast times — plus a library of every past week.",
  alternates: { canonical: "/bulletin" },
};

/** The years represented in the library, newest first. */
const LIBRARY_YEARS = Array.from(
  new Set(PAST_BULLETINS.map((b) => bulletinYear(b.date)))
);

export default function BulletinPage() {
  return (
    <>
      <PageHero
        eyebrow="Every week"
        title="The Weekly Bulletin"
        lead="The bulletin handed out at the door each Sunday — the pastor's letter, the week's announcements, the prayer list, and who is serving where. A new one is posted here every week, and nothing is ever thrown away."
      />

      {/* ── This week ───────────────────────────────────────────────────── */}
      <Section tone="paper">
        {LATEST_BULLETIN ? (
          <>
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <p className="eyebrow">This week</p>
                <h2 className="mt-4 font-serif text-[clamp(1.7rem,3.6vw,2.4rem)] leading-tight text-ink">
                  {formatBulletinDate(LATEST_BULLETIN.date)}
                </h2>
                {LATEST_BULLETIN.note && (
                  <p className="mt-3 font-serif text-[19px] italic text-wine">
                    {LATEST_BULLETIN.note}
                  </p>
                )}
                <p className="mt-5 text-[16.5px] leading-relaxed text-body">
                  Tap any page to open it full size, or pick one up at the
                  welcome table when you visit.
                </p>
              </div>
            </Reveal>

            <div className="mt-14">
              <BulletinPages bulletin={LATEST_BULLETIN} />
            </div>
          </>
        ) : (
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-sm border border-rule bg-paper p-10 text-center">
              <p className="font-serif text-[22px] leading-snug text-ink">
                This week&rsquo;s bulletin will be posted shortly.
              </p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-body">
                In the meantime, a printed copy is available at the welcome
                table at every service, or call the church office and we will
                gladly read you the week&rsquo;s announcements.
              </p>
              <div className="mt-7">
                <Button href={SITE.phoneHref} variant="outline">
                  Call the Church
                </Button>
              </div>
            </div>
          </Reveal>
        )}
      </Section>

      {/* ── The library ─────────────────────────────────────────────────── */}
      <Section tone="ivory" id="library">
        <Reveal>
          <Heading
            eyebrow="The archive"
            title="Bulletin Library"
            lead="Every bulletin we have posted, kept week by week. Useful for a date you have forgotten, an announcement you meant to write down, or a prayer request you promised to remember."
            align="center"
          />
        </Reveal>

        {PAST_BULLETINS.length === 0 ? (
          <Reveal>
            <p className="mx-auto mt-10 max-w-xl text-center text-[15.5px] leading-relaxed text-muted">
              The library begins with this week. As each new bulletin is
              posted, the one before it is filed here and stays available.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 space-y-16">
            {LIBRARY_YEARS.map((year) => (
              <div key={year}>
                <div className="flex items-center gap-4">
                  <h3 className="font-serif text-[26px] leading-none text-ink">
                    {year}
                  </h3>
                  <span className="h-px flex-1 bg-rule" />
                  <span className="text-[13px] text-muted">
                    {countForYear(year)}
                  </span>
                </div>

                <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                  {PAST_BULLETINS.filter(
                    (b) => bulletinYear(b.date) === year
                  ).map((b, i) => (
                    <Reveal key={b.date} delay={i * 50}>
                      <li className="list-none">
                        <Link href={`/bulletin/${b.date}`} className="group block">
                          <div className="relative aspect-[17/22] overflow-hidden rounded-sm border border-rule bg-white shadow-[0_8px_26px_-16px_rgba(23,19,26,0.28)]">
                            <Image
                              src={b.pages[0]}
                              alt={`Front page of the bulletin for ${formatBulletinDateShort(b.date)}`}
                              fill
                              sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                              className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          </div>
                          <p className="mt-3 font-serif text-[16.5px] leading-snug text-ink transition-colors group-hover:text-wine">
                            {formatBulletinDateShort(b.date)}
                          </p>
                          <p className="mt-1 text-[12.5px] text-muted">
                            {b.pages.length === 1
                              ? "1 page"
                              : `${b.pages.length} pages`}
                            {b.note ? ` · ${b.note}` : ""}
                          </p>
                        </Link>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* The recurring facts from the bulletin masthead */}
      <Section tone="paper">
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

function countForYear(year: string): string {
  const n = PAST_BULLETINS.filter((b) => bulletinYear(b.date) === year).length;
  return n === 1 ? "1 bulletin" : `${n} bulletins`;
}
