import { useId, type ReactNode } from "react";

// min-h-11 keeps the tap target at ~44px even though the padding is tight.
const fieldBase =
  "w-full min-h-11 border border-input bg-white px-3.5 py-2 text-sm text-ink transition-colors placeholder:text-muted-foreground/70 focus:border-secondary focus:outline-none aria-[invalid=true]:border-destructive";

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
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.8125rem] font-medium text-ink">
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
