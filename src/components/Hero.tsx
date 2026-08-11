import Image from "next/image";
import { SITE } from "@/config/site";
import { Button } from "@/components/ui";

/**
 * The hero: the new auditorium, under a rich wine field.
 *
 * The photograph carries the room; the wine carries the brand. The gradient is
 * weighted to the left so the type sits on near-solid colour while the chairs,
 * wood and arched windows still read on the right. Everything below this
 * section stays on ivory, so the hero lands as one bold band of colour rather
 * than a dark site.
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-wine-dark">
      <Image
        src="/img/sanctuary-wide.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className="object-cover object-[center_40%]"
      />

      {/* Flat wash for narrow screens, where the type spans the full width… */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[1] bg-wine-dark/[0.88] lg:hidden"
      />
      {/* …and a left-weighted gradient on wide ones, so the room opens up. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[1] hidden lg:block lg:bg-gradient-to-r lg:from-wine-dark lg:from-8% lg:via-wine-deep/90 lg:via-48% lg:to-wine/35"
      />

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-5 py-20 lg:min-h-[680px] lg:px-8 lg:py-24">
        <div className="max-w-4xl">
          <div
            className="rise flex items-center gap-3"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-px w-10 bg-wine-pale/70" />
            <p className="eyebrow !text-wine-pale">
              Independent Baptist · {SITE.city}, Tennessee · Since{" "}
              {SITE.founded}
            </p>
          </div>

          <h1
            className="rise mt-7 font-serif text-[clamp(2.5rem,6.6vw,4.75rem)] font-semibold leading-[1.05] text-white"
            style={{ animationDelay: "0.15s" }}
          >
            We Preach Christ
            <br />
            <span className="italic text-wine-pale">Crucified, Risen,</span>
            <br />
            and Coming Again
          </h1>

          <p
            className="rise mt-8 max-w-2xl text-[18px] leading-[1.72] text-wine-pale/90"
            style={{ animationDelay: "0.28s" }}
          >
            We are a friendly, traditional church on nineteen wooded acres at 610
            Myers Lane. We love the Lord Jesus and we love people. Come as you
            are — you will be handed a hymnal, not a clipboard.
          </p>

          <div
            className="rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            <Button href="/visit" variant="light">
              Plan Your Visit
            </Button>
            <Button href="/sermons" variant="ghost">
              Watch a Service
            </Button>
          </div>

          <p
            className="rise mt-6 text-[14px] text-wine-pale/70"
            style={{ animationDelay: "0.45s" }}
          >
            {SITE.address.full} ·{" "}
            <a
              href={SITE.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-wine-pale underline decoration-wine-pale/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              Get directions
            </a>
          </p>

          {/* Service times — the question every visitor arrives with */}
          <dl
            className="rise mt-12 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-wine-pale/25 pt-8 sm:grid-cols-4"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { k: "Sunday School", v: "10:00 am" },
              { k: "Morning Worship", v: "11:00 am" },
              { k: "Sunday Evening", v: "6:00 pm" },
              { k: "Wednesday", v: "6:45 pm" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-[12px] font-semibold uppercase tracking-[0.13em] text-wine-pale/65">
                  {s.k}
                </dt>
                <dd className="mt-1.5 font-serif text-[25px] font-medium text-white">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
