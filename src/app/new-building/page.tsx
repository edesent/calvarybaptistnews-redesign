import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, Figure, Heading, PageHero, Section } from "@/components/ui";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "New Building Project",
  description:
    "Praying and planning for a new church building on our nineteen acres at 610 Myers Lane, McMinnville, Tennessee. Watch the walkthrough and see how the work has progressed.",
  alternates: { canonical: "/new-building" },
};

const GALLERY = [
  {
    src: "/img/renovation-framing.jpg",
    alt: "The pavilion mid-renovation — newly framed stud walls open to the weather beneath the finished metal roof",
    caption: "Framing the walls that enclosed the pavilion.",
  },
  {
    src: "/img/renovation-walls.jpg",
    alt: "Church members working inside the framed shell of the Tabernacle, with lumber stacked on the slab",
    caption: "Men of the church at work on the fellowship hall end.",
  },
  {
    src: "/img/renovation-05.jpg",
    alt: "The renovation from the far end, framing complete along the length of the building",
    caption: "Room for a hundred and twenty, taking shape.",
  },
  {
    src: "/img/renovation-15.jpg",
    alt: "Further progress on the Tabernacle renovation",
    caption: "The fellowship hall patio going in.",
  },
  {
    src: "/img/renovation-19.jpg",
    alt: "The Tabernacle nearing completion",
    caption: "Nearing completion, autumn 2021.",
  },
  {
    src: "/img/tabernacle.jpg",
    alt: "The finished Tabernacle at 610 Myers Lane",
    caption: "Finished the first week of December 2021.",
  },
];

export default function NewBuildingPage() {
  return (
    <>
      <PageHero
        eyebrow="Praying & Planning"
        title="Our New Church Building"
        lead="Nineteen acres off Highway 55, a workshop, a pavilion enclosed as the Tabernacle — and now ground broken for a church house. Here is where the work stands."
      />

      {/* Walkthrough video */}
      <Section tone="paper">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-sm border border-rule bg-ink">
              <video
                controls
                preload="metadata"
                poster="/img/new-church-building.jpg"
                className="aspect-video w-full"
              >
                <source src="/new-building-tour.mp4" type="video/mp4" />
                Your browser cannot play this video. The walkthrough is also on
                our Facebook page.
              </video>
            </div>
            <p className="mt-4 text-center text-[14px] text-muted">
              A walkthrough of the building we are praying and planning for.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Where the work stands */}
      <Section tone="ivory">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <Heading
              eyebrow="The plan"
              title="What we are building, and why"
              lead="Calvary outgrew the old building on West End Avenue. In 2017 God provided nineteen acres of wooded pasture adjacent to Highway 55, and we have been building on it ever since — a piece at a time, largely with our own hands."
            />
            <div className="prose-cbc mt-7">
              <p>
                The pavilion came first, and it carried us through two years of
                drive-in and open-air services. In 2021 we enclosed it as the
                Tabernacle, and the congregation moved in for that Christmas
                season. The church grew by fifty percent in those years.
              </p>
              <p>
                The next step is a church building on the same field: a
                sanctuary with a steeple, a covered drop-off for the folks who
                need it, and classrooms for a Sunday School that keeps
                outgrowing its rooms.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={SITE.giveUrl} external>
                Give Toward the Building
              </Button>
              <Button href="/contact" variant="outline">
                Ask About Helping
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Figure
              src="/img/new-church-building.jpg"
              alt="Rendering of the planned church building — a gabled sanctuary faced in stone with a cross on the gable end, a white steeple, and a covered drive-through canopy"
              ratio="aspect-[16/9]"
              caption="The rendering of our planned church building."
            />
            <div className="mt-6 grid grid-cols-2 gap-5">
              <Figure
                src="/img/groundbreaking.jpg"
                alt="Members standing with gold shovels, heads bowed, at the groundbreaking service"
                ratio="aspect-square"
                caption="Breaking ground, on a fall morning."
              />
              <div className="flex flex-col justify-center rounded-sm border border-wine/20 bg-wine-pale p-6">
                <p className="font-serif text-[34px] leading-none text-wine">
                  19
                </p>
                <p className="mt-2 text-[14px] leading-snug text-body">
                  acres of wooded pasture, provided in 2017
                </p>
                <p className="mt-6 font-serif text-[34px] leading-none text-wine">
                  +50%
                </p>
                <p className="mt-2 text-[14px] leading-snug text-body">
                  church growth through the open-air years
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Progress gallery */}
      <Section tone="paper">
        <Reveal>
          <Heading
            eyebrow="How it went up"
            title="The work, step by step"
            lead="Photographs from the renovation that turned an open-air pavilion into the building we meet in now."
            align="center"
          />
        </Reveal>
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              src: "/img/new-church-building-2.jpg",
              alt: "Rendering of the planned church building seen from the drive, with the existing workshop and Tabernacle beyond it",
              caption: "The new building alongside what is already there.",
            },
            {
              src: "/img/new-church-building-3.jpg",
              alt: "Rendering of the planned church building's covered entrance, with stone facing and timber posts",
              caption: "The covered entrance, close up.",
            },
            ...GALLERY,
          ].map((g, i) => (
            <Reveal key={g.src} delay={i * 60}>
              <Figure
                src={g.src}
                alt={g.alt}
                caption={g.caption}
                ratio="aspect-[4/3]"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="wine">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.4rem)] leading-tight text-white">
              Come and help us with the next project
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-wine-pale/85">
              To spread the gospel, to help people, and to glorify God. There is
              always work to do and always a place for another pair of hands.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/special-projects" variant="light">
                See Our Projects
              </Button>
              <Button href={SITE.phoneHref} variant="ghost">
                Call {SITE.phone}
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
