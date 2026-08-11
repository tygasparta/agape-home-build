import { useId, type ReactNode } from "react";

const fieldBase =
  "w-full border border-input bg-white px-4 py-3 text-[0.9375rem] text-ink transition-colors placeholder:text-muted-foreground/70 focus:border-secondary focus:outline-none aria-[invalid=true]:border-destructive";

export function Field({
  label,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  error?: string | undefined;
  required?: boolean | undefined;
  hint?: string | undefined;
  children: (props: {
    id: string;
    describedBy: string | undefined;
    invalid: boolean;
    className: string;
  }) => ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-muted-foreground" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>
        )}
      </label>
      {children({ id, describedBy, invalid: Boolean(error), className: fieldBase })}
      {hint ? (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
