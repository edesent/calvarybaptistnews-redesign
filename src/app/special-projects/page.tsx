import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, Figure, Heading, PageHero, Section } from "@/components/ui";
import { SPECIAL_PROJECTS, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Special Outreach Projects",
  description:
    "Hurricane Helene disaster relief in North Carolina, a church building in Hagal, Mongolia, and an orphanage in David, Panama — recent outreach projects of Calvary Baptist Church.",
  alternates: { canonical: "/special-projects" },
};

export default function SpecialProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Outreach"
        title="Special Outreach Projects"
        lead="Calvary Baptist Church has many outreach and missionary projects. Here are a few recent and ongoing ones."
      />

      <Section tone="paper">
        <div className="space-y-16 lg:space-y-20">
          {SPECIAL_PROJECTS.map((p, i) => (
            <Reveal key={p.title}>
              <article className="grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-14">
                <div>
                  <p className="font-serif text-[clamp(1.4rem,2.8vw,1.8rem)] leading-none text-wine">
                    {p.when}
                  </p>
                  <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Project {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <div className="border-l-2 border-wine/20 pl-8">
                  <h2 className="font-serif text-[clamp(1.4rem,3vw,1.95rem)] leading-snug text-ink">
                    {p.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[16.5px] leading-relaxed text-body">
                    {p.blurb}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How a project starts here */}
      <Section tone="ivory">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <Heading
              eyebrow="How these begin"
              title="A church already in the habit of going"
              lead="None of these trips started with a committee. They started on Tuesday evenings, with a congregation used to knocking on doors in McMinnville — and with missionaries this church has prayed for by name for years."
            />
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/ministries/outreach">Visitation & Outreach</Button>
              <Button href="/missions" variant="outline">
                Our Missionaries
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Figure
              src="/img/fellowship-outdoors.jpg"
              alt="Church families gathered on the field at 610 Myers Lane on a summer evening"
              ratio="aspect-[16/10]"
              caption="The church family at 610 Myers Lane."
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="wine">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow !text-wine-pale/85">What is next?</p>
            <h2 className="mt-5 font-serif text-[clamp(1.7rem,3.6vw,2.4rem)] leading-tight text-white">
              Come and help us with our next project
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-wine-pale/85">
              To spread the gospel — to help people — to glorify God.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="light">
                Get Involved
              </Button>
              <Button href={SITE.giveUrl} external variant="ghost">
                Give Toward a Project
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
