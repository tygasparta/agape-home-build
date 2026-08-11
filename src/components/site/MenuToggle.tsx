import type { ComponentProps } from "react";

/**
 * Bespoke menu toggle.
 *
 * Three bars where the middle one is short and gold — the same accent used for
 * nav underlines and section rules, so the control reads as part of the brand
 * rather than a stock icon. On open the outer bars cross into an X and the gold
 * bar retracts to nothing.
 *
 * The word "Menu"/"Close" is deliberate: a bare hamburger is a known
 * comprehension problem, and a large share of this audience is older.
 */
export function MenuToggle({
  open,
  onClick,
  tone = "brand",
  ...props
}: {
  open: boolean;
  onClick: () => void;
  tone?: "brand" | "light";
} & Omit<ComponentProps<"button">, "onClick">) {
  const color = tone === "light" ? "text-white" : "text-primary";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className={`group inline-flex min-h-11 items-center gap-2.5 px-1 ${color} lg:hidden`}
      {...props}
    >
      <span aria-hidden="true" className="relative block h-3.5 w-6">
        <span
          className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ease-soft ${
            open ? "top-1.5 rotate-45" : "top-0 rotate-0"
          }`}
        />
        <span
          className={`absolute top-1.5 left-0 block h-0.5 bg-gold transition-all duration-300 ease-soft ${
            open ? "w-0 opacity-0" : "w-3/5 opacity-100 group-hover:w-full"
          }`}
        />
        <span
          className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ease-soft ${
            open ? "top-1.5 -rotate-45" : "top-3 rotate-0"
          }`}
        />
      </span>
      <span className="text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
        {open ? "Close" : "Menu"}
      </span>
    </button>
  );
}
