"use client";

import React, { useState } from "react";
import { recruiterBriefData } from "@/lib/data/certifications";
import { FadeIn } from "../animations/FadeIn";
import { MagneticButton } from "../animations/MagneticButton";
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiPhoneCall,
  FiMapPin,
  FiCopy,
  FiCheck,
  FiSend,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import { SiMedium, SiWhatsapp } from "react-icons/si";

// Digits only, with country code — used for the wa.me deep link.
const WHATSAPP_NUMBER = recruiterBriefData.phone.replace(/[^\d]/g, "");
const WHATSAPP_MSG = encodeURIComponent(
  "Hi Gowtham, I found your portfolio and would love to connect about an opportunity."
);

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(recruiterBriefData.email);
    } catch {
      const el = document.createElement("textarea");
      el.value = recruiterBriefData.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "someone"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${recruiterBriefData.email}?subject=${subject}&body=${body}`;
  };

  const onSuccess = () => {
    setStatus("success");
    setForm({ name: "", email: "", message: "", company: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  // Primary path: submit straight to Web3Forms from the browser. This is the
  // method Web3Forms documents — the access key is public by design, and browser
  // requests pass its Cloudflare (server IPs get 403'd).
  const sendViaWeb3Forms = async () => {
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
        botcheck: form.company, // honeypot
      }),
    });
    const data = await res.json().catch(() => ({}));
    return res.ok && data.success;
  };

  // Fallback path: our server route (works where server outbound is allowed).
  const sendViaServer = async () => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json().catch(() => ({}));
    return data.ok === true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (form.company) return; // honeypot tripped — silently ignore bots
    setStatus("sending");
    setErrorMsg("");

    try {
      if (await sendViaWeb3Forms()) return onSuccess();
    } catch {
      /* fall through to server route */
    }

    try {
      if (await sendViaServer()) return onSuccess();
    } catch {
      /* fall through to mailto */
    }

    // Last resort: open the visitor's mail client with the message prefilled.
    setErrorMsg("Couldn't send automatically — opening your email app instead…");
    setStatus("error");
    mailtoFallback();
  };

  const detailCard =
    "flex items-center gap-3 px-5 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60";
  const fieldCls =
    "px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 text-sm text-neutral-900 dark:text-neutral-100 outline-none focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all";

  return (
    <section id="contact" className="py-14 sm:py-20 bg-neutral-50 dark:bg-neutral-950/20 transition-colors duration-300 relative">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <FadeIn delay={0.1} direction="up" className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Connect &amp; Collaborate</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3 max-w-xl mx-auto">
            Looking to hire or collaborate? Send me a message directly — it lands straight in my inbox — or reach me
            on WhatsApp and social profiles.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Message form */}
          <FadeIn delay={0.2} direction="up" className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black/40 backdrop-blur-sm flex flex-col gap-4"
            >
              {/* Honeypot (hidden from humans) */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={update("company")}
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-name" className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider">
                    Name
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Jane Recruiter"
                    className={fieldCls}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="c-email" className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider">
                    Email
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@company.com"
                    className={fieldCls}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-msg" className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider">
                  Message
                </label>
                <textarea
                  id="c-msg"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell me about the role, project, or idea…"
                  className={`${fieldCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <FiLoader className="w-4 h-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="flex items-center gap-2 text-sm font-semibold text-emerald-500">
                  <FiCheck className="w-4 h-4" /> Thanks! Your message is on its way to my inbox.
                </p>
              )}
              {status === "error" && (
                <p className="flex items-center gap-2 text-sm font-semibold text-red-500">
                  <FiAlertCircle className="w-4 h-4" /> {errorMsg}
                </p>
              )}
            </form>
          </FadeIn>

          {/* Channels + details */}
          <FadeIn delay={0.3} direction="up" className="lg:col-span-2 flex flex-col gap-4">
            {/* Primary channels */}
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold text-sm transition-colors"
              >
                <SiWhatsapp className="w-5 h-5" /> Message me on WhatsApp
              </a>
              <a
                href={recruiterBriefData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-400 font-semibold text-sm transition-colors"
              >
                <FiLinkedin className="w-5 h-5" /> Connect on LinkedIn
              </a>
              <a
                href={`tel:${recruiterBriefData.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold text-sm transition-colors"
              >
                <FiPhoneCall className="w-5 h-5 text-purple-500" /> Call {recruiterBriefData.phone}
              </a>
            </div>

            {/* Email copy row */}
            <div className={detailCard}>
              <span className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg text-purple-500 shrink-0">
                <FiMail className="w-4 h-4" />
              </span>
              <div className="text-left min-w-0 flex-1">
                <p className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">Email</p>
                <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">
                  {recruiterBriefData.email}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email"
                className="ml-1 p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all shrink-0"
              >
                {copied ? <FiCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FiCopy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Location row */}
            <div className={detailCard}>
              <span className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg text-emerald-500 shrink-0">
                <FiMapPin className="w-4 h-4" />
              </span>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 tracking-wider">Location</p>
                <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                  {recruiterBriefData.location}
                </p>
              </div>
            </div>

            {/* Secondary social badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              <MagneticButton range={25}>
                <a
                  href={recruiterBriefData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <FiGithub className="w-4 h-4" /> GitHub
                </a>
              </MagneticButton>
              <MagneticButton range={25}>
                <a
                  href="https://medium.com/@gowthamjaganthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <SiMedium className="w-4 h-4" /> Medium
                </a>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
export default Contact;
