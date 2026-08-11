import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Button, Figure, Heading, PageHero, Section } from "@/components/ui";
import { MINISTRY_DETAILS, getMinistry } from "@/content/ministries";
import { MINISTRIES, SITE } from "@/config/site";

export function generateStaticParams() {
  return MINISTRY_DETAILS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ministry = getMinistry(slug);
  if (!ministry) return {};

  return {
    title: ministry.title,
    description: `${ministry.lead} ${ministry.title} at Calvary Baptist Church, McMinnville, Tennessee.`,
    alternates: { canonical: `/ministries/${slug}` },
  };
}

export default async function MinistryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ministry = getMinistry(slug);
  if (!ministry) notFound();

  const others = MINISTRIES.filter((m) => m.href !== `/ministries/${slug}`);

  return (
    <>
      <PageHero
        eyebrow={ministry.eyebrow}
        title={ministry.title}
        lead={ministry.lead}
      />

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <div className="prose-cbc">
              {ministry.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            {ministry.led && (
              <p className="mt-9 border-l-2 border-wine/30 pl-5 text-[15px] leading-relaxed text-muted">
                <span className="block text-[12px] font-semibold uppercase tracking-[0.15em] text-wine">
                  Led by
                </span>
                <span className="mt-1 block text-ink">{ministry.led}</span>
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/visit">Plan Your Visit</Button>
              <Button href="/contact" variant="outline">
                Ask a Question
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Figure
              src={ministry.photo.src}
              alt={ministry.photo.alt}
              caption={ministry.photo.caption}
              ratio="aspect-[4/3]"
            />

            <div className="mt-8 rounded-sm border border-rule bg-ivory p-7">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-wine">
                When we meet
              </h2>
              <dl className="mt-5 divide-y divide-rule">
                {ministry.meetings.map((m) => (
                  <div key={m.name} className="py-3.5 first:pt-0 last:pb-0">
                    <dt className="font-serif text-[17px] leading-snug text-ink">
                      {m.name}
                    </dt>
                    <dd className="mt-1 text-[14px] text-body">
                      {m.when}
                      {m.who && (
                        <span className="text-muted"> · {m.who}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 border-t border-rule pt-5 text-[14px] leading-relaxed text-muted">
                Questions? Call the church at{" "}
                <a
                  href={SITE.phoneHref}
                  className="font-medium text-wine hover:underline"
                >
                  {SITE.phone}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Other ministries */}
      <Section tone="ivory">
        <Reveal>
          <Heading eyebrow="Also at Calvary" title="Other ministries" />
        </Reveal>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((m, i) => (
            <Reveal key={m.href} delay={i * 50}>
              <li className="list-none">
                <Link
                  href={m.href}
                  className="flex h-full flex-col rounded-sm border border-rule bg-paper p-6 transition-colors hover:border-wine/40"
                >
                  <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-wine">
                    {m.meta}
                  </span>
                  <span className="mt-2 font-serif text-[19px] leading-snug text-ink">
                    {m.title}
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
