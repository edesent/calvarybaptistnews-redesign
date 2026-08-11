import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/* ── Section shell ─────────────────────────────────────────────────────────
   One component owns vertical rhythm and background choice so no page has to
   remember the numbers. */

export function Section({
  children,
  tone = "ivory",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: "ivory" | "paper" | "pale" | "wine" | "dark";
  className?: string;
  id?: string;
}) {
  const tones = {
    ivory: "bg-ivory text-body",
    paper: "bg-paper text-body",
    pale: "bg-wine-pale text-body",
    wine: "bg-wine text-wine-pale",
    dark: "bg-wine-dark text-wine-pale",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        {children}
      </div>
    </section>
  );
}

/* ── Section heading: eyebrow, rule, title, optional lead ─────────────────── */

export function Heading({
  eyebrow,
  title,
  lead,
  align = "left",
  onDark = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <div
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span
            className={`h-px w-8 ${onDark ? "bg-wine-pale/50" : "bg-wine"}`}
          />
          <p
            className={`eyebrow ${onDark ? "!text-wine-pale/85" : ""}`}
          >
            {eyebrow}
          </p>
          {centered && (
            <span
              className={`h-px w-8 ${onDark ? "bg-wine-pale/50" : "bg-wine"}`}
            />
          )}
        </div>
      )}
      <Tag
        className={`mt-4 font-serif text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.16] ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </Tag>
      {lead && (
        <div
          className={`mt-5 text-[17px] leading-relaxed ${
            onDark ? "text-wine-pale/85" : "text-body"
          }`}
        >
          {lead}
        </div>
      )}
    </div>
  );
}

/* ── Buttons ───────────────────────────────────────────────────────────────── */

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light" | "ghost";
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "solid",
  external,
  className = "",
}: BtnProps) {
  const variants = {
    solid: "bg-wine text-white hover:bg-wine-deep",
    outline:
      "border border-wine text-wine hover:bg-wine hover:text-white bg-transparent",
    light: "bg-white text-wine hover:bg-wine-pale",
    ghost:
      "border border-wine-pale/40 text-white hover:bg-white hover:text-wine",
  } as const;

  const cls = `inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-[14.5px] font-semibold tracking-wide transition-colors duration-200 ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ── The oval: the logo's shape, reused as a photo frame ────────────────────
   A wine ring sits just outside the masked image, the way the brush oval sits
   around the cross in the logo. */

export function OvalPhoto({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute -inset-[10px] rounded-[50%/50%] border border-wine/35"
        aria-hidden="true"
      />
      <div className="oval-mask relative h-full w-full bg-ivory-dark">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 420px, 70vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

/* ── Page hero for inner pages ─────────────────────────────────────────────── */

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-rule bg-ivory">
      {/* The oval mark, oversized and faint, as a watermark */}
      <Image
        src="/mark.png"
        alt=""
        width={170}
        height={232}
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-1/2 h-[150%] w-auto -translate-y-1/2 opacity-[0.045] sm:right-10"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-wine" />
              <p className="eyebrow">{eyebrow}</p>
            </div>
          )}
          <h1 className="mt-4 font-serif text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.12] text-ink">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 text-[17.5px] leading-relaxed text-body">
              {lead}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Photo with a caption plate, used across the building-project pages ───── */

export function Figure({
  src,
  alt,
  caption,
  ratio = "aspect-[4/3]",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div
        className={`relative ${ratio} overflow-hidden rounded-sm bg-ivory-dark`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 620px, 100vw"
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 border-l-2 border-wine/40 pl-3 text-[13.5px] leading-snug text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ── Scripture pull-quote ──────────────────────────────────────────────────── */

export function Scripture({
  children,
  reference,
  onDark = false,
}: {
  children: ReactNode;
  reference: string;
  onDark?: boolean;
}) {
  return (
    <blockquote className={onDark ? "text-wine-pale" : "text-ink"}>
      <p
        className={`font-serif text-[clamp(1.25rem,2.4vw,1.7rem)] italic leading-[1.5] ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        “{children}”
      </p>
      <cite
        className={`mt-4 block text-[13px] font-semibold not-italic tracking-[0.16em] uppercase ${
          onDark ? "text-wine-pale/75" : "text-wine"
        }`}
      >
        {reference}
      </cite>
    </blockquote>
  );
}

/* ── Card ──────────────────────────────────────────────────────────────────── */

export function Card({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  return (
    <Tag
      className={`rounded-sm border border-rule bg-paper p-7 transition-shadow duration-300 hover:shadow-[0_14px_38px_-18px_rgba(23,19,26,0.22)] ${className}`}
    >
      {children}
    </Tag>
  );
}
