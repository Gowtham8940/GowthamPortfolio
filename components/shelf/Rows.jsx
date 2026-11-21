"use client";

import { experience, skills, education, profile } from "@/lib/data/portfolio";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Experience() {
  const { t, tx } = useLocale();
  return (
    <section id="experience" className="border-t border-rule">
      <div className="mx-auto max-w-[1248px] px-4 py-24 sm:px-6 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 data-split className="t-h1">{t("exp.title")}</h2>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="link font-medium">
            {t("exp.resume")}
          </a>
        </div>
        <ol className="mt-10">
          {experience.map((job) => (
            <li key={job.company} data-fade className="grid gap-3 border-t border-rule py-8 md:grid-cols-[220px_1fr] md:gap-8">
              <p className="t-sm pt-1.5 text-ink-2">{tx(job.period)}</p>
              <div>
                <h3 className="t-h3">{job.company}</h3>
                <p className="text-ink-2">{tx(job.role)}</p>
                <ul className="mt-4 max-w-[68ch] space-y-2">
                  {job.points.map((p) => (
                    <li key={p.en} className="relative pl-5">
                      <span aria-hidden className="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-chalk" />
                      {tx(p)}
                    </li>
                  ))}
                </ul>
                <p className="t-sm mt-4 text-ink-2">{job.stack.join(", ")}</p>
              </div>
            </li>
          ))}
          <li className="grid gap-3 border-t border-rule py-8 md:grid-cols-[220px_1fr] md:gap-8">
            <p className="t-sm pt-1.5 text-ink-2">{t("exp.toolbox")}</p>
            <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {skills.map((s) => (
                <div key={s.group.en}>
                  <dt className="font-semibold">{tx(s.group)}</dt>
                  <dd className="text-ink-2">{s.items}</dd>
                </div>
              ))}
              <div>
                <dt className="font-semibold">{t("exp.education")}</dt>
                <dd className="text-ink-2">{tx(education)}</dd>
              </div>
            </dl>
          </li>
        </ol>
      </div>
    </section>
  );
}
