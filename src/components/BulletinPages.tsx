import Image from "next/image";
import Reveal from "@/components/Reveal";
import { SITE } from "@/config/site";
import {
  formatBulletinDate,
  pageLabel,
  type Bulletin,
} from "@/content/bulletins";

/**
 * The scanned pages of one bulletin, laid out to be read.
 *
 * Bulletins are photographed on a phone as often as they are scanned, so the
 * proportions vary week to week. The frame is a fixed letter-ish shape and the
 * image is contained inside it rather than cropped — a bulletin that is never
 * cut off matters far more than a grid whose edges line up perfectly.
 */
export default function BulletinPages({ bulletin }: { bulletin: Bulletin }) {
  const when = formatBulletinDate(bulletin.date);
  const count = bulletin.pages.length;

  const columns =
    count === 1
      ? "max-w-2xl"
      : count === 2
        ? "max-w-5xl md:grid-cols-2"
        : "max-w-6xl md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`mx-auto grid gap-10 ${columns}`}>
      {bulletin.pages.map((src, i) => (
        <Reveal key={src} delay={i * 80}>
          <figure>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-sm border border-rule bg-white shadow-[0_10px_36px_-18px_rgba(23,19,26,0.3)]"
            >
              <div className="relative aspect-[17/22]">
                <Image
                  src={src}
                  alt={`${pageLabel(i)} of the ${SITE.name} bulletin for ${when}`}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 480px, 100vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                />
              </div>
            </a>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-wine">
                {pageLabel(i)}
              </span>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13.5px] font-medium text-muted underline decoration-rule underline-offset-4 transition-colors hover:text-wine hover:decoration-wine/40"
              >
                Open full size <span aria-hidden="true">↗</span>
              </a>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
