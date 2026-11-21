"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { profile, skills } from "@/lib/data/portfolio";
import { recruiterBriefData } from "@/lib/data/certifications";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const WHATSAPP = `https://wa.me/${recruiterBriefData.phone.replace(/[^\d]/g, "")}`;
const EMPTY = { name: "", email: "", message: "", company: "" };
const MARQUEE = skills.flatMap((s) => s.items.split(", ")).slice(0, 22);

// Locale-aware clock for India.

function useIndiaTime(locale) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString(locale === "ta" ? "ta-IN" : "en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" });
    const tick = () => setTime(fmt());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [locale]);
  return time;
}

function ContactDialog({ dialogRef }) {
  const { t } = useLocale();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const viaWeb3Forms = async () => {
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!key) return false;
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `Portfolio contact from ${form.name}`,
        from_name: "Gowtham Portfolio",
        name: form.name,
        email: form.email,
        message: form.message,
        replyto: form.email,
        botcheck: form.company,
      }),
    });
    const data = await res.json().catch(() => ({}));
    return res.ok && data.success;
  };
  const viaServer = async () => {
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json().catch(() => ({}));
    return data.ok === true;
  };
  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending" || form.company) return;
    setStatus("sending");
    for (const send of [viaWeb3Forms, viaServer]) {
      try {
        if (await send()) {
          setStatus("sent");
          setForm(EMPTY);
          return;
        }
      } catch {
        /* try the next route */
      }
    }
    setStatus("error");
    const subject = encodeURIComponent(`Hello from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const field = "mt-2 w-full rounded-[12px] border border-rule bg-canvas px-4 py-3 text-ink outline-none transition-colors focus:border-chalk";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="contact-dialog-title"
      className="m-auto w-[min(560px,calc(100vw-24px))] rounded-[28px] border border-rule bg-surface p-0 text-ink backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
    >
      <form onSubmit={submit} className="space-y-5 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="contact-dialog-title" className="t-h2">
            {t("form.title")}
          </h2>
          <button type="button" onClick={() => dialogRef.current.close()} aria-label={t("form.close")} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-rule">
            <FiX className="h-5 w-5" />
          </button>
        </div>
        <label className="block font-medium">
          {t("form.name")}
          <input required value={form.name} onChange={set("name")} autoComplete="name" className={field} />
        </label>
        <label className="block font-medium">
          {t("form.email")}
          <input required type="email" value={form.email} onChange={set("email")} autoComplete="email" className={field} />
        </label>
        <label className="block font-medium">
          {t("form.message")}
          <textarea required rows={5} value={form.message} onChange={set("message")} className={`${field} resize-y`} />
        </label>
        <input type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={set("company")} className="hidden" aria-hidden />
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={status === "sending"} className="inline-flex h-12 items-center rounded-full bg-ink px-6 font-medium text-canvas disabled:opacity-60">
            {status === "sending" ? t("form.sending") : t("form.send")}
          </button>
          <p aria-live="polite" className="t-sm text-ink-2">
            {status === "sent" && t("form.sent")}
            {status === "error" && t("form.error")}
          </p>
        </div>
      </form>
    </dialog>
  );
}

export function Footer() {
  const dialogRef = useRef(null);
  const { t, locale } = useLocale();

  // Chalky's "Send him a message" opens this dialog from anywhere on the page.
  useEffect(() => {
    const open = () => dialogRef.current?.showModal();
    window.addEventListener("open-contact", open);
    return () => window.removeEventListener("open-contact", open);
  }, []);
  const time = useIndiaTime(locale);

  return (
    <footer id="contact" className="relative overflow-hidden bg-band text-band-ink">
      <div className="mx-auto max-w-[1248px] px-4 pb-10 pt-28 sm:px-6 sm:pt-36">
        <div className="flex items-center gap-5">
          <img src={profile.photo} alt="" width={88} height={88} className="h-16 w-16 rounded-full object-cover sm:h-[88px] sm:w-[88px]" />
          <h2 data-split className="text-[clamp(48px,8.5vw,128px)] font-semibold leading-[0.92] tracking-[-0.055em]">
            {t("footer.title")}
          </h2>
        </div>

        <div className="relative mt-16 border-t border-band-rule">
          <button
            type="button"
            data-magnetic
            data-cursor={t("cursor.write")}
            onClick={() => dialogRef.current?.showModal()}
            className="absolute right-4 top-0 grid h-[150px] w-[150px] -translate-y-1/2 place-items-center rounded-full bg-chalk text-[17px] font-semibold text-chalk-ink sm:right-[12%] sm:h-[180px] sm:w-[180px]"
          >
            {t("footer.cta")}
          </button>
        </div>

        <div className="mt-28 flex flex-wrap gap-3 sm:mt-20">
          <a href={`mailto:${profile.email}`} data-magnetic className="inline-flex h-14 items-center rounded-full border border-band-rule px-6 text-[17px] font-medium transition-colors hover:border-band-ink">
            {profile.email}
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" data-magnetic className="inline-flex h-14 items-center rounded-full border border-band-rule px-6 text-[17px] font-medium transition-colors hover:border-band-ink">
            {t("footer.whatsapp")}
          </a>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" data-magnetic className="inline-flex h-14 items-center rounded-full border border-band-rule px-6 text-[17px] font-medium transition-colors hover:border-band-ink">
            {t("footer.resume")}
          </a>
        </div>
      </div>

      <div className="overflow-hidden border-y border-band-rule py-5" aria-hidden>
        <div className="footer-marquee flex w-max gap-8 whitespace-nowrap text-[clamp(22px,2.6vw,36px)] font-semibold tracking-[-0.03em]">
          {[...MARQUEE, ...MARQUEE].map((s, i) => (
            <span key={i} className={i % 2 ? "text-band-ink-2" : ""}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1248px] gap-8 px-4 py-10 sm:grid-cols-[1fr_1fr_auto] sm:px-6">
        <div>
          <p className="t-sm text-band-ink-2">{t("footer.time")}</p>
          <p className="mt-1 font-medium tabular-nums">{time ? `${time}, ${t("footer.india")}` : t("footer.india")}</p>
        </div>
        <div>
          <p className="t-sm text-band-ink-2">{t("footer.status")}</p>
          <p className="mt-1 flex items-center gap-2 font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chalk opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-chalk" />
            </span>
            {t("footer.statusText")}
          </p>
        </div>
        <div>
          <p className="t-sm text-band-ink-2">{t("footer.elsewhere")}</p>
          <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-1 font-medium">
            {[
              ["GitHub", profile.links.github],
              ["LinkedIn", profile.links.linkedin],
              ["YouTube", profile.links.youtube],
              ["Medium", profile.links.medium],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
                  {label} <FiArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1248px] flex-wrap justify-between gap-4 px-4 pb-8 text-[13px] text-band-ink-2 sm:px-6">
        <p>© {new Date().getFullYear()} Gowtham J. {t("footer.built")}</p>
        <p className="flex gap-5">
          <a href="/react-interview-handbook" className="hover:text-band-ink">{t("footer.handbook")}</a>
          <a href="/privacy" className="hover:text-band-ink">{t("footer.privacy")}</a>
          <a href="#top" className="hover:text-band-ink">{t("footer.top")}</a>
        </p>
      </div>
      <ContactDialog dialogRef={dialogRef} />
    </footer>
  );
}
