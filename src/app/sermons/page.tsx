import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, Heading, PageHero, Section } from "@/components/ui";
import { getMessages } from "@/lib/messages";
import { BROADCASTS, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Sermons — Watch & Listen",
  description:
    "Watch recent sermons from Calvary Baptist Church, McMinnville, on YouTube and Facebook Live, or listen on the radio and BLTV Channel 6.",
  alternates: { canonical: "/sermons" },
};

/** The YouTube feed is re-read on the half hour, so new uploads appear on their own. */
export const revalidate = 1800;

export default async function SermonsPage() {
  const messages = await getMessages(12);
  const [latest, ...rest] = messages;

  return (
    <>
      <PageHero
        eyebrow="Watch & Listen"
        title="Sermons"
        lead="Pastor Fittis preaches expositionally through the Scriptures in every service. Recent messages are posted to our YouTube channel, and every service is streamed live on Facebook."
      />

      {/* Latest message */}
      {latest ? (
        <Section tone="paper">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <Reveal>
              <a
                href={latest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-video overflow-hidden rounded-sm bg-ink">
                  <Image
                    src={latest.thumbnail}
                    alt={latest.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 760px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-wine/90 transition-colors group-hover:bg-wine">
                      <svg
                        viewBox="0 0 24 24"
                        className="ml-1 h-6 w-6 fill-white"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
                <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.15em] text-wine">
                  Most recent · {latest.published}
                </p>
                <h2 className="mt-2 font-serif text-[clamp(1.4rem,3vw,2rem)] leading-snug text-ink transition-colors group-hover:text-wine">
                  {latest.title}
                </h2>
              </a>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-sm border border-rule bg-ivory p-8">
                <h2 className="font-serif text-[22px] leading-snug text-ink">
                  Watch live on Sunday
                </h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-body">
                  Every service is streamed on Facebook Live at{" "}
                  <span className="font-medium text-ink">Calvary Broadcast</span>
                  . If you cannot be in the building, you can still be in the
                  service.
                </p>
                <div className="mt-7 flex flex-col gap-3">
                  <Button href={SITE.facebookUrl} external>
                    Watch on Facebook Live
                  </Button>
                  <Button href={SITE.youtubeUrl} external variant="outline">
                    Our YouTube Channel
                  </Button>
                </div>
                <dl className="mt-8 space-y-2 border-t border-rule pt-6 text-[14px]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Sunday morning</dt>
                    <dd className="font-medium text-ink">11:00 am</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Sunday evening</dt>
                    <dd className="font-medium text-ink">6:00 pm</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Wednesday evening</dt>
                    <dd className="font-medium text-ink">6:45 pm</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </Section>
      ) : (
        <Section tone="paper">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Heading
                title="Watch our services"
                lead="Our recent messages are on YouTube, and every service is streamed live on Facebook at Calvary Broadcast."
                align="center"
              />
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Button href={SITE.youtubeUrl} external>
                  Watch on YouTube
                </Button>
                <Button href={SITE.facebookUrl} external variant="outline">
                  Facebook Live
                </Button>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      {/* Recent messages */}
      {rest.length > 0 && (
        <Section tone="ivory">
          <Reveal>
            <Heading eyebrow="From the pulpit" title="Recent messages" />
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((m, i) => (
              <Reveal key={m.id} delay={(i % 3) * 60}>
                <li className="list-none">
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-sm bg-ink">
                      <Image
                        src={m.thumbnail}
                        alt={m.title}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.13em] text-wine">
                      {m.published}
                    </p>
                    <h3 className="mt-1.5 font-serif text-[18.5px] leading-snug text-ink transition-colors group-hover:text-wine">
                      {m.title}
                    </h3>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <div className="mt-14 text-center">
              <Button href={SITE.youtubeUrl} external variant="outline">
                See Every Message on YouTube
              </Button>
            </div>
          </Reveal>
        </Section>
      )}

      {/* Broadcasts */}
      <Section tone="wine">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <Heading
              eyebrow="On the air"
              title="Radio and television"
              onDark
              lead="For those who would rather listen at home, our services and the Amazing Grace Broadcast go out over local radio and television each week."
            />
            <div className="mt-9">
              <Button href="/radio" variant="light">
                More About Our Broadcasts
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <dl className="divide-y divide-wine-pale/20 border-y border-wine-pale/20">
              {BROADCASTS.map((b) => (
                <div key={b.station} className="py-5">
                  <dt className="font-serif text-[19px] text-white">
                    {b.station}
                  </dt>
                  <dd className="mt-1.5 text-[14.5px] text-wine-pale/80">
                    {b.programme} · {b.when}
                    <span className="block text-[13px] text-wine-pale/55">
                      {b.place}
                    </span>
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
