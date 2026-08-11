import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, PageHero, Scripture, Section } from "@/components/ui";
import { ARTICLES } from "@/content/articles-of-faith";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "What We Believe",
  description:
    "The Articles of Faith of Calvary Baptist Church, McMinnville, Tennessee — twenty-nine articles on the Scriptures, salvation, the church, and the second coming of Christ.",
  alternates: { canonical: "/what-we-believe" },
};

export default function WhatWeBelievePage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Articles of Faith"
        lead="What Calvary Baptist Church believes and teaches, stated in twenty-nine articles. The Bible is our sole authority for faith and practice."
      />

      {/* A short plain-English summary before the full document */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <h2 className="font-serif text-[26px] leading-snug text-ink">
                The short version
              </h2>
              <div className="rule-wine mt-5" />
              <p className="mt-6 text-[16px] leading-relaxed text-body">
                We are an Independent Baptist church. We preach from the King
                James Bible, we baptize believers by immersion, we govern
                ourselves as a local congregation, and we hold that salvation is
                the free gift of God through faith in Jesus Christ alone — not
                through church membership, baptism, or good works.
              </p>
              <div className="mt-8 border-l-2 border-wine/30 pl-6">
                <Scripture reference="Acts 16:31">
                  Believe on the Lord Jesus Christ, and thou shalt be saved.
                </Scripture>
              </div>
              <div className="mt-9">
                <Button href="/join" variant="outline">
                  How to Join Our Church
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-wine">
              Articles of Faith of {SITE.name}
            </p>
            <p className="mt-1.5 text-[14px] italic text-muted">
              {SITE.city}, Tennessee
            </p>

            <div className="mt-10 space-y-11">
              {ARTICLES.map((a) => (
                <article
                  key={a.n}
                  id={`article-${a.n}`}
                  className="scroll-mt-32 border-t border-rule pt-8 first:border-t-0 first:pt-0"
                >
                  <h3 className="flex gap-4 font-serif text-[21px] leading-snug text-ink">
                    <span className="shrink-0 text-[15px] font-semibold text-wine/70">
                      {String(a.n).padStart(2, "0")}
                    </span>
                    {a.title}
                  </h3>
                  <div className="prose-cbc mt-4 pl-0 sm:pl-[2.6rem]">
                    {a.body.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                    {a.refs && <p className="refs mt-3">{a.refs}</p>}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
