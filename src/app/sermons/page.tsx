import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SermonPlayer from "@/components/SermonPlayer";
import { Button, Heading, PageHero, Section } from "@/components/ui";
import { getMessages } from "@/lib/messages";
import { BROADCASTS, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Sermons — Watch & Listen",
  description:
    "Watch sermons from Calvary Baptist Church, McMinnville, right here — expository preaching from the King James Bible, plus our radio and BLTV broadcast times.",
  alternates: { canonical: "/sermons" },
};

/** The feed is re-read on the half hour, so new uploads appear on their own. */
export const revalidate = 1800;

export default async function SermonsPage() {
  const messages = await getMessages(12);

  return (
    <>
      <PageHero
        eyebrow="Watch & Listen"
        title="Sermons"
        lead="Pastor Fittis preaches expositionally through the Scriptures in every service. Recent messages play right here, straight from our YouTube channel."
      />

      <Section tone="paper">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <SermonPlayer
              messages={[...messages]}
              uploadsPlaylist={SITE.youtubeUploadsPlaylist}
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <Button href={SITE.youtubeUrl} external variant="outline">
              Our YouTube Channel
            </Button>
            <Button href={SITE.facebookUrl} external variant="outline">
              Watch Live on Facebook
            </Button>
          </div>
        </Reveal>
      </Section>

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
