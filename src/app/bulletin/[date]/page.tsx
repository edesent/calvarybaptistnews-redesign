import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BulletinPages from "@/components/BulletinPages";
import Reveal from "@/components/Reveal";
import { Button, PageHero, Section } from "@/components/ui";
import { SITE } from "@/config/site";
import {
  BULLETINS,
  bulletinByDate,
  bulletinNeighbours,
  formatBulletinDate,
  formatBulletinDateShort,
  LATEST_BULLETIN,
} from "@/content/bulletins";

type Params = { params: Promise<{ date: string }> };

/**
 * One page per bulletin, all built ahead of time from the list in
 * src/content/bulletins.ts. Anything not in that list is a 404 rather than a
 * page rendered on demand, so a mistyped address can't invent a bulletin.
 */
export function generateStaticParams() {
  return BULLETINS.map((b) => ({ date: b.date }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { date } = await params;
  const bulletin = bulletinByDate(date);
  if (!bulletin) return { title: "Bulletin Not Found" };

  const when = formatBulletinDate(bulletin.date);
  return {
    title: `Bulletin — ${formatBulletinDateShort(bulletin.date)}`,
    description: `The ${SITE.name} bulletin for ${when} — the pastor's letter, announcements, the prayer list, and the week ahead.`,
    alternates: { canonical: `/bulletin/${bulletin.date}` },
  };
}

export default async function ArchivedBulletinPage({ params }: Params) {
  const { date } = await params;
  const bulletin = bulletinByDate(date);
  if (!bulletin) notFound();

  const { newer, older } = bulletinNeighbours(bulletin.date);
  const isCurrent = LATEST_BULLETIN?.date === bulletin.date;

  return (
    <>
      <PageHero
        eyebrow={isCurrent ? "This week" : "From the library"}
        title={formatBulletinDate(bulletin.date)}
        lead={
          bulletin.note ??
          `The bulletin handed out at ${SITE.name} that Sunday — the pastor's letter, the announcements, the prayer list, and the week ahead.`
        }
      />

      <Section tone="paper">
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-[16.5px] leading-relaxed text-body">
            Tap any page to open it full size.
          </p>
        </Reveal>

        <div className="mt-12">
          <BulletinPages bulletin={bulletin} />
        </div>

        {/* Paging through the weeks, in reading order: older on the left. */}
        <nav
          aria-label="Other bulletins"
          className="mx-auto mt-16 grid max-w-5xl gap-4 border-t border-rule pt-8 sm:grid-cols-2"
        >
          {older ? (
            <Link
              href={`/bulletin/${older.date}`}
              className="group rounded-sm border border-rule bg-paper p-5 transition-colors hover:border-wine/40"
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                <span aria-hidden="true">←</span> The week before
              </span>
              <span className="mt-2 block font-serif text-[19px] text-ink transition-colors group-hover:text-wine">
                {formatBulletinDateShort(older.date)}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}

          {newer && (
            <Link
              href={`/bulletin/${newer.date}`}
              className="group rounded-sm border border-rule bg-paper p-5 text-right transition-colors hover:border-wine/40 sm:col-start-2"
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                The week after <span aria-hidden="true">→</span>
              </span>
              <span className="mt-2 block font-serif text-[19px] text-ink transition-colors group-hover:text-wine">
                {formatBulletinDateShort(newer.date)}
              </span>
            </Link>
          )}
        </nav>

        <Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href="/bulletin">
              {isCurrent ? "The Bulletin Page" : "This Week’s Bulletin"}
            </Button>
            <Button href="/bulletin#library" variant="outline">
              Browse the Library
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
