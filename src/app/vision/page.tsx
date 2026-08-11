import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, Figure, Heading, PageHero, Scripture, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Vision",
  description:
    "Drive-in services became open-air services under the pavilion, the pavilion became the Tabernacle, and the church grew by fifty percent. What God is doing next at Calvary Baptist Church.",
  alternates: { canonical: "/vision" },
};

const STAGES = [
  {
    label: "2020",
    title: "Drive-in services",
    body: "During the two years of covid, the new property at 610 Myers Lane became a valuable asset. We initiated drive-in services, meeting in the field with the radio on.",
    photo: "/img/pavilion-services.jpg",
    alt: "Cars parked along the drive at 610 Myers Lane during a service",
  },
  {
    label: "2020 – 2021",
    title: "Open-air services",
    body: "Drive-in services turned into open-air services under the pavilion. We are grateful to God that souls were saved during this time, and the church grew by fifty percent.",
    photo: "/img/pavilion-services-2.jpg",
    alt: "Folding chairs set out under the timber-framed pavilion for an open-air service",
  },
  {
    label: "Summer 2021",
    title: "Soon we needed walls",
    body: "With the need for an enclosed building on the new property, we began a renovation that would turn the open-air pavilion into an enclosed Tabernacle. The men of the church did the framing themselves.",
    photo: "/img/renovation-framing.jpg",
    alt: "The pavilion mid-renovation, newly framed stud walls open to the weather under the finished roof",
  },
  {
    label: "Fall 2021",
    title: "Men at work",
    body: "Week by week the walls went up, the fellowship hall took shape, and a patio with room for a hundred and twenty was poured.",
    photo: "/img/renovation-walls.jpg",
    alt: "Church members working inside the framed shell of the Tabernacle",
  },
  {
    label: "December 2021",
    title: "The Tabernacle",
    body: "The work on the Tabernacle was completed by the first week of December 2021, and the congregation moved in in time for the Christmas season.",
    photo: "/img/tabernacle.jpg",
    alt: "The finished Tabernacle, board-and-batten with a standing-seam roof and a covered porch",
  },
  {
    label: "2022",
    title: "Breaking ground",
    body: "Ground was broken for a church house on the same nineteen acres — the congregation standing in the field with gold shovels, heads bowed, on a fall morning.",
    photo: "/img/groundbreaking.jpg",
    alt: "Congregation members with gold shovels, heads bowed in prayer at the groundbreaking",
  },
  {
    label: "2026",
    title: "A church house on that field",
    body: "The new building stands finished where we once held drive-in services: a sanctuary with a steeple, arched windows down both sides, classrooms, and a covered drop-off. Nine years from bare pasture to this.",
    photo: "/img/new-building-front.jpg",
    alt: "The finished Calvary Baptist Church building — stone gable end, arched windows, and a white steeple",
  },
];

export default function VisionPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Vision for the Future"
        lead="The work continues. What began as drive-in services in a bare field has become a Tabernacle, a finished church house, and a congregation half again the size it was."
      />

      <Section tone="paper">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Scripture reference="Philippians 1:6">
              He which hath begun a good work in you will perform it until the
              day of Jesus Christ.
            </Scripture>
          </div>
        </Reveal>

        <div className="mt-20 space-y-16 lg:space-y-24">
          {STAGES.map((s, i) => (
            <Reveal key={s.title}>
              {/* Odd rows put the photo on the left, so the page alternates. */}
              <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-wine">
                    {s.label}
                  </p>
                  <h2 className="mt-3 font-serif text-[clamp(1.5rem,3vw,2.05rem)] leading-tight text-ink">
                    {s.title}
                  </h2>
                  <div className="rule-wine mt-5" />
                  <p className="mt-6 max-w-lg text-[16.5px] leading-relaxed text-body">
                    {s.body}
                  </p>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <Figure
                    src={s.photo}
                    alt={s.alt}
                    ratio={
                      s.photo === "/img/tabernacle.jpg"
                        ? "aspect-[1728/741]"
                        : "aspect-[4/3]"
                    }
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <Heading
              eyebrow="What's next"
              title="The building is finished. The work is not."
              onDark
              lead="God gave us the acres, then the pavilion, then the Tabernacle, then the church house. What He has not finished is the reason any of it went up — the families in Warren County who have not yet heard the gospel. Come and be part of that."
            />
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/visit" variant="light">
                Plan Your Visit
              </Button>
              <Button href="/new-building" variant="ghost">
                See How It Was Built
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Figure
              src="/img/new-building-aerial.jpg"
              alt="The finished church building from the air, with the paved drive, the workshop, and the Tabernacle behind it"
              ratio="aspect-[16/9]"
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
