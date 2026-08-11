import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, Heading, PageHero, Section } from "@/components/ui";
import { BROADCASTS, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Radio & TV Broadcasts",
  description:
    "The Amazing Grace Broadcast can be heard on King of Kings Radio 90.9 FM, Cookeville, Saturdays at 6:30 pm — plus 92.1 FM on Sunday mornings and BLTV Channel 6.",
  alternates: { canonical: "/radio" },
};

export default function RadioPage() {
  return (
    <>
      <PageHero
        eyebrow="On the air"
        title="Radio & Television Broadcasts"
        lead="Preaching from Calvary goes out over the air each week — for shut-ins, for shift workers, and for anyone in the Upper Cumberland who would rather listen at home first."
      />

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <Heading
              eyebrow="Our own programme"
              title="The Amazing Grace Broadcast"
              lead="The Amazing Grace Broadcast can be heard on King of Kings Radio, 90.9 FM out of Cookeville, Tennessee, on Saturday evenings at 6:30."
            />
            <div className="prose-cbc mt-7">
              <p>
                King of Kings Radio is one of the ministries this church
                supports, and the station carries our programme each week. If
                you are outside the 90.9 signal, the Sunday morning broadcast on
                92.1 FM covers much of Warren County, and the services also air
                on BLTV Channel 6.
              </p>
              <p>
                Every service is streamed live on Facebook at Calvary Broadcast,
                and recent messages are posted to our YouTube channel — so if you
                miss a broadcast, nothing is lost.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/sermons">Watch Recent Sermons</Button>
              <Button href={SITE.facebookUrl} external variant="outline">
                Facebook Live
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-sm border border-rule bg-ivory p-8">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-wine">
                The weekly schedule
              </h2>
              <dl className="mt-6 divide-y divide-rule">
                {BROADCASTS.map((b) => (
                  <div key={b.station} className="py-5 first:pt-0 last:pb-0">
                    <dt className="font-serif text-[19px] leading-snug text-ink">
                      {b.station}
                    </dt>
                    <dd className="mt-1.5 text-[15px] text-body">
                      {b.when}
                      <span className="mt-0.5 block text-[13.5px] text-muted">
                        {b.programme} · {b.place}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-7 border-t border-rule pt-5 text-[14px] leading-relaxed text-muted">
                Times occasionally shift with the stations’ schedules — the
                current times are always printed in the{" "}
                <a
                  href="/bulletin"
                  className="font-medium text-wine hover:underline"
                >
                  weekly bulletin
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="pale">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-[clamp(1.6rem,3.4vw,2.3rem)] leading-tight text-ink">
              Heard the broadcast and want to visit?
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-body">
              We would be glad to meet you. Sunday School at 10:00, morning
              worship at 11:00, at {SITE.address.full}.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/visit">Plan Your Visit</Button>
              <Button href={SITE.phoneHref} variant="outline">
                Call {SITE.phone}
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
