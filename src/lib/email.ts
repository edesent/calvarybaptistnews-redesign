/**
 * Where website messages go.
 *
 * Two delivery routes, tried in order:
 *   1. SLACK_WEBHOOK_URL — posts the message into a Slack channel. This works
 *      the moment the webhook is set, with no domain verification.
 *   2. RESEND_API_KEY — emails CHURCH_INBOX. SENDER must be an address at a
 *      domain verified at https://resend.com/domains.
 *
 * If neither is configured the route reports a friendly error rather than
 * pretending the message was sent.
 */

export const CHURCH_INBOX = "office@calvarybaptistnews.com";
export const SENDER =
  "Calvary Baptist Website <website@calvarybaptistnews.com>";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type SendResult = { ok: true } | { ok: false; status: number; error: string };

async function sendToSlack(opts: {
  subject: string;
  text: string;
}): Promise<SendResult | null> {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return null;

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `*${opts.subject}*\n${opts.text}` }),
    });
    if (!response.ok) {
      console.error("Slack webhook failed:", response.status);
      return {
        ok: false,
        status: 502,
        error: "Sorry, the message couldn't be sent. Please try again.",
      };
    }
    return { ok: true };
  } catch (error) {
    console.error("Slack webhook error:", error);
    return {
      ok: false,
      status: 502,
      error: "Sorry, the message couldn't be sent. Please try again.",
    };
  }
}

async function sendByEmail(opts: {
  subject: string;
  replyTo?: string;
  text: string;
  html: string;
}): Promise<SendResult | null> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: SENDER,
        to: [CHURCH_INBOX],
        reply_to: opts.replyTo,
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
      }),
    });

    if (!response.ok) {
      console.error("Resend error:", response.status, await response.text());
      return {
        ok: false,
        status: 502,
        error: "Sorry, the message couldn't be sent. Please try again.",
      };
    }
    return { ok: true };
  } catch (error) {
    console.error("Resend request failed:", error);
    return {
      ok: false,
      status: 502,
      error: "Sorry, the message couldn't be sent. Please try again.",
    };
  }
}

/** Deliver a form submission by whichever channel is configured. */
export async function sendChurchMessage(opts: {
  subject: string;
  replyTo?: string;
  text: string;
  html: string;
}): Promise<SendResult> {
  const viaSlack = await sendToSlack(opts);
  if (viaSlack) return viaSlack;

  const viaEmail = await sendByEmail(opts);
  if (viaEmail) return viaEmail;

  console.error(
    "Neither SLACK_WEBHOOK_URL nor RESEND_API_KEY is set — the contact form has nowhere to deliver."
  );
  return {
    ok: false,
    status: 500,
    error:
      "The form isn't connected yet. Please call the church at (931) 815-3919.",
  };
}
