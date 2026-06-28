import { cn } from "@/lib/utils";

export function Marquee({
  children,
  reverse = false,
  pauseOnHover = true,
  className = "",
  speed = "fast" // "fast" | "medium" | "slow"
}) {
  const speedDuration = {
    fast: "20s",
    medium: "40s",
    slow: "60s"
  }[speed];

  return (
    <div
      className={cn(
        "flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      style={{
        "--duration": speedDuration,
        "--gap": "1.5rem"
      }}
    >
      <div
        className={cn(
          "flex shrink-0 gap-[var(--gap)] min-w-full animate-marquee",
          reverse && "animate-marquee-reverse",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: "var(--duration)"
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 gap-[var(--gap)] min-w-full animate-marquee",
          reverse && "animate-marquee-reverse",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: "var(--duration)"
        }}
      >
        {children}
      </div>

    </div>
  );
}
export default Marquee;
