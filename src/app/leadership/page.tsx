import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, PageHero, Section } from "@/components/ui";
import { LEADERS, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Pastor & Leaders",
  description:
    "Meet Pastor Thomas Fittis and the leadership team of Calvary Baptist Church in McMinnville, Tennessee.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Pastor & Leaders"
        lead="Calvary Baptist is grateful to God for our dedicated leadership team, that with many others in our congregation, serve the Lord, and the people of our church and community."
      />

      <Section tone="paper">
        <div className="space-y-20 lg:space-y-28">
          {LEADERS.map((leader, i) => (
            <Reveal key={leader.name}>
              <article
                className={`grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16 ${
                  i % 2 === 1 ? "lg:grid-cols-[1fr_300px]" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  {leader.photo ? (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-rule bg-ivory">
                      <Image
                        src={leader.photo}
                        alt={leader.name}
                        fill
                        sizes="(min-width: 1024px) 300px, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center rounded-sm border border-rule bg-wine-pale">
                      <Image
                        src="/mark.png"
                        alt=""
                        width={170}
                        height={232}
                        aria-hidden="true"
                        className="h-24 w-auto opacity-45"
                      />
                    </div>
                  )}
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-wine">
                    {leader.role}
                  </p>
                  <h2 className="mt-3 font-serif text-[clamp(1.5rem,3vw,2rem)] leading-tight text-ink">
                    {leader.name}
                  </h2>
                  <div className="rule-wine mt-5" />
                  <div className="prose-cbc mt-6">
                    {leader.bio.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="pale">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-[clamp(1.6rem,3.4vw,2.3rem)] leading-tight text-ink">
              Have a question for the pastor?
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-body">
              Bro. Tom would be glad to hear from you — before or after a
              service, over the phone, or through the form on our contact page.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/contact">Send a Message</Button>
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
