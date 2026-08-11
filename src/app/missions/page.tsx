import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, Heading, PageHero, Scripture, Section } from "@/components/ui";
import { MISSION_TEAMS, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Worldwide Missions",
  description:
    "Calvary Baptist Church, McMinnville supports fifty-nine missionaries and ministries across four fields — South and Central America, Europe, the Far East, and North America.",
  alternates: { canonical: "/missions" },
};

const TOTAL = MISSION_TEAMS.reduce((n, t) => n + t.missionaries.length, 0);

export default function MissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Worldwide Outreach"
        title="Missions"
        lead={`Calvary supports ${TOTAL} missionaries and ministries in four fields. Each field has its own team leaders here in the congregation, so that the praying is as specific as the giving.`}
      />

      <Section tone="paper">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Scripture reference="Mark 16:15">
              Go ye into all the world, and preach the gospel to every creature.
            </Scripture>
            <p className="mt-8 text-[16.5px] leading-relaxed text-body">
              Pastor Fittis served nineteen years as a missionary in Northern
              Ireland and later as Director of Enrichment at Baptist
              International Missions, Inc. Missions is not a line item at
              Calvary — it is the reason a good many of us are here.
            </p>
          </div>
        </Reveal>

        {/* Field counts */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {MISSION_TEAMS.map((t, i) => (
            <Reveal key={t.region} delay={i * 60}>
              <div className="h-full bg-ivory p-7 text-center">
                <p className="font-serif text-[38px] leading-none text-wine">
                  {t.missionaries.length}
                </p>
                <p className="mt-3 text-[14px] font-medium leading-snug text-ink">
                  {t.region}
                </p>
                <p className="mt-2 text-[12.5px] leading-snug text-muted">
                  Team leaders: {t.leaders}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The roster */}
      <Section tone="ivory">
        <Reveal>
          <Heading
            eyebrow="The roster"
            title="Who we pray for by name"
            lead="Take a photograph of this list, or ask for a prayer card at the missions board in the Tabernacle."
          />
        </Reveal>

        <div className="mt-14 space-y-14">
          {MISSION_TEAMS.map((team, i) => (
            <Reveal key={team.region} delay={i * 60}>
              <section>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule-strong pb-4">
                  <h3 className="font-serif text-[clamp(1.25rem,2.6vw,1.7rem)] leading-tight text-ink">
                    {team.region}
                  </h3>
                  <p className="text-[13px] text-muted">
                    Team leaders:{" "}
                    <span className="font-medium text-wine">{team.leaders}</span>
                  </p>
                </div>
                <ul className="mt-6 grid gap-x-10 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {team.missionaries.map((m) => (
                    <li
                      key={m}
                      className="flex gap-3 text-[15px] leading-relaxed text-body"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-wine/50"
                      />
                      {m}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="wine">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <Heading
              eyebrow="Take part"
              title="Pray, give, or go"
              onDark
              lead="Every one of these names belongs to someone this church prays for. If you would like a prayer card, or you want to know how to give toward a field, ask any of the team leaders."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-4">
              <Button href={SITE.giveUrl} external variant="light">
                Give to Missions
              </Button>
              <Button href="/special-projects" variant="ghost">
                See Our Projects
              </Button>
              <Button href="/contact" variant="ghost">
                Ask a Question
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
