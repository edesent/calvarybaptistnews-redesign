import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { Button, Heading, PageHero, Section } from "@/components/ui";
import { SERVICES, SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Calvary Baptist Church, 610 Myers Lane, McMinnville, Tennessee. Call (931) 815-3919 or send a message and the pastor will get back to you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        lead="If you need spiritual help, have a question about the Bible, or simply want to know what to expect on a Sunday — please get in touch. You can write to us any time."
      />

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <Reveal>
            <Heading eyebrow="Write to us" title="Send a message" as="h2" />
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-body">
              Messages come straight to the church office and are read by the
              pastor. Nothing you write here goes on a mailing list.
            </p>
            <div className="mt-9">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-sm border border-rule bg-ivory p-8">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-wine">
                Church details
              </h2>

              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                    Address
                  </dt>
                  <dd className="mt-1.5 text-[16px] leading-relaxed text-ink">
                    {SITE.address.street}
                    <br />
                    {SITE.address.city}, {SITE.address.state}{" "}
                    {SITE.address.zip}
                  </dd>
                </div>
                <div>
                  <dt className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                    Church phone
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={SITE.phoneHref}
                      className="text-[16px] text-ink transition-colors hover:text-wine"
                    >
                      {SITE.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                    Pastor
                  </dt>
                  <dd className="mt-1.5 text-[16px] text-ink">
                    {SITE.pastor}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 border-t border-rule pt-6">
                <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                  When we meet
                </h3>
                <dl className="mt-4 space-y-2 text-[14.5px]">
                  {SERVICES.map((s) => (
                    <div key={s.name} className="flex justify-between gap-4">
                      <dt className="text-body">{s.name}</dt>
                      <dd className="shrink-0 font-medium text-wine">
                        {s.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-rule pt-6">
                <Button href={SITE.mapLink} external>
                  Get Directions
                </Button>
                <Button href="/visit" variant="outline">
                  Plan Your Visit
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Map */}
      <section className="border-t border-rule">
        <iframe
          src={SITE.mapEmbed}
          title={`Map to ${SITE.name}, ${SITE.address.full}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[420px] w-full border-0 grayscale-[30%]"
          allowFullScreen
        />
      </section>
    </>
  );
}
