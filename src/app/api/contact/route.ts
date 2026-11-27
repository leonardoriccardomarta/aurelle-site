import { site } from "@/config/site";
import { validateContact, type ContactFields } from "@/lib/contact";

/*
  POST /api/contact: sends the support form to the support mailbox through Resend's HTTP API.

  Environment (set in Vercel, never in the repository):
    RESEND_API_KEY   required. Without it the endpoint answers 503 and the form tells visitors to use the email address.
    CONTACT_FROM     sender, for example "Mirel support <support@aurelletheme.com>". The domain must be verified in Resend.
    CONTACT_TO       optional, defaults to the support address in src/config/site.ts.
    RESEND_API_URL   optional, only for tests (points the endpoint at a local mock).
*/

const MIN_FILL_MS = 2000; // a person needs more than two seconds to write a message; scripts do not
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const attempts = new Map<string, number[]>(); // best effort: each serverless instance keeps its own memory

const json = (body: Record<string, unknown>, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

function tooManyRequests(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  if (attempts.size > 500) for (const [key, times] of attempts) if (times.every((time) => now - time >= WINDOW_MS)) attempts.delete(key);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  // Same-origin only: the form posts from this site, nobody else's page should post here.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {
      // an unreadable origin (such as "null") is treated as foreign
    }
    if (originHost !== host) return json({ ok: false, message: "Not allowed." }, 403);
  }

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, message: "The message could not be read." }, 400);
  }
  const text = (key: string) => (typeof data[key] === "string" ? (data[key] as string) : "");

  // Spam traps: the hidden "website" field and a form submitted impossibly fast. Answer as if it worked.
  const elapsed = Number(data.elapsed);
  if (text("website") !== "" || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return json({ ok: true });

  const fields: ContactFields = { name: text("name"), email: text("email"), store: text("store"), topic: text("topic"), message: text("message") };
  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) return json({ ok: false, errors }, 400);

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (tooManyRequests(ip)) return json({ ok: false, message: "Too many messages. Please try again in a few minutes." }, 429);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json({ ok: false, message: "The form is not available right now." }, 503);

  const name = oneLine(fields.name);
  const email = oneLine(fields.email);
  const store = oneLine(fields.store);
  const body = [
    `New message from the ${site.theme} support form`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Store: ${store || "not given"}`,
    `Topic: ${fields.topic}`,
    "",
    "Message:",
    fields.message.trim(),
    "",
    `Sent from ${site.url}/support`,
  ].join("\n");

  try {
    const response = await fetch(process.env.RESEND_API_URL ?? "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? `${site.theme} support <${site.supportEmail}>`,
        to: [process.env.CONTACT_TO ?? site.supportEmail],
        reply_to: email, // answering the notification goes straight to the visitor
        subject: `[${site.theme} support] ${fields.topic}: ${name}`.slice(0, 200),
        text: body,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return json({ ok: false, message: "The message could not be sent right now." }, 502);
  } catch {
    return json({ ok: false, message: "The message could not be sent right now." }, 502);
  }

  return json({ ok: true });
}
