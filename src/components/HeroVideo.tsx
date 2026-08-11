"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The church's walkthrough, running as moving scenery behind the hero.
 *
 * `autoplay muted playsinline` is the standard combination and works in
 * ordinary browsers, but a few conditions refuse it anyway — iOS Low Power
 * Mode, data-saver modes, "never autoplay" browser settings, and headless
 * Chromium. So we also nudge play() once the file can play, and if the browser
 * still says no we reveal the native controls so the visitor has some way in
 * rather than staring at a still frame with no affordance.
 */
export default function HeroVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [needsControls, setNeedsControls] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Belt and braces: React sets `muted` as a property, and an unmuted
    // autoplay attempt is refused everywhere.
    video.muted = true;

    let cancelled = false;

    const attempt = () => {
      if (cancelled) return;
      video.play().catch(() => {
        if (!cancelled) setNeedsControls(true);
      });
    };

    attempt();
    video.addEventListener("canplay", attempt);
    return () => {
      cancelled = true;
      video.removeEventListener("canplay", attempt);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      controls={needsControls}
      preload="auto"
      poster={poster}
      aria-label={label}
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
