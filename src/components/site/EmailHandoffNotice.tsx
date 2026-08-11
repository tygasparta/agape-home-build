import { useState } from "react";
import { MailOpen, Copy, Check, Phone } from "lucide-react";
import { buttonStyles } from "./Buttons";
import { SITE, telHref } from "@/lib/site";

/**
 * Shown after a form hands off to the visitor's mail app.
 *
 * Deliberately does not say "we received your message": with mailto: the
 * enquiry only exists once the visitor presses Send in their own mail client,
 * and we get no confirmation. Claiming receipt here would be a lie that costs
 * a family a callback. The copy button and phone numbers are the fallback for
 * anyone with no mail app configured.
 */
export function EmailHandoffNotice({
  body,
  onReset,
  resetLabel,
}: {
  body: string;
  onReset: () => void;
  resetLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`To: ${SITE.email}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="border border-border bg-white p-6 sm:p-8" role="status" aria-live="polite">
      <MailOpen className="size-6 text-secondary" aria-hidden="true" />
      <h3 className="mt-4 text-xl">Your email app should have opened</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
        Your details have been put into a new message addressed to us.{" "}
        <strong className="font-medium text-ink">
          Press send in your email app to finish — we won't receive anything until you do.
        </strong>
      </p>

      <div className="mt-6 border-t border-border pt-5">
        <p className="text-sm font-medium text-ink">Nothing opened?</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Copy your message and email it to{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="break-all text-primary underline underline-offset-4"
          >
            {SITE.email}
          </a>
          , or call us and we'll take the details over the phone.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={copy} className={buttonStyles.outline}>
            {copied ? (
              <Check className="size-4" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy my message"}
          </button>
          {SITE.phones.map((number) => (
            <a key={number} href={telHref(number)} className={buttonStyles.outline}>
              <Phone className="size-4" aria-hidden="true" />
              {number}
            </a>
          ))}
        </div>
      </div>

      <button type="button" onClick={onReset} className={`${buttonStyles.primary} mt-6`}>
        {resetLabel}
      </button>
    </div>
  );
}
