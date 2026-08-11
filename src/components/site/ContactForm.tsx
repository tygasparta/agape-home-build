import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Field } from "./Field";
import { buttonStyles } from "./Buttons";

const phoneRegex = /^[+]?[\d\s().-]{7,20}$/;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().min(1, "Please enter your email.").email("Please enter a valid email address.").max(255),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine((v) => v === "" || phoneRegex.test(v), "Please enter a valid phone number.")
    .optional(),
  subject: z.string().trim().min(2, "Please add a subject.").max(120),
  message: z.string().trim().min(10, "Please tell us a little more (10 characters minimum).").max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("loading");
    try {
      // Submission target placeholder — connect to a backend when available.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border bg-white p-8 sm:p-10" role="status" aria-live="polite">
        <CheckCircle2 className="size-7 text-secondary" aria-hidden="true" />
        <h3 className="mt-5 text-2xl">Message received</h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
          Thank you for reaching out to Agape Home Assisted Living. Our team will review your message
          and contact you.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className={`${buttonStyles.outline} mt-7`}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="border border-border bg-white p-6 sm:p-10">
      <h2 className="text-2xl">Send a Message</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Name" required error={errors.name}>
          {({ id, describedBy, invalid, className }) => (
            <input id={id} name="name" type="text" autoComplete="name" maxLength={100} aria-invalid={invalid} aria-describedby={describedBy} className={className} />
          )}
        </Field>
        <Field label="Email" required error={errors.email}>
          {({ id, describedBy, invalid, className }) => (
            <input id={id} name="email" type="email" autoComplete="email" maxLength={255} aria-invalid={invalid} aria-describedby={describedBy} className={className} />
          )}
        </Field>
        <Field label="Phone" error={errors.phone}>
          {({ id, describedBy, invalid, className }) => (
            <input id={id} name="phone" type="tel" autoComplete="tel" maxLength={20} aria-invalid={invalid} aria-describedby={describedBy} className={className} />
          )}
        </Field>
        <Field label="Subject" required error={errors.subject}>
          {({ id, describedBy, invalid, className }) => (
            <input id={id} name="subject" type="text" maxLength={120} aria-invalid={invalid} aria-describedby={describedBy} className={className} />
          )}
        </Field>
        <div className="sm:col-span-2">
          <Field label="Message" required error={errors.message}>
            {({ id, describedBy, invalid, className }) => (
              <textarea id={id} name="message" rows={6} maxLength={1000} aria-invalid={invalid} aria-describedby={describedBy} className={className} />
            )}
          </Field>
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-6 border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          We couldn't send your message. Please try again, or email us directly.
        </p>
      ) : null}

      <button type="submit" disabled={status === "loading"} className={`${buttonStyles.primary} mt-8 w-full sm:w-auto`}>
        {status === "loading" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
