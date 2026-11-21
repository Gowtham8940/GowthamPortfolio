"use client";

import { useLayoutEffect, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { aira, profile } from "@/lib/data/portfolio";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { PhoneFrame, BrowserFrame } from "@/components/motion/Devices";

const H = 46;
const LANE_X = 430;
const GAP = 22;
const EXIT_X = 930;
const MID = 207;
const LANE_Y = [40, 135, 230, 325];

// Labels are measured after render and squeezed to fit their box, so longer
// translations (Tamil runs wider than English) never spill out.
function Label({ x, y, w, t, strong }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    el.removeAttribute("textLength");
    el.removeAttribute("lengthAdjust");
    const max = w - 18;
    if (el.getComputedTextLength() > max) {
      el.setAttribute("textLength", String(max));
      el.setAttribute("lengthAdjust", "spacingAndGlyphs");
    }
  }, [t, w]);
  return (
    <text ref={ref} x={x + w / 2} y={y + H / 2 + 5} textAnchor="middle" fontSize="15" fontWeight={strong ? 600 : 500} fill={strong ? "#0e1210" : "var(--band-ink)"}>
      {t}
    </text>
  );
}

function Node({ x, y, w, t, strong, wide }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={H} rx={12} fill={strong ? "var(--band-glow)" : "var(--band-node)"} stroke={strong ? "none" : "var(--band-rule)"} strokeDasharray={wide ? "5 5" : undefined} />
      <Label x={x} y={y} w={w} t={t} strong={strong} />
    </g>
  );
}

// Flowing dashes on every edge show requests moving through the graph.
function Edge({ d, glow }) {
  return (
    <g>
      <path d={d} stroke="var(--band-rule)" strokeWidth="1.5" fill="none" />
      <path d={d} className="flow-edge" stroke={glow ? "var(--band-glow)" : "rgb(76 195 138 / 0.65)"} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Flow() {
  const { t, tx } = useLocale();
  return (
    <svg viewBox="0 0 1130 400" className="h-auto w-full" role="img" aria-labelledby="aira-flow-title">
      <title id="aira-flow-title">{t("aira.flowTitle")}</title>
      <Node x={10} y={MID - H / 2} w={150} t={t("aira.request")} strong />
      <Edge d={`M160 ${MID} H 204`} />
      <Node x={204} y={MID - H / 2} w={170} t={t("aira.classifier")} strong />
      {aira.lanes.map((lane, li) => {
        const y = LANE_Y[li];
        const cy = y + H / 2;
        let x = LANE_X;
        const parts = [];
        lane.nodes.forEach((n, i) => {
          parts.push(<Node key={`n${i}`} x={x} y={y} w={n.w} t={tx(n.t)} wide={n.wide} />);
          if (i < lane.nodes.length - 1) parts.push(<Edge key={`e${i}`} d={`M${x + n.w} ${cy} H ${x + n.w + GAP}`} />);
          x += n.w + GAP;
        });
        const end = x - GAP;
        return (
          <g key={lane.id}>
            <text x={LANE_X} y={y - 9} fontSize="13" fill="var(--band-ink-2)">
              {tx(lane.label)}
            </text>
            <Edge d={`M374 ${MID} C 405 ${MID}, 400 ${cy}, ${LANE_X} ${cy}`} />
            {parts}
            {lane.loop && (
              <Edge glow d={`M${LANE_X + 104 + GAP + 92 + GAP + 46} ${y + H} C ${LANE_X + 300} ${y + H + 22}, ${LANE_X + 52} ${y + H + 22}, ${LANE_X + 52} ${y + H}`} />
            )}
            <Edge d={`M${end} ${cy} C ${EXIT_X - 30} ${cy}, ${EXIT_X - 30} ${MID}, ${EXIT_X} ${MID}`} />
          </g>
        );
      })}
      <Node x={EXIT_X} y={MID - H / 2} w={190} t={t("aira.validate")} strong />
    </svg>
  );
}

export function Aira() {
  const { t, tx } = useLocale();

  return (
    <section id="ai" className="relative overflow-hidden bg-band text-band-ink">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-band-glow/20 blur-[120px]" />
      <div className="relative mx-auto max-w-[1248px] px-4 py-24 sm:px-6 sm:py-32">
        {/* Intro + live product */}
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="t-sm text-band-glow">{t("aira.label")}</p>
            <h2 data-split className="mt-3 text-[clamp(40px,5.4vw,76px)] font-semibold leading-[1.02] tracking-[-0.05em]">
              {t("aira.title")}
            </h2>
            <p data-fade className="t-lg mt-6 max-w-[34rem] text-band-ink-2">
              {t("aira.intro")}
            </p>
            <a
              href={profile.links.aira}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-band-glow px-6 py-3 font-semibold text-[#0e1210]"
            >
              {t("aira.cta")}
              <FiArrowUpRight aria-hidden className="h-4 w-4 shrink-0" />
            </a>
          </div>
          <div className="relative pb-8 pr-[18%]" data-fade>
            <BrowserFrame src="/images/work/aira.jpg" alt="ekhool.com/aira" url="ekhool.com/aira" />
            <div className="absolute bottom-0 right-0 w-[32%] max-w-[210px]">
              <PhoneFrame src="/images/work/aira-mobile-full.jpg" alt="Aira on a phone" />
            </div>
          </div>
        </div>

        {/* What I build */}
        <h3 className="t-h2 mt-28">{t("aira.mine")}</h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aira.mine.map((m) => (
            <div key={m.title.en} data-fade className="rounded-[24px] border border-band-rule bg-white/[0.03] p-6">
              <h4 className="t-h3">{tx(m.title)}</h4>
              <p className="mt-3 text-band-ink-2">{tx(m.body)}</p>
            </div>
          ))}
        </div>

        {/* Orchestration diagram */}
        <figure className="mt-20 rounded-[28px] border border-band-rule p-5 sm:p-8">
          <h3 className="t-h3">{t("aira.flowTitle")}</h3>
          <div className="mt-6 hidden md:block">
            <Flow />
          </div>
          <ol className="mt-6 space-y-4 md:hidden">
            <li className="font-semibold">
              {t("aira.request")} → {t("aira.classifier")}. {t("aira.pickLane")}
            </li>
            {aira.lanes.map((l) => (
              <li key={l.id} className="border-l-2 border-band-glow pl-4">
                <span className="block font-semibold">{tx(l.label)}</span>
                <span className="text-band-ink-2">{l.nodes.map((n) => tx(n.t)).join(" → ")}</span>
              </li>
            ))}
            <li className="font-semibold">{t("aira.validate")}</li>
          </ol>
          <figcaption className="t-sm mt-6 border-t border-band-rule pt-4 text-band-ink-2">{t("aira.flowCaption")}</figcaption>
        </figure>

        {/* Agent builder: a real sequence */}
        <h3 className="t-h2 mt-20">{t("aira.builderTitle")}</h3>
        <ol className="mt-8 grid gap-px overflow-hidden rounded-[24px] border border-band-rule bg-band-rule sm:grid-cols-2 lg:grid-cols-3">
          {aira.builder.map((b, i) => (
            <li key={b.title.en} data-fade className="bg-band p-6">
              <span className="t-sm tabular-nums text-band-glow">0{i + 1}</span>
              <h4 className="t-h3 mt-2">{tx(b.title)}</h4>
              <p className="mt-2 text-band-ink-2">{tx(b.body)}</p>
            </li>
          ))}
        </ol>

        {/* Models + LMS agents */}
        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          <div className="min-w-0">
            <h3 className="t-h2">{t("aira.modelsTitle")}</h3>
            <p className="mt-3 max-w-[34rem] text-band-ink-2">{t("aira.modelsBody")}</p>
            <div className="mt-6 overflow-hidden" aria-hidden>
              <div className="model-marquee flex w-max gap-3">
                {[...aira.models, ...aira.models].map((m, i) => (
                  <span key={i} className="whitespace-nowrap rounded-full border border-band-rule px-4 py-2 font-medium">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <p className="sr-only">{aira.models.join(", ")}</p>
          </div>
          <div>
            <h3 className="t-h2">{t("aira.lmsTitle")}</h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {aira.lmsAgents.map((a) => (
                <li key={a.en} className="rounded-full bg-band-glow/15 px-4 py-2 font-medium text-band-ink">
                  {tx(a)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
