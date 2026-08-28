import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import {
  Button,
  Card,
  Figure,
  Heading,
  OvalPhoto,
  Scripture,
  Section,
} from "@/components/ui";
import {
  MINISTRIES,
  MISSION_TEAMS,
  NURSERY_NOTE,
  SERVICES,
  SITE,
  TESTIMONIES,
} from "@/config/site";
import { formatBulletinDate, LATEST_BULLETIN } from "@/content/bulletins";

const MISSIONARY_COUNT = MISSION_TEAMS.reduce(
  (n, t) => n + t.missionaries.length,
  0
);

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── Welcome ─────────────────────────────────────────────────────── */}
      <Section tone="paper">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_400px] lg:gap-20">
          <Reveal>
            <Heading
              eyebrow="Welcome"
              title="Thank you for visiting Calvary Baptist Church"
            />
            <div className="prose-cbc mt-6 max-w-2xl">
              <p>
                We are a friendly, traditional, Independent Baptist Church
                located in McMinnville, Tennessee. We love the Lord Jesus and
                love people. When we believed the gospel, our souls were saved
                and our lives were changed.
              </p>
              <p>
                It is our mission to help others know the assurance of
                salvation, and to have confidence of a home in Heaven. That
                confidence and assurance is not found through church membership
                or good deeds, but through faith in the person and work of Jesus
                Christ.
              </p>
            </div>

            <div className="mt-9 border-l-2 border-wine/30 pl-6">
              <Scripture reference="Acts 10:43 · KJV">
                To him give all the prophets witness, that through his name
                whosoever believeth in him shall receive remission of sins.
              </Scripture>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/leadership" variant="outline">
                Meet Our Pastor
              </Button>
              <Button href="/what-we-believe" variant="outline">
                What We Believe
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="mx-auto w-full max-w-[340px] lg:max-w-none">
            {/* The oval matches the photo's own 257×390 proportion, so Bro.
                Tom's portrait is framed rather than cropped. */}
            <OvalPhoto
              src="/img/pastor-tom.png"
              alt="Pastor Tom Fittis"
              className="aspect-[257/390]"
            />
            <div className="mt-8 text-center">
              <p className="font-serif text-[21px] text-ink">
                Pastor Thomas Fittis
              </p>
              <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.15em] text-wine">
                Pastor since 2012
              </p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
                Saved in Belfast, Northern Ireland, and a missionary there for
                nineteen years before the Lord led him to McMinnville.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Service times ───────────────────────────────────────────────── */}
      <Section tone="ivory" id="times">
        <Reveal>
          <Heading
            eyebrow="Every Week"
            title="Church Service Times"
            lead="There is something for every age at every service. Visitors are always welcome, and there is no dress code — come as you are."
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={i * 60}>
              <div className="h-full bg-paper p-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-wine">
                  {s.day}
                </p>
                <h3 className="mt-3 font-serif text-[22px] leading-snug text-ink">
                  {s.name}
                </h3>
                <p className="mt-3 font-serif text-[30px] leading-none text-wine">
                  {s.time}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-muted">
                  {s.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-center text-[14.5px] text-muted">
            {NURSERY_NOTE} Services are also streamed on Facebook Live at{" "}
            <a
              href={SITE.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-wine underline decoration-wine/30 underline-offset-4 hover:decoration-wine"
            >
              Calvary Broadcast
            </a>
            .
          </p>
        </Reveal>
      </Section>

      {/* ── This week's bulletin ────────────────────────────────────────
          Rendered only when a bulletin has actually been posted, so the home
          page never shows an empty frame. */}
      {LATEST_BULLETIN && (
        <Section tone="paper">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_360px] lg:gap-20">
            <Reveal>
              <Heading
                eyebrow="This Week at Calvary"
                title="The Weekly Bulletin"
                lead="The same bulletin handed out at the door on Sunday — the pastor's letter, the week's announcements, the prayer list, and who is serving where. A new one is posted every week, and every past week is kept in the library."
              />
              <p className="mt-6 text-[15.5px] text-body">
                Now showing the bulletin for{" "}
                <span className="font-medium text-wine">
                  {formatBulletinDate(LATEST_BULLETIN.date)}
                </span>
                .
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button href="/bulletin">Read This Week&rsquo;s Bulletin</Button>
                <Button href="/bulletin#library" variant="outline">
                  Bulletin Library
                </Button>
              </div>
            </Reveal>

            <Reveal
              delay={120}
              className="mx-auto w-full max-w-[300px] lg:max-w-none"
            >
              <Link
                href="/bulletin"
                className="group block overflow-hidden rounded-sm border border-rule bg-white shadow-[0_14px_40px_-20px_rgba(23,19,26,0.35)]"
              >
                <div className="relative aspect-[17/22]">
                  <Image
                    src={LATEST_BULLETIN.pages[0]}
                    alt={`Front page of the ${SITE.name} bulletin for ${formatBulletinDate(LATEST_BULLETIN.date)}`}
                    fill
                    sizes="(min-width: 1024px) 360px, 300px"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>
            </Reveal>
          </div>
        </Section>
      )}

      {/* ── The sanctuary ───────────────────────────────────────────────── */}
      <Section tone="ivory">
        <Reveal>
          <Heading
            eyebrow="Your First Visit"
            title="Come and sit in it"
            lead="Nothing about a service at Calvary is designed to put you on the spot. You can sit near the back, sing if you want to, and leave without anyone asking you for anything."
            align="center"
          />
        </Reveal>

        {/* The room itself, given the space it deserves */}
        <Reveal>
          <figure className="mt-14">
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-ivory-dark">
              <Image
                src="/img/sanctuary-interior.jpg"
                alt="The auditorium at Calvary Baptist Church — rows of blue chairs facing a wooden pulpit, a stone cross on the platform wall, arched windows down both sides, and a wood floor"
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-center text-[14px] text-muted">
              Our auditorium at 610 Myers Lane — there is a seat here for you.
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-8 grid gap-7 md:grid-cols-2">
          <Reveal>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ivory-dark">
                <Image
                  src="/img/new-building-hall.jpg"
                  alt="The platform in the auditorium — the piano and organ, choir seating, a stone-faced wall, and log benches at the front"
                  fill
                  sizes="(min-width: 768px) 620px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 border-l-2 border-wine/40 pl-3 text-[13.5px] leading-snug text-muted">
                The piano, the organ, and the choir seats.
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={90}>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-ivory-dark">
                <Image
                  src="/img/congregation-worship.jpg"
                  alt="The congregation of Calvary Baptist Church standing to sing during a Sunday morning service"
                  fill
                  sizes="(min-width: 768px) 620px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 border-l-2 border-wine/40 pl-3 text-[13.5px] leading-snug text-muted">
                Congregational singing, from the hymnal.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* What actually happens in that hour */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "The old hymns",
              d: "Congregational singing from the hymnal, with piano and organ. Traditional, and loud enough that no one can hear you.",
            },
            {
              t: "The King James Bible",
              d: "Expository preaching, verse by verse. Bring a Bible or borrow one from the rack.",
            },
            {
              t: "Room for your children",
              d: "Children's Church at 11:00, a staffed nursery for ages three and under, and no one minding a fussy baby.",
            },
            {
              t: "About an hour",
              d: "Morning worship runs a little over an hour. Sunday School is the hour before, with a class for every age.",
            },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 60}>
              <div className="h-full bg-paper p-7">
                <p className="font-serif text-[20px] leading-snug text-ink">
                  {f.t}
                </p>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-body">
                  {f.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href="/visit">Plan Your Visit</Button>
            <Button href="/sermons" variant="outline">
              Watch a Sermon
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ── New building project ────────────────────────────────────────── */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-20">
          <Reveal>
            <Heading
              eyebrow="Nineteen years in the making"
              title="Our New Church Building"
              lead="In 2017 God provided nineteen acres of wooded pasture land off Highway 55. We began with a workshop and a pavilion, enclosed the pavilion as the Tabernacle in 2021, broke ground for a church house on the same field — and it now stands finished."
            />
            <ul className="mt-9 space-y-4">
              {[
                ["2017", "Nineteen acres provided at 610 Myers Lane"],
                ["2020", "Drive-in services, then open-air under the pavilion"],
                ["2021", "The pavilion enclosed as the Tabernacle by December"],
                ["2026", "The new church building completed"],
              ].map(([year, text]) => (
                <li key={year} className="flex gap-5">
                  <span className="w-14 shrink-0 pt-0.5 font-serif text-[15px] font-semibold text-wine">
                    {year}
                  </span>
                  <span className="border-l border-rule pl-5 text-[15.5px] leading-relaxed text-body">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/new-building">See the Building Project</Button>
              <Button href="/vision" variant="outline">
                Our Vision
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="space-y-5">
            <Figure
              src="/img/new-building-front.jpg"
              alt="The finished Calvary Baptist Church building — a gabled sanctuary faced in stone, with arched windows and a white steeple, on the drive at 610 Myers Lane"
              ratio="aspect-[16/9]"
              caption="The finished building at 610 Myers Lane."
            />
            <div className="grid grid-cols-2 gap-5">
              <Figure
                src="/img/groundbreaking.jpg"
                alt="Members of Calvary Baptist Church standing with gold shovels at the groundbreaking for the new church building"
                ratio="aspect-square"
                caption="Where it started: breaking ground."
              />
              <Figure
                src="/img/new-building-aerial.jpg"
                alt="The new church building from the air, with the paved drive, the workshop, and the Tabernacle behind it"
                ratio="aspect-square"
                caption="The property today, from the air."
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Ministries ──────────────────────────────────────────────────── */}
      <Section tone="ivory">
        <Reveal>
          <Heading
            eyebrow="For Every Age"
            title="Ministries at Calvary"
            lead="From the nursery to the senior fellowship, there is a place for your whole family."
            align="center"
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MINISTRIES.map((m, i) => (
            <Reveal key={m.href} delay={i * 60}>
              <Card as="div" className="flex h-full flex-col">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-wine">
                  {m.meta}
                </p>
                <h3 className="mt-3 font-serif text-[23px] leading-snug text-ink">
                  {m.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-body">
                  {m.blurb}
                </p>
                <Link
                  href={m.href}
                  className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-wine transition-colors hover:text-wine-deep"
                >
                  Learn more
                  <span aria-hidden="true">→</span>
                </Link>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ── Missions ────────────────────────────────────────────────────── */}
      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <Reveal>
            <Heading
              eyebrow="Worldwide Outreach"
              title={`We support ${MISSIONARY_COUNT} missionaries and ministries`}
              onDark
              lead="Our congregation prays for and gives to work in four fields, each with its own team leaders in the church. Pastor Fittis served nineteen years as a missionary in Northern Ireland — missions is not a line item here."
            />
            <div className="mt-9">
              <Button href="/missions" variant="ghost">
                See the Missionary Roster
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border-l border-wine-pale/20 pl-8">
              <Scripture reference="Mark 16:15" onDark>
                Go ye into all the world, and preach the gospel to every
                creature.
              </Scripture>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-8">
              {MISSION_TEAMS.map((t) => (
                <div key={t.region}>
                  <dt className="font-serif text-[34px] leading-none text-white">
                    {t.missionaries.length}
                  </dt>
                  <dd className="mt-2 text-[13.5px] leading-snug text-wine-pale/70">
                    {t.region}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* ── Testimonies ─────────────────────────────────────────────────── */}
      <Section tone="paper">
        <Reveal>
          <Heading
            eyebrow="From Our Church Family"
            title="What people say about us"
            align="center"
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIES.map((t, i) => (
            <Reveal key={t.name} delay={i * 60} className="h-full">
              <li className="flex h-full list-none flex-col rounded-sm bg-ivory p-8">
                {/* self-start keeps the tall oval from being stretched by the
                    flex column's default align-items: stretch. */}
                <Image
                  src="/mark.png"
                  alt=""
                  width={170}
                  height={232}
                  aria-hidden="true"
                  className="h-10 w-auto self-start opacity-30"
                />
                <p className="mt-5 flex-1 text-[15.5px] leading-[1.72] text-body">
                  “{t.quote}”
                </p>
                <p className="mt-6 border-t border-rule pt-4 text-[13px] font-semibold uppercase tracking-[0.13em] text-wine">
                  {t.name}
                </p>
              </li>
            </Reveal>
          ))}

          <Reveal delay={300} className="h-full">
            <li className="flex h-full list-none flex-col justify-center rounded-sm border border-wine/20 bg-wine-pale p-8 text-center">
              <p className="font-serif text-[22px] leading-snug text-ink">
                We would love to meet you this Sunday.
              </p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-body">
                Sunday School at 10:00, worship at 11:00.
              </p>
              <div className="mt-6">
                <Button href="/visit">Plan Your Visit</Button>
              </div>
            </li>
          </Reveal>
        </ul>
      </Section>

      {/* ── Resources ───────────────────────────────────────────────────── */}
      <Section tone="ivory">
        <Reveal>
          <Heading
            eyebrow="Free to Read"
            title="Resources to encourage your faith"
            lead="Two Bible studies we use at Calvary, plus our quarterly newsletter — free, with nothing to sign up for."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Anchors of Faith",
              blurb:
                "Why you can believe in biblical Christianity — the Bible, God's book; Jesus, God's Son; and salvation, God's gift.",
              href: SITE.anchorsPdf,
              cta: "Read the study",
              external: true,
            },
            {
              title: "Discipleship 101",
              blurb:
                "The role of the church in Christian discipleship, and how a loving local church is God's primary tool for growth.",
              href: SITE.discipleshipPdf,
              cta: "Read the study",
              external: true,
            },
            {
              title: "The Calvary Newsletter",
              blurb:
                "Quarterly good news from Calvary — church news and Bible messages, edited by Robert Ditmore.",
              href: "/resources",
              cta: "Browse resources",
              external: false,
            },
          ].map((r, i) => (
            <Reveal key={r.title} delay={i * 70}>
              <Card className="flex h-full flex-col">
                <h3 className="font-serif text-[23px] leading-snug text-ink">
                  {r.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-body">
                  {r.blurb}
                </p>
                {r.external ? (
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-wine hover:text-wine-deep"
                  >
                    {r.cta}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link
                    href={r.href}
                    className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-wine hover:text-wine-deep"
                  >
                    {r.cta}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Location ────────────────────────────────────────────────────── */}
      <section className="border-t border-rule bg-paper">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-5 py-20 lg:px-16 lg:py-28">
            <Reveal>
              <Heading eyebrow="Find Us" title="610 Myers Lane" />
              <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-body">
                Nineteen acres just off Highway 55 in McMinnville. There is
                plenty of parking on the gravel drive, and the doors under the
                porch are the ones you want.
              </p>

              <dl className="mt-9 space-y-5 text-[15.5px]">
                <div>
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Address
                  </dt>
                  <dd className="mt-1.5 text-ink">
                    {SITE.address.street}
                    <br />
                    {SITE.address.city}, {SITE.address.state}{" "}
                    {SITE.address.zip}
                  </dd>
                </div>
                <div>
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Church Phone
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={SITE.phoneHref}
                      className="text-ink transition-colors hover:text-wine"
                    >
                      {SITE.phone}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href={SITE.mapLink} external>
                  Get Directions
                </Button>
                <Button href="/contact" variant="outline">
                  Send a Message
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="min-h-[380px] lg:min-h-[560px]">
            <iframe
              src={SITE.mapEmbed}
              title={`Map to ${SITE.name}, ${SITE.address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[380px] w-full border-0 grayscale-[35%]"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
