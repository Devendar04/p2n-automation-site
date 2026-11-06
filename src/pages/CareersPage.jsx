import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Handshake,
  GraduationCap,
  Briefcase,
  Loader2,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingActions from "../components/FloatingActions";
import QuickContactModal from "../components/QuickContactModal";
import { supabase } from "../lib/supabaseClient";
import { CONTACT } from "../data/siteContent";

const TABS = [
  { key: "partner", label: "Become a Partner", icon: Handshake },
  { key: "internship", label: "Apply for Internship", icon: GraduationCap },
  { key: "job", label: "Apply for Job", icon: Briefcase },
];

const CITIES = ["Jaipur", "Udaipur", "Ajmer", "Delhi", "Kota", "Jodhpur", "NCR", "Other"];
const PARTNERSHIP_TYPES = ["Academic Institution", "Corporate Client", "Tech Vendor", "Research Partner"];
const INTERNSHIP_TRACKS = ["Software Development", "Embedded Systems & Hardware", "AI & Automation", "UI/UX Design"];
const JOB_ROLES = ["Senior Full-Stack Engineer", "Embedded IoT Developer", "Technical Lead", "Mentor"];

/* ---------- shared field primitives (paper style) ---------- */

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-graphite/60 uppercase tracking-wide">{label}</span>
      {children}
      {error && <span className="text-xs text-correction">{error}</span>}
    </label>
  );
}

function TextInput(props) {
  return <input {...props} className="career-input" />;
}
function TextArea(props) {
  return <textarea {...props} className="career-input resize-none" />;
}
function Select({ children, ...props }) {
  return (
    <select {...props} className="career-input">
      {children}
    </select>
  );
}

/* ---------- generic submit result state ---------- */

function useFormSubmit(table, mapToRow) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);

  const submit = async (form, validate) => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) return errs;

    setIsSubmitting(true);
    setError(null);
    const { error: dbError } = await supabase.from(table).insert(mapToRow(form));
    setIsSubmitting(false);

    if (dbError) {
      setError("Something went wrong on our end. Please try again.");
      return {};
    }
    setSucceeded(true);
    return {};
  };

  const reset = () => {
    setSucceeded(false);
    setError(null);
  };

  return { isSubmitting, error, succeeded, submit, reset };
}

/* ---------- A) Become a Partner ---------- */

const PARTNER_EMPTY = {
  orgName: "",
  contactPerson: "",
  email: "",
  phone: "",
  partnershipType: "",
  city: "",
  message: "",
};

function validatePartner(f) {
  const e = {};
  if (!f.orgName.trim()) e.orgName = "Enter your organization name.";
  if (!f.contactPerson.trim()) e.contactPerson = "Enter a contact person.";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email.";
  if (!/^[0-9+\-\s]{7,15}$/.test(f.phone)) e.phone = "Enter a valid phone number.";
  if (!f.partnershipType) e.partnershipType = "Select a partnership type.";
  if (!f.city) e.city = "Select your city.";
  return e;
}

function PartnerForm({ presetType = "" }) {
  const [form, setForm] = useState({ ...PARTNER_EMPTY, partnershipType: presetType });
  // "Hire Us" links can arrive while this form is already open — apply the preset then too
  useEffect(() => {
    if (presetType) setForm((f) => ({ ...f, partnershipType: presetType }));
  }, [presetType]);
  const [errors, setErrors] = useState({});
  const { isSubmitting, error, succeeded, submit, reset } = useFormSubmit(
    "partnership_inquiries",
    (f) => ({
      organization_name: f.orgName.trim(),
      contact_person: f.contactPerson.trim(),
      email: f.email.trim(),
      phone: f.phone.trim(),
      partnership_type: f.partnershipType,
      city: f.city,
      message: f.message.trim() || null,
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = await submit(form, validatePartner);
    setErrors(errs);
  };

  if (succeeded) {
    return (
      <SuccessPanel
        title="Pitch received."
        body="We review partnership requests weekly — expect a reply from our partnerships team within 5 business days."
        onReset={() => {
          reset();
          setForm(PARTNER_EMPTY);
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Organization / Company Name" error={errors.orgName}>
          <TextInput value={form.orgName} onChange={(e) => setForm({ ...form, orgName: e.target.value })} placeholder="Acme University" />
        </Field>
        <Field label="Contact Person" error={errors.contactPerson}>
          <TextInput value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} placeholder="Dr. Meera Joshi" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email" error={errors.email}>
          <TextInput type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@organization.com" />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <TextInput type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Partnership Type" error={errors.partnershipType}>
          <Select value={form.partnershipType} onChange={(e) => setForm({ ...form, partnershipType: e.target.value })}>
            <option value="">Select a type</option>
            {PARTNERSHIP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
        <Field label="City" error={errors.city}>
          <Select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
            <option value="">Select a city</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
        </Field>
      </div>
      <Field label="Message / Collaboration Pitch">
        <TextArea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you have in mind..." />
      </Field>
      {error && <p className="text-sm text-correction -mt-1">{error}</p>}
      <SubmitButton isSubmitting={isSubmitting} label="Send Partnership Pitch" />
    </form>
  );
}

/* ---------- B) Apply for Internship ---------- */

const INTERNSHIP_EMPTY = {
  fullName: "",
  email: "",
  phone: "",
  schoolName: "",
  degreeYear: "",
  track: "",
  startDate: "",
  resumeUrl: "",
};

function validateInternship(f) {
  const e = {};
  if (!f.fullName.trim()) e.fullName = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email.";
  if (!/^[0-9+\-\s]{7,15}$/.test(f.phone)) e.phone = "Enter a valid phone number.";
  if (!f.schoolName.trim()) e.schoolName = "Enter your school or university.";
  if (!f.degreeYear.trim()) e.degreeYear = "Enter your degree and year.";
  if (!f.track) e.track = "Select a track.";
  if (!f.startDate) e.startDate = "Choose a preferred start date.";
  return e;
}

function InternshipForm() {
  const [form, setForm] = useState(INTERNSHIP_EMPTY);
  const [errors, setErrors] = useState({});
  const { isSubmitting, error, succeeded, submit, reset } = useFormSubmit(
    "internship_applications",
    (f) => ({
      full_name: f.fullName.trim(),
      email: f.email.trim(),
      phone: f.phone.trim(),
      school_name: f.schoolName.trim(),
      degree_year: f.degreeYear.trim(),
      track: f.track,
      preferred_start_date: f.startDate,
      resume_url: f.resumeUrl.trim() || null,
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = await submit(form, validateInternship);
    setErrors(errs);
  };

  if (succeeded) {
    return (
      <SuccessPanel
        title="Application received!"
        body="Our academy team reviews applications on a rolling basis. Keep an eye on your inbox for next steps."
        onReset={() => {
          reset();
          setForm(INTERNSHIP_EMPTY);
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" error={errors.fullName}>
          <TextInput value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Priya Sharma" />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <TextInput type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
        </Field>
      </div>
      <Field label="Email" error={errors.email}>
        <TextInput type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@school.edu" />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="University / School Name" error={errors.schoolName}>
          <TextInput value={form.schoolName} onChange={(e) => setForm({ ...form, schoolName: e.target.value })} placeholder="MLSU Udaipur" />
        </Field>
        <Field label="Degree & Year" error={errors.degreeYear}>
          <TextInput value={form.degreeYear} onChange={(e) => setForm({ ...form, degreeYear: e.target.value })} placeholder="B.Tech CSE, 3rd Year" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Internship Track" error={errors.track}>
          <Select value={form.track} onChange={(e) => setForm({ ...form, track: e.target.value })}>
            <option value="">Select a track</option>
            {INTERNSHIP_TRACKS.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
        <Field label="Preferred Start Date" error={errors.startDate}>
          <TextInput type="date" value={form.startDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
        </Field>
      </div>
      <Field label="Resume / Portfolio Link">
        <TextInput type="url" value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} placeholder="https://..." />
      </Field>
      {error && <p className="text-sm text-correction -mt-1">{error}</p>}
      <SubmitButton isSubmitting={isSubmitting} label="Submit Internship Application" />
    </form>
  );
}

/* ---------- C) Apply for Job ---------- */

const JOB_EMPTY = {
  fullName: "",
  email: "",
  phone: "",
  targetRole: "",
  yearsExperience: "",
  currentCtc: "",
  expectedCtc: "",
  resumeUrl: "",
  coverNote: "",
};

function validateJob(f) {
  const e = {};
  if (!f.fullName.trim()) e.fullName = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email.";
  if (!/^[0-9+\-\s]{7,15}$/.test(f.phone)) e.phone = "Enter a valid phone number.";
  if (!f.targetRole) e.targetRole = "Select a target role.";
  if (!f.yearsExperience.trim()) e.yearsExperience = "Enter your years of experience.";
  if (!f.resumeUrl.trim()) e.resumeUrl = "Add a link to your resume.";
  return e;
}

function JobForm() {
  const [form, setForm] = useState(JOB_EMPTY);
  const [errors, setErrors] = useState({});
  const { isSubmitting, error, succeeded, submit, reset } = useFormSubmit(
    "job_applications",
    (f) => ({
      full_name: f.fullName.trim(),
      email: f.email.trim(),
      phone: f.phone.trim(),
      target_role: f.targetRole,
      years_experience: f.yearsExperience.trim(),
      current_ctc: f.currentCtc.trim() || null,
      expected_ctc: f.expectedCtc.trim() || null,
      resume_url: f.resumeUrl.trim(),
      cover_note: f.coverNote.trim() || null,
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = await submit(form, validateJob);
    setErrors(errs);
  };

  if (succeeded) {
    return (
      <SuccessPanel
        title="Application submitted."
        body="Our hiring team reviews every application personally. If there's a fit, we'll reach out to schedule a first conversation."
        onReset={() => {
          reset();
          setForm(JOB_EMPTY);
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" error={errors.fullName}>
          <TextInput value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Rohan Verma" />
        </Field>
        <Field label="Phone Number" error={errors.phone}>
          <TextInput type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
        </Field>
      </div>
      <Field label="Email" error={errors.email}>
        <TextInput type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Target Role" error={errors.targetRole}>
          <Select value={form.targetRole} onChange={(e) => setForm({ ...form, targetRole: e.target.value })}>
            <option value="">Select a role</option>
            {JOB_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </Select>
        </Field>
        <Field label="Total Years of Experience" error={errors.yearsExperience}>
          <TextInput value={form.yearsExperience} onChange={(e) => setForm({ ...form, yearsExperience: e.target.value })} placeholder="e.g. 4" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Current / Last CTC">
          <TextInput value={form.currentCtc} onChange={(e) => setForm({ ...form, currentCtc: e.target.value })} placeholder="Optional" />
        </Field>
        <Field label="Expected CTC">
          <TextInput value={form.expectedCtc} onChange={(e) => setForm({ ...form, expectedCtc: e.target.value })} placeholder="Optional" />
        </Field>
      </div>
      <Field label="Resume Link" error={errors.resumeUrl}>
        <TextInput type="url" value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} placeholder="https://..." />
      </Field>
      <Field label="Cover Note">
        <TextArea rows={4} value={form.coverNote} onChange={(e) => setForm({ ...form, coverNote: e.target.value })} placeholder="Why this role, why now..." />
      </Field>
      {error && <p className="text-sm text-correction -mt-1">{error}</p>}
      <SubmitButton isSubmitting={isSubmitting} label="Submit Job Application" />
    </form>
  );
}

/* ---------- shared pieces ---------- */

function SubmitButton({ isSubmitting, label }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="mt-1 flex items-center justify-center gap-2 bg-ballpoint text-paper text-sm font-semibold py-3 border-2 border-graphite shadow-[4px_4px_0px_0px_#111111] hover:brightness-110 transition disabled:opacity-60"
    >
      {isSubmitting && <Loader2 size={16} className="animate-spin" />}
      {isSubmitting ? "Submitting..." : label}
    </button>
  );
}

function SuccessPanel({ title, body, onReset }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-6">
      <CheckCircle2 size={44} className="text-ballpoint" />
      <p className="font-hand text-xl text-graphite">{title}</p>
      <p className="text-sm font-note text-graphite/70 max-w-sm">{body}</p>
      <button
        onClick={onReset}
        className="mt-2 text-sm font-note text-ballpoint underline underline-offset-2"
      >
        Submit another response
      </button>
    </div>
  );
}

const TAB_FORMS = {
  partner: PartnerForm,
  internship: InternshipForm,
  job: JobForm,
};

const TAB_TITLES = {
  partner: "Become a Partner",
  internship: "Apply for Internship",
  job: "Apply for Job",
};

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState("partner");
  const [hiring, setHiring] = useState(false); // opened from a "Hire Us" button
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const ActiveForm = TAB_FORMS[activeTab];
  const { hash } = useLocation();

  // Links like /careers#internship, #job, #partner and #hire choose the tab
  useEffect(() => {
    const key = hash.replace("#", "");
    if (key === "hire") {
      setActiveTab("partner");
      setHiring(true);
    } else if (TAB_FORMS[key]) {
      setActiveTab(key);
      setHiring(false);
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* HERO */}
      <section className="pt-16 border-b-2 border-zincline">
        <div className="container-page py-16 sm:py-20">
          <span className="inline-block font-hand text-sm text-graphite bg-postit border-2 border-graphite shadow-[3px_3px_0px_0px_#111111] px-4 py-1.5 -rotate-2 mb-6">
            ★ Careers &amp; Collaborations
          </span>
          <h1 className="kinetic-headline text-3xl sm:text-6xl text-offwhite">Join the Network</h1>
          <p className="mt-6 text-offwhite/70 text-lg leading-relaxed normal-case max-w-xl">
            Whether you want to hire us, partner as an institution, apply for
            a job, or start your internship journey.
          </p>
        </div>
      </section>

      {/* TAB FORMS */}
      <section className="container-page py-16 sm:py-20">
        {/* scroll targets for #partner, #internship, #job and #hire links */}
        {["partner", "internship", "job", "hire"].map((id) => (
          <span key={id} id={id} className="block h-0 scroll-mt-28" aria-hidden="true" />
        ))}
        <div className="flex flex-wrap gap-2 mb-10">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setHiring(false);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold uppercase border-2 transition-colors ${
                activeTab === key
                  ? "bg-acid text-void border-acid"
                  : "bg-void border-zincline text-offwhite/70 hover:border-acid"
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="relative wobble-1 bg-[#F7FAFF] border-[3px] border-graphite shadow-[5px_5px_0px_0px_#111111] px-6 py-8 sm:px-9 sm:py-10"
            >
              <h2 className="font-hand text-2xl sm:text-3xl text-graphite mb-6">
                {hiring && activeTab === "partner" ? "Hire Us for a Project" : TAB_TITLES[activeTab]}
              </h2>
              <ActiveForm {...(activeTab === "partner" && hiring ? { presetType: "Corporate Client" } : {})} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* HEADQUARTERS & MAP */}
      <section className="container-page py-16 sm:py-20 border-t-2 border-zincline">
        <span className="inline-block font-hand text-sm text-white bg-correction border-2 border-graphite shadow-[3px_3px_0px_0px_#111111] px-4 py-1.5 -rotate-2 mb-6">
          ★ Main Office
        </span>
        <h2 className="kinetic-headline text-2xl sm:text-4xl text-offwhite mb-10">
          Headquarters &amp; Workspace
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-acid shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold uppercase text-offwhite text-sm mb-1">Address</h3>
                <p className="text-offwhite/70 normal-case leading-relaxed">
                  {CONTACT.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={20} className="text-acid shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold uppercase text-offwhite text-sm mb-1">Email</h3>
                <a href={`mailto:${CONTACT.email}`} className="text-offwhite/70 normal-case hover:text-acid transition-colors">{CONTACT.email}</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-acid shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold uppercase text-offwhite text-sm mb-1">Phone</h3>
                <a href={CONTACT.phoneHref} className="text-offwhite/70 normal-case hover:text-acid transition-colors">{CONTACT.phoneDisplay}</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-acid shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold uppercase text-offwhite text-sm mb-1">Office Hours &amp; Visitor Guidelines</h3>
                <p className="text-offwhite/70 normal-case leading-relaxed">
                  Mon–Fri, 10:00 AM – 6:30 PM IST. Visitors should book a slot
                  via the Quick Contact button below — walk-ins are welcome
                  but may need to wait for a free meeting room.
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative wobble-2 border-[3px] border-graphite shadow-[6px_6px_0px_0px_#017AFB] overflow-hidden"
          >
            <iframe
              title="P2N Automation office location — Nakoda Nagar, Udaipur, Rajasthan"
              src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&output=embed`}
              width="100%"
              height="360"
              style={{ border: 0, filter: "grayscale(0.3) contrast(1.1)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions onOpenScheduler={() => setSchedulerOpen(true)} />
      <QuickContactModal open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />

      <style>{`
        .career-input {
          width: 100%;
          border: 2px solid rgba(45,45,45,0.2);
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
          font-family: 'Patrick Hand', cursive;
          color: #111111;
          background: #FFFFFF;
        }
        .career-input:focus {
          outline: none;
          border-color: #0868E6;
        }
      `}</style>
    </div>
  );
}
