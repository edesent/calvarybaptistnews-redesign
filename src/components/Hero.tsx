import Image from "next/image";
import { SITE } from "@/config/site";
import { Button } from "@/components/ui";
import HeroVideo from "@/components/HeroVideo";

/**
 * Text-forward hero. The tagline is the church's own — set large in Lora, with
 * "Crucified, Risen, and Coming Again" carrying the wine. Beneath it, the
 * Tabernacle photo runs full width at its true 1728×741 proportion so the
 * building is never awkwardly cropped.
 */
export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-ivory">
        {/* Oversized oval mark, barely there, anchoring the right side */}
        <Image
          src="/mark.png"
          alt=""
          width={170}
          height={232}
          aria-hidden="true"
          priority
          className="pointer-events-none absolute right-[-4%] top-1/2 h-[125%] w-auto -translate-y-1/2 opacity-[0.03] sm:opacity-[0.05] lg:right-[6%] lg:h-[135%]"
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="max-w-4xl">
            <div className="rise flex items-center gap-3" style={{ animationDelay: "0.05s" }}>
              <span className="h-px w-10 bg-wine" />
              <p className="eyebrow">
                Independent Baptist · {SITE.city}, Tennessee · Since{" "}
                {SITE.founded}
              </p>
            </div>

            <h1
              className="rise mt-7 font-serif text-[clamp(2.35rem,6.2vw,4.35rem)] leading-[1.08] text-ink"
              style={{ animationDelay: "0.15s" }}
            >
              We Preach Christ
              <br />
              <span className="text-wine italic">Crucified, Risen,</span>
              <br />
              and Coming Again
            </h1>

            <p
              className="rise mt-8 max-w-2xl text-[18px] leading-[1.72] text-body"
              style={{ animationDelay: "0.28s" }}
            >
              We are a friendly, traditional church on nineteen wooded acres at
              610 Myers Lane. We love the Lord Jesus and we love people. Come as
              you are — you will be handed a hymnal, not a clipboard.
            </p>

            <div
              className="rise mt-10 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "0.4s" }}
            >
              <Button href="/visit">Plan Your Visit</Button>
              <Button href="/sermons" variant="outline">
                Watch a Service
              </Button>
            </div>

            {/* Service times, inline — the question every visitor arrives with */}
            <dl
              className="rise mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-8 sm:grid-cols-4"
              style={{ animationDelay: "0.5s" }}
            >
              {[
                { k: "Sunday School", v: "10:00 am" },
                { k: "Morning Worship", v: "11:00 am" },
                { k: "Sunday Evening", v: "6:00 pm" },
                { k: "Wednesday", v: "6:45 pm" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.13em] text-muted">
                    {s.k}
                  </dt>
                  <dd className="mt-1.5 font-serif text-[23px] text-wine">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* The church's own walkthrough of 610 Myers Lane, running full width.
          Muted + autoplay + loop so it behaves like moving scenery rather than
          media the visitor has to manage; the poster frame carries the weight
          on slow connections and wherever autoplay is refused. The caption sits
          in a wine bar beneath, never over the footage. */}
      <div className="bg-ivory">
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-ink sm:aspect-[2/1] lg:aspect-[16/7]">
          <HeroVideo
            src="/hero-tour.mp4"
            poster="/img/new-building-hero.jpg"
            label="A walkthrough of Calvary Baptist Church at 610 Myers Lane — the new church building, the grounds, and a Sunday service"
          />
        </div>
        <div className="bg-wine-dark">
          <div className="mx-auto flex max-w-7xl flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5 px-5 py-3.5 lg:px-8">
            <p className="font-serif text-[clamp(1.05rem,2vw,1.4rem)] text-white">
              Come and visit with us
              <span className="ml-3 font-sans text-[13px] font-normal tracking-wide text-wine-pale/75">
                {SITE.address.full}
              </span>
            </p>
            <a
              href={SITE.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold tracking-wide text-wine-pale underline decoration-wine-pale/35 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
