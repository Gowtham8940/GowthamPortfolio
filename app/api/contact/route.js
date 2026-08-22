import { NextResponse } from "next/server";

/**
 * Contact relay -> Web3Forms.
 *
 * The Web3Forms access key lives in `WEB3FORMS_ACCESS_KEY` (server-only env),
 * so it is never shipped to the browser. Get a free key at
 * https://web3forms.com (it is emailed to gowthamjaganthan@gmail.com) and add:
 *
 *   WEB3FORMS_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 *
 * to `.env.local`. Until then this route returns `configured:false` and the UI
 * falls back to a mailto link automatically.
 */
export async function POST(request) {
  const key = process.env.WEB3FORMS_ACCESS_KEY;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const message = (body.message || "").toString().trim();
  const company = (body.company || "").toString().trim(); // honeypot

  // Bots love to fill hidden fields — silently accept and drop.
  if (company) return NextResponse.json({ ok: true, dropped: true });

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Please fill in every field." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "That email address looks invalid." }, { status: 400 });
  }

  if (!key) {
    return NextResponse.json(
      { ok: false, configured: false, error: "Email service not configured yet." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `Portfolio contact from ${name}`,
        from_name: "Gowtham Portfolio",
        name,
        email,
        message,
        replyto: email,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      return NextResponse.json(
        { ok: false, error: data.message || "Message service rejected the request." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Network error sending message." }, { status: 502 });
  }
}
