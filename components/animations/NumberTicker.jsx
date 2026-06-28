"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export function NumberTicker({ value, suffix = "", prefix = "", decimals = 0, duration = 2.5 }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Extract number from string if needed (e.g. "3.6" -> 3.6, "10" -> 10)
  const numericValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) : value;
  const isFloat = typeof value === "string" && value.includes(".") || (typeof value === "number" && !Number.isInteger(value));

  return (
    <span ref={ref} className="inline-block font-mono">
      {inView ? (
        <CountUp
          start={0}
          end={numericValue}
          duration={duration}
          decimals={decimals || (isFloat ? 1 : 0)}
          prefix={prefix}
          suffix={suffix}
        />
      ) : (
        <span>0{suffix}</span>
      )}
    </span>
  );
}
export default NumberTicker;
