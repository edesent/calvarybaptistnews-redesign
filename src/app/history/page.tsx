import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, Figure, Heading, PageHero, Section } from "@/components/ui";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "Calvary Baptist Church was organized by Pastor John Clontz in 1972. Fifty years of history in McMinnville, Tennessee — two pastors, and nineteen acres on Highway 55.",
  alternates: { canonical: "/history" },
};

const PASTORS = [
  {
    name: "Pastor John Clontz",
    years: "1972 – 2012",
    body: [
      "Calvary Baptist was organized by Pastor John Clontz and his family in 1972, and for forty years he was faithful to his calling. He was still preaching and pastoring up into his nineties, even cutting the church grass at age 92.",
      "Many people were reached under Bro. John's ministry over the years. God led him to begin the Calvary Christian Academy at the church, which was instrumental in giving a Christian education to scores of McMinnville children through the years. In 2015, Pastor Clontz entered the Lord's presence at the age of 95.",
    ],
  },
  {
    name: "Pastor Thomas Fittis",
    years: "2012 – present",
    body: [
      "In 2012, the congregation called Pastor Thomas Fittis to be its new pastor. Bro. Tom had been saved in Northern Ireland as a young man and came to Tennessee to study the Bible at Tennessee Temple University in Chattanooga.",
      "After his Bible training he, with his wife Leslie, returned to Northern Ireland as missionaries for the next nineteen years. After returning to the United States in 2005, Tom ministered at B.I.M.I. as director of enrichment, and also was pastor at Temple Baptist Church in McMinnville for six years.",
      "Both pastor and church are excited about what the future holds for Calvary as they embark on a new building program on the nineteen-acre property on Highway 55.",
    ],
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="The History of Calvary Baptist Church"
        lead="Calvary Baptist Church began in 1972, when Pastor John Clontz and his family organized the congregation in McMinnville, Tennessee. Two pastors have served it since."
      />

      <Section tone="paper">
        <div className="space-y-16 lg:space-y-24">
          {PASTORS.map((p, i) => (
            <Reveal key={p.name}>
              <article className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
                <div>
                  <p className="font-serif text-[clamp(1.5rem,3vw,1.9rem)] leading-tight text-wine">
                    {p.years.split(" – ")[0]}
                  </p>
                  <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
                    {p.years}
                  </p>
                  {i === 0 && (
                    <p className="mt-4 text-[14px] leading-relaxed text-muted">
                      Forty years of faithful ministry, and the founding of
                      Calvary Christian Academy.
                    </p>
                  )}
                </div>
                <div className="border-l-2 border-wine/20 pl-8">
                  <h2 className="font-serif text-[26px] leading-snug text-ink">
                    {p.name}
                  </h2>
                  <div className="prose-cbc mt-4">
                    {p.body.map((t) => (
                      <p key={t.slice(0, 40)}>{t}</p>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The property */}
      <Section tone="ivory">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <Heading
              eyebrow="Since 2017"
              title="Our new property at 610 Myers Lane"
              lead="In 2017, God provided nineteen acres of beautiful wooded pasture land adjacent to Highway 55 in McMinnville. We have been building on it ever since — a workshop, a large pavilion, the pavilion enclosed as the Tabernacle, and now a finished church house."
            />
            <p className="mt-6 text-[16.5px] leading-relaxed text-body">
              We are excited to see what God will do in this place in the years
              to come.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/vision">Our Vision</Button>
              <Button href="/new-building" variant="outline">
                The Building Project
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Figure
              src="/img/tabernacle.jpg"
              alt="The Tabernacle at 610 Myers Lane — a long board-and-batten building with a covered porch, set against the tree line"
              ratio="aspect-[1728/741]"
              caption="The Tabernacle, completed December 2021, on the nineteen-acre property."
            />
            <div className="mt-5 grid grid-cols-2 gap-5">
              <Figure
                src="/img/pavilion-services-2.jpg"
                alt="Open-air worship under the pavilion, with folding chairs set out on the concrete slab"
                ratio="aspect-[4/3]"
                caption="Open-air services under the pavilion."
              />
              <Figure
                src="/img/groundbreaking.jpg"
                alt="Congregation members holding gold shovels at the groundbreaking service"
                ratio="aspect-[4/3]"
                caption="Breaking ground for the new church building."
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="wine">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.4rem)] leading-tight text-white">
              Fifty years on, the work continues
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-wine-pale/85">
              Come and be part of what God is doing at Calvary. Sunday School at
              10:00, morning worship at 11:00, at {SITE.address.street}.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/visit" variant="light">
                Plan Your Visit
              </Button>
              <Button href="/leadership" variant="ghost">
                Meet Our Leaders
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
