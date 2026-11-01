import { useState } from "react";
import { X, Loader2, CheckCircle2, ChevronDown } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const CITIES = ["Jaipur", "Udaipur", "Ajmer", "Delhi", "Kota", "Jodhpur", "NCR", "Other"];
const SERVICE_OPTIONS = [
  "Software Engineering",
  "Cloud Architecture",
  "Hardware / IoT",
  "Network Infrastructure",
  "Student Training",
  "Internship",
];
const TIME_SLOTS = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM", "6:00 PM"];

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  services: [],
  preferredDate: "",
  preferredTime: "",
  message: "",
};

function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email.";
  if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) errors.phone = "Enter a valid phone number.";
  if (!form.city) errors.city = "Select your city.";
  if (form.services.length === 0) errors.services = "Pick at least one service.";
  if (!form.preferredDate) errors.preferredDate = "Choose a preferred date.";
  if (!form.preferredTime) errors.preferredTime = "Choose a time slot.";
  return errors;
}

export default function QuickContactModal({ open, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);

  if (!open) return null;

  const toggleService = (service) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm(EMPTY_FORM);
      setErrors({});
      setSubmitError(null);
      setSucceeded(false);
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundErrors = validate(form);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const { error } = await supabase.from("meetings").insert({
      full_name: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      city: form.city,
      services: form.services,
      preferred_date: form.preferredDate,
      preferred_time: form.preferredTime,
      message: form.message.trim() || null,
    });

    setIsSubmitting(false);

    if (error) {
      setSubmitError("Something went wrong on our end. Please try again.");
      return;
    }
    setSucceeded(true);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70" onClick={handleClose} />

      <div className="relative w-full sm:max-w-lg bg-paper border-2 border-graphite shadow-hard-lg rounded-t-none sm:rotate-0 max-h-[92vh] overflow-y-auto">
        <div className="sticky top-0 bg-paper flex items-center justify-between px-6 py-4 border-b-2 border-graphite">
          <div>
            <h3 className="font-hand text-2xl text-graphite">
              {succeeded ? "Request sent!" : "Schedule a Quick Chat"}
            </h3>
            {!succeeded && (
              <p className="text-sm font-note text-graphite/70">
                Tell us what you need — we'll confirm a slot within one business day.
              </p>
            )}
          </div>
          <button onClick={handleClose} aria-label="Close" className="p-2 -mr-2 text-graphite/60 hover:text-graphite">
            <X size={20} />
          </button>
        </div>

        {succeeded ? (
          <div className="px-6 py-10 flex flex-col items-center text-center gap-3">
            <CheckCircle2 size={48} className="text-ballpoint" />
            <p className="font-hand text-xl text-graphite">You're on the calendar.</p>
            <p className="text-sm font-note text-graphite/70 max-w-xs">
              We've logged your preferred slot for {form.preferredDate} at{" "}
              {form.preferredTime}. A confirmation email is on its way to{" "}
              {form.email}.
            </p>
            <button
              onClick={handleClose}
              className="mt-3 bg-ballpoint text-paper text-sm font-semibold px-6 py-2.5 border-2 border-graphite shadow-hard-sm hover:brightness-110 transition"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" error={errors.fullName}>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="paper-input"
                  placeholder="Jordan Singh"
                />
              </Field>
              <Field label="Phone Number" error={errors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="paper-input"
                  placeholder="+91 98765 43210"
                />
              </Field>
            </div>

            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="paper-input"
                placeholder="you@company.com"
              />
            </Field>

            <Field label="City" error={errors.city}>
              <div className="relative">
                <select
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="paper-input appearance-none pr-9"
                >
                  <option value="">Select a city</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite/50 pointer-events-none" />
              </div>
            </Field>

            <Field label="Services You're Interested In" error={errors.services}>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((service) => (
                  <label
                    key={service}
                    className={`flex items-center gap-2 border-2 px-3 py-2.5 text-sm font-note cursor-pointer transition-colors ${
                      form.services.includes(service)
                        ? "border-ballpoint bg-ballpoint/10 text-ballpoint"
                        : "border-graphite/20 text-graphite hover:border-graphite/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.services.includes(service)}
                      onChange={() => toggleService(service)}
                      className="accent-ballpoint"
                    />
                    {service}
                  </label>
                ))}
              </div>
            </Field>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Preferred Date" error={errors.preferredDate}>
                <input
                  type="date"
                  value={form.preferredDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                  className="paper-input"
                />
              </Field>
              <Field label="Preferred Time" error={errors.preferredTime}>
                <div className="relative">
                  <select
                    value={form.preferredTime}
                    onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                    className="paper-input appearance-none pr-9"
                  >
                    <option value="">Select a slot</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-graphite/50 pointer-events-none" />
                </div>
              </Field>
            </div>

            <Field label="Message (optional)">
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="paper-input resize-none"
                placeholder="Tell us about your project or what you'd like to learn."
              />
            </Field>

            {submitError && <p className="text-sm text-correction -mt-1">{submitError}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 flex items-center justify-center gap-2 bg-ballpoint text-paper text-sm font-semibold py-3 border-2 border-graphite shadow-hard-sm hover:brightness-110 transition disabled:opacity-60"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {isSubmitting ? "Submitting..." : "Confirm Meeting Request"}
            </button>
          </form>
        )}
      </div>

      <style>{`
        .paper-input {
          width: 100%;
          border: 2px solid rgba(45,45,45,0.2);
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
          font-family: 'Patrick Hand', cursive;
          color: #111111;
          background: #FFFFFF;
        }
        .paper-input:focus {
          outline: none;
          border-color: #0868E6;
        }
      `}</style>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-graphite/60 uppercase tracking-wide">
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-correction">{error}</span>}
    </label>
  );
}
