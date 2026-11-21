"use client";

import { mediumBlogsData, youtubeVideosData } from "@/lib/data/certifications";
import { useFeed } from "@/lib/hooks/useFeed";
import { profile } from "@/lib/data/portfolio";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import { useLocale } from "@/lib/i18n/LocaleProvider";

// Prefer the locally saved cover for posts we already know about.
const localCover = Object.fromEntries(mediumBlogsData.map((p) => [p.link, p.image]));

function Article({ post, featured }) {
  const { t } = useLocale();
  const cover = localCover[post.link] || post.image;
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor={t("cursor.read")}
      data-fade
      className={`group flex flex-col overflow-hidden rounded-[24px] border border-rule bg-surface ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <span className="relative block aspect-video overflow-hidden bg-canvas">
        {cover ? (
          <img
            src={cover}
            alt=""
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <span className="grid h-full place-items-center bg-chalk text-[40px] font-semibold tracking-[-0.04em] text-chalk-ink">
            {post.category}
          </span>
        )}
        <span className="t-sm absolute left-3 top-3 rounded-full bg-surface/90 px-3 py-1 backdrop-blur">{post.category}</span>
      </span>
      <span className="flex flex-1 flex-col p-5 sm:p-6">
        <span className={`font-semibold leading-snug tracking-[-0.02em] ${featured ? "text-[clamp(22px,2.2vw,30px)]" : "text-[18px]"}`}>
          {post.title}
        </span>
        {featured && <span className="mt-3 text-ink-2">{post.description}</span>}
        <span className="t-sm mt-auto flex items-center justify-between pt-4 text-ink-2">
          {[post.date, post.readTime].filter(Boolean).join(", ")}
          <FiArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </span>
    </a>
  );
}

export function Writing() {
  const { data: posts } = useFeed("/api/feeds/medium", "posts", mediumBlogsData);
  const { data: videos } = useFeed("/api/feeds/youtube", "videos", youtubeVideosData);
  const { t } = useLocale();

  return (
    <section id="writing" className="border-t border-rule">
      <div className="mx-auto max-w-[1248px] px-4 py-24 sm:px-6 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 data-split className="t-h1">
            {t("writing.title")}
          </h2>
          <a href={profile.links.medium} target="_blank" rel="noopener noreferrer" data-magnetic className="inline-flex h-11 items-center gap-1.5 rounded-full border border-rule px-5 font-medium">
            {t("writing.all")} <FiArrowUpRight aria-hidden className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.slice(0, 5).map((p, i) => (
            <Article key={p.link} post={p} featured={i === 0} />
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-6">
          <h3 className="t-h2">{t("writing.youtube")}</h3>
          <a href={profile.links.youtube} target="_blank" rel="noopener noreferrer" className="link font-medium">
            {t("writing.channel")}
          </a>
        </div>
        <ul className="hide-scrollbar mt-8 flex snap-x gap-5 overflow-x-auto pb-2">
          {videos.slice(0, 8).map((v) => (
            <li key={v.link} className="w-[300px] shrink-0 snap-start">
              <a href={v.link} target="_blank" rel="noopener noreferrer" data-cursor={t("cursor.play")} className="group block">
                <span className="relative block aspect-video overflow-hidden rounded-[18px] bg-surface">
                  <img src={v.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  <span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors group-hover:bg-black/25">
                    <span className="grid h-12 w-12 scale-90 place-items-center rounded-full bg-white/90 text-black opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                      <FiPlay aria-hidden className="ml-0.5 h-5 w-5" />
                    </span>
                  </span>
                </span>
                <span className="mt-3 block font-medium leading-snug">{v.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
