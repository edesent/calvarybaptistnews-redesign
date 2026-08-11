"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const SUBJECTS = [
  "I'd like to visit",
  "A question about the Bible or salvation",
  "Prayer request",
  "Joining the church",
  "School of the Bible",
  "Something else",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setError(
        "We couldn't reach the server. Please try again, or call the church."
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-sm border border-wine/25 bg-wine-pale p-10 text-center">
        <p className="font-serif text-[24px] leading-snug text-ink">
          Thank you for writing to us.
        </p>
        <p className="mt-4 text-[16px] leading-relaxed text-body">
          Your message is with the pastor, and someone will get back to you as
          soon as they can. If it is urgent, please call the church.
        </p>
      </div>
    );
  }

  const field =
    "mt-2 w-full rounded-sm border border-rule bg-paper px-4 py-3 text-[15.5px] text-ink outline-none transition-colors placeholder:text-faint focus:border-wine";
  const label =
    "text-[12px] font-semibold uppercase tracking-[0.13em] text-muted";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Your name <span className="text-wine">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={field}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
            placeholder="(931) 555-0100"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={label}>
          Email <span className="text-wine">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={field}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className={label}>
          What is this about?
        </label>
        <select id="subject" name="subject" className={field} defaultValue="">
          <option value="">Choose one — optional</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Your message <span className="text-wine">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${field} resize-y`}
          placeholder="How can we help?"
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-sm border border-wine/30 bg-wine-pale px-4 py-3 text-[14.5px] text-wine-deep"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-sm bg-wine px-8 py-3.5 text-[14.5px] font-semibold tracking-wide text-white transition-colors hover:bg-wine-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
        <p className="text-[13.5px] text-muted">
          We will not add you to any list.
        </p>
      </div>
    </form>
  );
}
