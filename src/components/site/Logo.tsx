import { Link } from "@tanstack/react-router";

/**
 * Brand lockup.
 *
 * TO USE THE OFFICIAL LOGO FILE: drop it in `src/assets/agape-logo.png`, then
 * replace the <span> lockup below with:
 *   import logo from "@/assets/agape-logo.png";
 *   <img src={logo} alt="Agape Home Assisted Living" className="h-11 w-auto" />
 * Nothing else needs to change.
 */
export function Logo({
  className = "",
  tone = "brand",
}: {
  className?: string;
  tone?: "brand" | "light";
}) {
  const primary = tone === "light" ? "text-white" : "text-primary";
  const sub = tone === "light" ? "text-white/70" : "text-muted-foreground";

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Agape Home Assisted Living — home"
    >
      <span
        aria-hidden="true"
        className={`flex h-10 w-10 shrink-0 items-center justify-center border ${
          tone === "light" ? "border-white/30" : "border-primary/25"
        }`}
      >
        <span className={`font-serif text-lg leading-none ${primary}`}>A</span>
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`font-serif text-[1.0625rem] tracking-tight ${primary}`}>Agape Home</span>
        <span className={`text-[0.625rem] font-medium tracking-[0.16em] uppercase ${sub}`}>
          Assisted Living
        </span>
      </span>
    </Link>
  );
}
