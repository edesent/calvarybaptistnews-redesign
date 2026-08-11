"use client";

import Image from "next/image";
import { useState } from "react";
import type { MessageItem } from "@/lib/messages";

/**
 * Sermons play here, on the church's own page, rather than sending people off
 * to YouTube.
 *
 * When the RSS feed is available we get titles and dates, and the thumbnails
 * swap the player without a page load. When it isn't — YouTube rate-limits that
 * endpoint and answers 404 — the player falls back to the channel's uploads
 * playlist, which always starts on the newest sermon. Either way something
 * plays.
 */
export default function SermonPlayer({
  messages,
  uploadsPlaylist,
}: {
  messages: MessageItem[];
  uploadsPlaylist: string;
}) {
  const [current, setCurrent] = useState(0);
  const selected = messages[current];

  const src = selected
    ? `https://www.youtube-nocookie.com/embed/${selected.id}?rel=0&modestbranding=1`
    : `https://www.youtube-nocookie.com/embed/videoseries?list=${uploadsPlaylist}&rel=0&modestbranding=1`;

  return (
    <div>
      <div className="overflow-hidden rounded-sm border border-rule bg-ink shadow-[0_18px_50px_-24px_rgba(23,19,26,0.4)]">
        <iframe
          key={src}
          src={src}
          title={selected ? selected.title : "Sermons from Calvary Baptist Church"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="aspect-video w-full border-0"
        />
      </div>

      {selected ? (
        <div className="mt-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-wine">
            {current === 0 ? "Most recent" : "Now playing"} ·{" "}
            {selected.published}
          </p>
          <h2 className="mt-2 font-serif text-[clamp(1.35rem,2.8vw,1.95rem)] leading-snug text-ink">
            {selected.title}
          </h2>
        </div>
      ) : (
        <p className="mt-5 text-[14.5px] text-muted">
          Playing the most recent messages from our YouTube channel.
        </p>
      )}

      {messages.length > 1 && (
        <>
          <h3 className="mt-14 text-[12px] font-semibold uppercase tracking-[0.15em] text-wine">
            More messages
          </h3>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {messages.map((m, i) => {
              const active = i === current;
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-current={active ? "true" : undefined}
                    className="group block w-full text-left"
                  >
                    <div
                      className={`relative aspect-video overflow-hidden rounded-sm bg-ink ring-offset-2 transition-all ${
                        active ? "ring-2 ring-wine" : "ring-0"
                      }`}
                    >
                      <Image
                        src={m.thumbnail}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {!active && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-wine/85 transition-colors group-hover:bg-wine">
                            <svg
                              viewBox="0 0 24 24"
                              className="ml-0.5 h-5 w-5 fill-white"
                              aria-hidden="true"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.13em] text-wine">
                      {m.published}
                    </p>
                    <p
                      className={`mt-1.5 font-serif text-[18px] leading-snug transition-colors ${
                        active ? "text-wine" : "text-ink group-hover:text-wine"
                      }`}
                    >
                      {m.title}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
