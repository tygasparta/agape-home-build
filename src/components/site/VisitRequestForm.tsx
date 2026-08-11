import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Field } from "./Field";
import { EmailHandoffNotice } from "./EmailHandoffNotice";
import { submitByEmail } from "@/lib/mailto";
import { SITE } from "@/lib/site";
import { buttonStyles } from "./Buttons";

const phoneRegex = /^[+]?[\d\s().-]{7,20}$/;

export const visitSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number.")
    .max(20)
    .regex(phoneRegex, "Please enter a valid phone number."),
  email: z.string().trim().min(1, "Please enter your email.").email("Please enter a valid email address.").max(255),
  date: z.string().trim().min(1, "Please choose a preferred date."),
  time: z.string().trim().min(1, "Please choose a preferred time."),
  relationship: z.string().trim().min(2, "Please tell us your relationship to the resident.").max(100),
  message: z.string().trim().max(1000, "Please keep your message under 1000 characters.").optional(),
});

type Errors = Partial<Record<keyof z.infer<typeof visitSchema>, string>>;

export function VisitRequestForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "handed-off">("idle");
  const [handoffBody, setHandoffBody] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = visitSchema.safeParse(data);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("idle");
      return;
    }

    setErrors({});
    const v = parsed.data;
    const { body } = submitByEmail(`Visit request — ${v.fullName}`, [
      { label: "Name", value: v.fullName },
      { label: "Phone", value: v.phone },
      { label: "Email", value: v.email },
      { label: "Relationship to resident", value: v.relationship },
      { label: "Preferred date", value: v.date },
      { label: "Preferred time", value: v.time },
      { label: "Message", value: v.message ?? "" },
    ]);
    setHandoffBody(body);
    setStatus("handed-off");
    form.reset();
  }

  if (status === "handed-off") {
    return (
      <EmailHandoffNotice
        body={handoffBody}
        onReset={() => setStatus("idle")}
        resetLabel="Start another request"
      />
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="border border-border bg-white p-5 sm:p-7">
      <h3 className="text-xl">Schedule a Visit</h3>
      <p className="mt-1.5 text-[0.8125rem] text-muted-foreground">
        Share a few details and we'll follow up about arranging a time to visit.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" required error={errors.fullName}>
          {({ id, describedBy, invalid, className }) => (
            <input
              id={id}
              name="fullName"
              type="text"
              autoComplete="name"
              maxLength={100}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={className}
            />
          )}
        </Field>

        <Field label="Phone Number" required error={errors.phone}>
          {({ id, describedBy, invalid, className }) => (
            <input
              id={id}
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={20}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={className}
            />
          )}
        </Field>

        <Field label="Email" required error={errors.email}>
          {({ id, describedBy, invalid, className }) => (
            <input
              id={id}
              name="email"
              type="email"
              autoComplete="email"
              maxLength={255}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={className}
            />
          )}
        </Field>

        <Field label="Relationship to Resident" required error={errors.relationship}>
          {({ id, describedBy, invalid, className }) => (
            <input
              id={id}
              name="relationship"
              type="text"
              maxLength={100}
              placeholder="Daughter, son, case manager…"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={className}
            />
          )}
        </Field>

        <Field label="Preferred Date" required error={errors.date}>
          {({ id, describedBy, invalid, className }) => (
            <input
              id={id}
              name="date"
              type="date"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={className}
            />
          )}
        </Field>

        <Field label="Preferred Time" required error={errors.time}>
          {({ id, describedBy, invalid, className }) => (
            <input
              id={id}
              name="time"
              type="time"
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={className}
            />
          )}
        </Field>

        <div className="sm:col-span-2">
          <Field label="Message" error={errors.message}>
            {({ id, describedBy, invalid, className }) => (
              <textarea
                id={id}
                name="message"
                rows={3}
                maxLength={1000}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                className={className}
              />
            )}
          </Field>
        </div>
      </div>

      <button type="submit" className={`${buttonStyles.primary} mt-6 w-full sm:w-auto`}>
        Open Email to Send
      </button>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        This opens your email app with the details filled in — you'll need to press send there.
        Prefer to talk? Call {SITE.phone}.
      </p>
    </form>
  );
}
