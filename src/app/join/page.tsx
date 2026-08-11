import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, Heading, PageHero, Scripture, Section } from "@/components/ui";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "How to Join Our Church",
  description:
    "How to become a member of Calvary Baptist Church, McMinnville — by baptism, letter of transfer, statement of faith, or restoration, and the steps that follow.",
  alternates: { canonical: "/join" },
};

const WAYS = [
  {
    n: 1,
    title: "By Baptism",
    body: "We may join by baptism. Having received Jesus as our Savior, we are willing to be baptized by immersion as a sign of our faith in Jesus.",
  },
  {
    n: 2,
    title: "By Letter of Transfer",
    body: "We may join by transfer of membership from another church. We have received Jesus as our Savior, and have already been baptized by immersion.",
    note: "Our clerk will contact your previous church for transfer of membership when you supply the church name. You do not have to make any contact.",
  },
  {
    n: 3,
    title: "By Statement of Faith",
    body: "We may join by statement of faith. We have received Jesus as our Savior and have already been baptized by immersion, but do not have membership in another church.",
  },
  {
    n: 4,
    title: "By Restoration",
    body: "We may come to restore membership in the church. After reaffirming our commitment to the Lord Jesus, to the members and leadership of Calvary Baptist Church, membership will be fully restored after four consecutive weeks of regular attendance.",
  },
];

const STEPS = [
  {
    title: "Tell the pastor you are interested",
    body: "He will provide reading materials, the church constitution and articles of faith, and answer anything you want to ask.",
  },
  {
    title: "Read the New Members Study",
    body: "“Discipleship 101” — a short Bible study on what it means to follow Christ, and how a local church helps you do it.",
  },
  {
    title: "Complete the Membership Application",
    body: "A simple form; the pastor will give it to you along with the reading.",
  },
  {
    title: "Meet with the pastor and a deacon",
    body: "Together you will talk through which of the four ways you will join the church.",
  },
  {
    title: "Come forward in a public service",
    body: "The pastor will encourage you and instruct you about this part of the process — you will not be surprised by anything.",
  },
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="How Do I Join Calvary Baptist Church?"
        lead="We are always so pleased when someone asks about joining our church, so we would like to answer that question plainly."
      />

      {/* The most important caveat, given its own room */}
      <Section tone="pale">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">First, the most important thing</p>
            <h2 className="mt-5 font-serif text-[clamp(1.5rem,3.4vw,2.2rem)] leading-snug text-ink">
              Joining our church — or any other — does not save you or give you a
              home in Heaven.
            </h2>
            <p className="mt-6 text-[16.5px] leading-relaxed text-body">
              Only trusting in Jesus Christ as our Savior accomplishes
              salvation. If you need to be saved, we would love to show you from
              the Bible how to receive eternal life as a gift from God. Ask us
              about it.
            </p>
            <div className="mt-8 border-t border-wine/20 pt-8">
              <Scripture reference="Ephesians 2:8-9">
                For by grace are ye saved through faith; and that not of
                yourselves: it is the gift of God: not of works, lest any man
                should boast.
              </Scripture>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Four ways */}
      <Section tone="paper">
        <Reveal>
          <Heading
            eyebrow="Four ways"
            title="Joining can happen in one of four ways"
          />
        </Reveal>

        <div className="mt-12 grid gap-7 md:grid-cols-2">
          {WAYS.map((w, i) => (
            <Reveal key={w.n} delay={i * 60}>
              <div className="flex h-full flex-col rounded-sm border border-rule bg-ivory p-8">
                <p className="font-serif text-[30px] leading-none text-wine/45">
                  {String(w.n).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-serif text-[22px] leading-snug text-ink">
                  {w.title}
                </h3>
                <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-body">
                  {w.body}
                </p>
                {w.note && (
                  <p className="mt-4 border-l-2 border-wine/30 pl-4 text-[14px] italic leading-relaxed text-muted">
                    {w.note}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section tone="ivory">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <Heading
                eyebrow="The process"
                title="How joining goes"
                lead="Five steps, at your pace. Nothing happens that you have not been told about first."
              />
              <div className="mt-9">
                <Button href={SITE.discipleshipPdf} external variant="outline">
                  Read Discipleship 101
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ol className="space-y-8">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-wine/35 font-serif text-[16px] text-wine">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-serif text-[20px] leading-snug text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-body">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* After joining */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Heading eyebrow="Afterward" title="After joining the church" />
            <div className="prose-cbc mt-6">
              <p>
                When you join, the members will greet you and welcome you into
                our fellowship at the close of the service. This always brings
                great joy to everyone.
              </p>
              <p>
                Joining the church is just the beginning. We hope that you will
                feel at home and become an integral part of the church family.
                Church is a place to learn, to grow, to fellowship, and also a
                place to serve. It is our hope that you will find a place of
                ministry according to your gifts and interests — the
                opportunities will be discussed with you as part of the New
                Members Study.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-sm border border-wine/20 bg-wine-pale p-9">
              <p className="font-serif text-[20px] italic leading-relaxed text-ink">
                “If you are thinking of joining, speak with me about it before or
                after the service and I will provide everything you need to get
                started.”
              </p>
              <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.15em] text-wine">
                Bro. Tom, pastor
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact">Send a Message</Button>
                <Button href={SITE.phoneHref} variant="outline">
                  Call the Church
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
