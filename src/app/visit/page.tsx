import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Button, Figure, Heading, PageHero, Section } from "@/components/ui";
import { NURSERY_NOTE, SERVICES, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "What to expect on your first Sunday at Calvary Baptist Church, McMinnville — service times, where to park, what to wear, and where your children go.",
  alternates: { canonical: "/visit" },
};

const QUESTIONS = [
  {
    q: "What should I wear?",
    a: "Whatever you are comfortable in. You will see suits and you will see jeans. Nobody is going to look you up and down at the door.",
  },
  {
    q: "Where do I park, and which door?",
    a: "Pull up the gravel drive at 610 Myers Lane; there is plenty of room. The double doors under the covered porch are the ones you want.",
  },
  {
    q: "Where do my children go?",
    a: "Sunday School has a class for every age at 10:00. During the 11:00 service, Children's Church meets at the same hour, and a nursery is staffed for ages three and under.",
  },
  {
    q: "Will I be singled out?",
    a: "No. We are glad you came and we will tell you so, but we do not ask visitors to stand up, introduce themselves, or give anything.",
  },
  {
    q: "What Bible do you preach from?",
    a: "The King James Version. Bring your own or borrow one from the rack — Pastor Fittis preaches expositionally, right through the text.",
  },
  {
    q: "How long is the service?",
    a: "Morning worship runs a little over an hour. Sunday School is the hour before it, and there is coffee and conversation in between.",
  },
];

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow="First Time Here"
        title="Plan Your Visit"
        lead="We would love to meet you this Sunday. Here is everything you might want to know before you come — and nothing you have to do."
      />

      {/* Times + directions, side by side */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Heading eyebrow="When" title="Service times" />
            <dl className="mt-8 divide-y divide-rule border-y border-rule">
              {SERVICES.map((s) => (
                <div
                  key={s.name}
                  className="flex items-baseline justify-between gap-6 py-5"
                >
                  <div>
                    <dt className="font-serif text-[19px] text-ink">
                      {s.name}
                    </dt>
                    <p className="mt-1 text-[13.5px] text-muted">
                      {s.day} · {s.note}
                    </p>
                  </div>
                  <dd className="shrink-0 font-serif text-[22px] text-wine">
                    {s.time}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[14.5px] leading-relaxed text-muted">
              {NURSERY_NOTE}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <Heading eyebrow="Where" title="610 Myers Lane" />
            <p className="mt-6 text-[16.5px] leading-relaxed text-body">
              Nineteen acres just off Highway 55 in McMinnville. Look for our
              sign at the road, then follow the drive in — there is plenty of
              parking, and someone will point you to the right door.
            </p>
            <div className="mt-8 overflow-hidden rounded-sm border border-rule">
              <iframe
                src={SITE.mapEmbed}
                title={`Map to ${SITE.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[300px] w-full border-0"
                allowFullScreen
              />
            </div>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button href={SITE.mapLink} external>
                Get Directions
              </Button>
              <Button href={SITE.phoneHref} variant="outline">
                Call {SITE.phone}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Photos of the room you'll walk into */}
      <Section tone="ivory">
        <Reveal>
          <Heading
            eyebrow="What it looks like"
            title="The room you will walk into"
            align="center"
          />
        </Reveal>
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          <Reveal>
            <Figure
              src="/img/church-sign.jpg"
              alt="The Calvary Baptist Church sign at the road: Sunday 10am, 11am and 6pm, Wednesday 7pm, 610 Myers Lane"
              ratio="aspect-[4/3]"
              caption="Our sign at the road — turn in here."
            />
          </Reveal>
          <Reveal delay={70}>
            <Figure
              src="/img/sanctuary-interior.jpg"
              alt="Inside the Tabernacle — rows of blue chairs facing a wooden pulpit on a low platform, with pine walls and windows down both sides"
              ratio="aspect-[4/3]"
              caption="Blue chairs, a wooden pulpit, plenty of light."
            />
          </Reveal>
          <Reveal delay={140}>
            <Figure
              src="/img/congregation-worship.jpg"
              alt="The congregation standing to sing during a Sunday morning service"
              ratio="aspect-[4/3]"
              caption="Congregational singing from the hymnal."
            />
          </Reveal>
        </div>
      </Section>

      {/* Questions */}
      <Section tone="paper">
        <Reveal>
          <Heading
            eyebrow="Honest answers"
            title="Questions people actually ask"
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-rule border-y border-rule">
          {QUESTIONS.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <details className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between gap-6 font-serif text-[19px] text-ink marker:content-none">
                  {item.q}
                  <span className="shrink-0 text-[22px] font-light leading-none text-wine transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-body">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="wine">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-[clamp(1.7rem,3.6vw,2.4rem)] leading-tight text-white">
              We will save you a seat
            </h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-wine-pale/85">
              If you would rather let us know you are coming, or you have a
              question this page did not answer, send a message and Bro. Tom will
              get back to you.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="light">
                Send a Message
              </Button>
              <Button href="/sermons" variant="ghost">
                Watch a Service First
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
