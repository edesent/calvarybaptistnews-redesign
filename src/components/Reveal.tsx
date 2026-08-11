"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Fades a block up as it scrolls into view.
 *
 * The animation is strictly decorative, so it is built to fail open: anything
 * already at or above the fold is shown immediately, a timer reveals whatever
 * is left if the observer never fires, and the CSS honours
 * prefers-reduced-motion. Content must never depend on this to be readable.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Already on screen (or scrolled past) at mount — no animation needed.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    observer.observe(el);

    // Safety net: if the observer never reports (an unusual viewport, a
    // programmatic jump down the page), show the content anyway.
    const fallback = window.setTimeout(() => {
      setVisible(true);
      observer.disconnect();
    }, 2500);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
