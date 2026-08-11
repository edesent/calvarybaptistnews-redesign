import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, PageHero, Section } from "@/components/ui";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Resources",
  description:
    "Free Bible studies from Calvary Baptist Church, McMinnville — Anchors of Faith, Discipleship 101, a study on the person of Christ, and The Calvary Newsletter.",
  alternates: { canonical: "/resources" },
};

const RESOURCES = [
  {
    kicker: "Why you can believe in biblical Christianity",
    title: "Anchors of Faith",
    body: [
      "“Anchors of Faith” is a Bible study designed to help you see for yourself that Christianity is something you can believe in without committing intellectual suicide. Christians believe because there are good reasons to believe — anchors for our faith that give a foundation “both sure and steadfast”.",
      "These short studies focus on three foundational truths: the Bible, God's book; Jesus, God's Son; and salvation, God's gift. As you examine these anchor truths you will discover that no other religion has a book like the Bible, a saviour like Jesus, or a message like that of salvation, the gift of God.",
    ],
    href: SITE.anchorsPdf,
    cta: "Read Anchors of Faith",
  },
  {
    kicker: "The role of the church in Christian discipleship",
    title: "Discipleship 101",
    body: [
      "Salvation is free — it is the gift of God. But being a disciple, a follower of Christ, will cost you. God motivates our commitment by His love in salvation, so that we want to follow Him, we desire to serve Him.",
      "Discipleship 101 will help any believer see the importance of continuing as a learner, a follower, a disciple of Jesus. God has given many tools to help us on that journey, and the Bible teaches that the primary tool is a loving community known as the church. It was Jesus who invented the church, and in this study you will see from the Bible how the church is designed to help you grow as a disciple of Christ.",
    ],
    href: SITE.discipleshipPdf,
    cta: "Read Discipleship 101",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Free to read"
        title="Resources to Encourage Your Faith"
        lead="Bible studies we use and teach at Calvary, free to read, with nothing to sign up for and nothing to buy."
      />

      <Section tone="paper">
        <div className="space-y-16 lg:space-y-24">
          {RESOURCES.map((r) => (
            <Reveal key={r.title}>
              <article className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-wine">
                    {r.kicker}
                  </p>
                  <h2 className="mt-4 font-serif text-[clamp(1.5rem,3.2vw,2.1rem)] leading-tight text-ink">
                    {r.title}
                  </h2>
                  <div className="rule-wine mt-5" />
                  <div className="mt-7">
                    <Button href={r.href} external>
                      {r.cta}
                    </Button>
                  </div>
                </div>
                <div className="prose-cbc">
                  {r.body.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Newsletter + Bible study */}
      <Section tone="ivory">
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-sm border border-rule bg-paper p-9">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-wine">
                Quarterly good news from Calvary
              </p>
              <h2 className="mt-4 font-serif text-[25px] leading-snug text-ink">
                The Calvary Newsletter
              </h2>
              <p className="mt-4 flex-1 text-[15.5px] leading-relaxed text-body">
                The Calvary Newsletter contains news articles about our church
                and Bible messages that will encourage your faith in Christ and
                your walk with God. It is edited by Robert Ditmore, who also
                leads our media ministry. Ask at the welcome table for the
                current issue, or for the archive of past issues.
              </p>
              <div className="mt-7">
                <Button href="/contact" variant="outline">
                  Request the Newsletter
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col rounded-sm border border-wine/20 bg-wine-pale p-9">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-wine">
                Jesus’ deity and humanity
              </p>
              <h2 className="mt-4 font-serif text-[25px] leading-snug text-ink">
                The Person of Jesus Christ
              </h2>
              <p className="mt-4 flex-1 text-[15.5px] leading-relaxed text-body">
                A study on the person of Christ — His deity and His humanity —
                taught as a mid-week Bible study at our church in the autumn of
                2024. The recordings are posted with our other messages.
              </p>
              <div className="mt-7">
                <Button href="/sermons" variant="outline">
                  Find It in Our Messages
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="wine">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.4rem)] leading-tight text-white">
              Rather sit down and talk it through?
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-wine-pale/85">
              If you have questions about the Bible, about salvation, or about
              anything in these studies, Bro. Tom would be glad to sit down with
              you — no pressure, no obligation.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="light">
                Send a Message
              </Button>
              <Button href="/what-we-believe" variant="ghost">
                What We Believe
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
