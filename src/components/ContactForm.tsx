import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { areasOfInterest } from "../data/siteContent";

type FormState = {
  name: string;
  organization: string;
  title: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  consent: boolean;
};

const initialState: FormState = {
  name: "",
  organization: "",
  title: "",
  email: "",
  phone: "",
  interest: areasOfInterest[0],
  message: "",
  consent: false,
};

type Status = "idle" | "loading" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses =
  "w-full border-0 border-b border-summit-graphite bg-transparent py-3 text-summit-ivory placeholder:text-summit-mute-dark focus:border-summit-gold focus:outline-none transition-colors";
const labelClasses = "text-xs uppercase tracking-[0.16em] text-summit-mute";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!emailPattern.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.message.trim()) next.message = "Please share a brief message.";
    if (!form.consent) next.consent = "Consent is required to submit this form.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start gap-4 border border-summit-gold/40 bg-summit-gold/5 px-8 py-12"
        role="status"
      >
        <CheckCircle2 className="h-8 w-8 text-summit-gold" aria-hidden="true" />
        <h3 className="font-serif text-2xl text-summit-ivory">Thank you.</h3>
        <p className="max-w-md text-sm leading-relaxed text-summit-mute">
          Your request has been received. A member of Summit Management Consultancy will follow up
          directly and in confidence.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClasses}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="organization" className={labelClasses}>
            Organization
          </label>
          <input
            id="organization"
            type="text"
            autoComplete="organization"
            value={form.organization}
            onChange={(e) => update("organization", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="title" className={labelClasses}>
            Position / Title
          </label>
          <input
            id="title"
            type="text"
            autoComplete="organization-title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClasses}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="interest" className={labelClasses}>
            Area of Interest
          </label>
          <select
            id="interest"
            value={form.interest}
            onChange={(e) => update("interest", e.target.value)}
            className={`${inputClasses} appearance-none`}
          >
            {areasOfInterest.map((opt) => (
              <option key={opt} value={opt} className="bg-summit-charcoal">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${inputClasses} resize-none`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-summit-mute">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-1 h-4 w-4 flex-none border border-summit-graphite bg-transparent accent-summit-gold"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I consent to Summit Management Consultancy processing the information provided in
            order to respond to this enquiry, in accordance with the practice&rsquo;s privacy
            practices.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-2 text-xs text-red-400">
            {errors.consent}
          </p>
        )}
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-3 border border-red-400/40 bg-red-400/5 px-5 py-4 text-sm text-red-300"
            role="alert"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
            <span>Something went wrong sending your request. Please try again, or reach out directly.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative inline-flex items-center gap-3 bg-summit-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-summit-black transition-colors duration-300 hover:bg-summit-gold-soft disabled:opacity-60"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "loading" ? "Sending" : "Request a Confidential Consultation"}
      </button>
    </form>
  );
}
