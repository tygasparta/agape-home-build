import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

const variants = {
  rise: "reveal",
  settle: "reveal-settle",
  fade: "reveal-fade",
} as const;

/**
 * Scroll-triggered entrance. Use for anything below the fold.
 *
 * For above-the-fold content use <Rise> instead — this one can't animate until
 * React has hydrated, which shows as a beat of stillness on first paint.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "rise",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${variants[variant]} ${shown ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

const enters = {
  rise: "enter-rise",
  settle: "enter-settle",
  fade: "enter-fade",
} as const;

/**
 * Mount entrance for above-the-fold content — a pure CSS animation, so it runs
 * on first paint with no dependency on hydration and no flash of hidden text.
 */
export function Rise({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "rise",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: keyof typeof enters;
  className?: string;
}) {
  return (
    <Tag
      style={{ animationDelay: `${delay}ms` } as CSSProperties}
      className={`${enters[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
