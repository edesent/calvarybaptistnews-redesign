import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, Figure, Heading, PageHero, Scripture, Section } from "@/components/ui";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "McMinnville School of the Bible",
  description:
    "A two-year Bible school at Calvary Baptist Church, McMinnville — twelve courses over four semesters, Thursday evenings in the Tabernacle, in conjunction with The Crown College of the Bible.",
  alternates: { canonical: "/school-of-the-bible" },
};

const SEMESTERS = [
  {
    label: "Semester One",
    courses: [
      ["SB101", "Personal Evangelism"],
      ["SB102", "Survey of the Old Testament I"],
      ["SB103", "Basic Bible Doctrine I"],
    ],
  },
  {
    label: "Semester Two",
    courses: [
      ["SB201", "Methods of Bible Study"],
      ["SB202", "Survey of the Old Testament II"],
      ["SB203", "Basic Bible Doctrine II"],
    ],
  },
  {
    label: "Semester Three",
    courses: [
      ["SB301", "Teaching the Bible"],
      ["SB302", "The Christian Home"],
      ["SB303", "Survey of the New Testament I"],
    ],
  },
  {
    label: "Semester Four",
    courses: [
      ["SB401", "Survey of the New Testament II"],
      ["SB402", "The New Testament Church"],
      ["SB403", "The Life of Christ"],
    ],
  },
];

const TEACHERS = [
  ["Tom Fittis", "Basic Bible Doctrine"],
  ["Billy Kirk", "Methods of Bible Study"],
  ["Robert Ditmore", "Survey of the Old Testament"],
  ["Jeremy Jones", "Assistant teacher"],
  ["Sherry Kirk", "School secretary"],
];

const FACTS = [
  { k: "When", v: "Thursday evenings, 7:00 pm" },
  { k: "Where", v: "The Tabernacle, 610 Myers Lane" },
  { k: "Length", v: "Twelve courses over four semesters" },
  { k: "Who may enrol", v: "Adults of all ages, plus high school juniors and seniors" },
  { k: "Attendance", v: "Ten of the twelve sessions per semester to earn credit" },
  { k: "On completion", v: "Biblical Studies Certificate from The Crown College of the Bible" },
];

export default function SchoolOfTheBiblePage() {
  return (
    <>
      <PageHero
        eyebrow="A ministry of Calvary Baptist Church"
        title="McMinnville School of the Bible"
        lead="A two-year programme of Bible study for ordinary church members, taught in the Tabernacle on Thursday evenings — in conjunction with The Crown College of the Bible, Powell, Tennessee."
      />

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <Reveal>
            <Heading eyebrow="Our aim" title="Not study for its own sake" />
            <div className="prose-cbc mt-6">
              <p>
                Our purpose is not just to study the Bible for our own profit,
                but that we might teach others, and help them become disciples
                and servants of the Lord.
              </p>
              <p>
                The programme consists of twelve courses offered over four
                semesters. At the end of the two years, those who have
                successfully completed the twelve courses are eligible to
                graduate with a Biblical Studies Certificate from The Crown
                College of the Bible in Powell, Tennessee. Enrolment is open to
                adults of all ages, and also to high school juniors and seniors.
              </p>
              <p>
                Classes are also video recorded. Those who cannot attend due to
                exceptional circumstances are given a password to view the class
                online — though the best part of being there in person is the
                chance to ask questions and join the discussion.
              </p>
            </div>

            <div className="mt-9 border-l-2 border-wine/30 pl-6">
              <Scripture reference="2 Timothy 2:2 · our school motto">
                And the things that thou hast heard of me among many witnesses,
                the same commit thou to faithful men, who shall be able to teach
                others also.
              </Scripture>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/contact">Ask About Enrolling</Button>
              <Button href={SITE.phoneHref} variant="outline">
                Call {SITE.phone}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-sm border border-rule bg-ivory p-8">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-wine">
                At a glance
              </h2>
              <dl className="mt-6 divide-y divide-rule">
                {FACTS.map((f) => (
                  <div key={f.k} className="py-4 first:pt-0 last:pb-0">
                    <dt className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                      {f.k}
                    </dt>
                    <dd className="mt-1.5 text-[15.5px] leading-snug text-ink">
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-7 rounded-sm border border-wine/20 bg-wine-pale p-8">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-wine">
                Who teaches
              </h2>
              <dl className="mt-5 space-y-3">
                {TEACHERS.map(([name, subject]) => (
                  <div key={name} className="flex flex-wrap justify-between gap-x-4">
                    <dt className="font-serif text-[17px] text-ink">{name}</dt>
                    <dd className="text-[14px] text-body">{subject}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Curriculum */}
      <Section tone="ivory">
        <Reveal>
          <Heading
            eyebrow="The curriculum"
            title="Twelve courses, four semesters"
            lead="The full two-year cycle. Which courses run in a given semester is announced in the weekly bulletin."
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SEMESTERS.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <div className="h-full rounded-sm border border-rule bg-paper p-7">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-wine">
                  {s.label}
                </p>
                <ul className="mt-5 space-y-4">
                  {s.courses.map(([code, name]) => (
                    <li key={code}>
                      <p className="text-[12px] font-medium tracking-[0.08em] text-faint">
                        {code}
                      </p>
                      <p className="mt-0.5 font-serif text-[17px] leading-snug text-ink">
                        {name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Course descriptions */}
      <Section tone="paper">
        <Reveal>
          <Heading eyebrow="What you will study" title="Sample course descriptions" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {[
            {
              title: "Methods of Bible Study",
              teacher: "Billy Kirk",
              body: "Helpful methods to assist believers in personal Bible study. Students learn principles of biblical interpretation to guide them in understanding different passages of Scripture such as narratives, psalms, proverbs, parables, and prophecy — and how to use Bible study tools on individual books, chapters, verses, and words.",
            },
            {
              title: "Survey of the Old Testament II",
              teacher: "Robert Ditmore",
              body: "A survey of the Books of Poetry (Job through the Song of Solomon), the Major Prophets (Isaiah through Daniel), and the Minor Prophets (Hosea through Malachi). The main theme of each book is highlighted along with key words, key verses, and pictures of Christ.",
            },
            {
              title: "Basic Bible Doctrine II",
              teacher: "Tom Fittis",
              body: "Clear Bible teaching on anthropology (the study of man), hamartiology (sin), soteriology (salvation), ecclesiology (the church), and eschatology (end times). Bible answers are given to commonly asked questions concerning the Christian faith.",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <article>
                <h3 className="font-serif text-[21px] leading-snug text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-[12.5px] font-semibold uppercase tracking-[0.13em] text-wine">
                  Taught by {c.teacher}
                </p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-body">
                  {c.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The prospectus */}
      <Section tone="ivory">
        <Reveal>
          <Heading
            eyebrow="The prospectus"
            title="Read the school's own pages"
            lead="The timetable, course schedule, recommended textbooks, and everything else, exactly as the school publishes it."
            align="center"
          />
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-4xl gap-7 sm:grid-cols-2">
          <Reveal>
            <Figure
              src="/img/school-of-the-bible-1.jpg"
              alt="Page one of the McMinnville School of the Bible prospectus, listing the timetable, teachers, and semester schedule"
              ratio="aspect-[1400/1812]"
              caption="Page one — welcome, timetable, and teachers."
            />
          </Reveal>
          <Reveal delay={80}>
            <Figure
              src="/img/school-of-the-bible-2.jpg"
              alt="Page two of the prospectus, listing the four-semester course schedule, recommended textbooks, and course descriptions"
              ratio="aspect-[1400/1812]"
              caption="Page two — courses, textbooks, and descriptions."
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}