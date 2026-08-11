import { escapeHtml, sendChurchMessage } from "@/lib/email";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill this in; real visitors never see it. Pretend success.
  if (body.botcheck) {
    return Response.json({ success: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return Response.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json(
      { error: "That email address doesn't look right." },
      { status: 400 }
    );
  }

  const result = await sendChurchMessage({
    subject: `Website message from ${name}${subject ? ` — ${subject}` : ""}`,
    replyTo: email,
    text:
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "—"}\n` +
      `About: ${subject || "—"}\n\n` +
      `${message}\n`,
    html:
      `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
      `<p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>` +
      `<p><strong>About:</strong> ${escapeHtml(subject || "—")}</p>` +
      `<p><strong>Message:</strong></p>` +
      `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
  });

  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json({ success: true });
}
