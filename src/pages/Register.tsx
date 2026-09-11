import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe2,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  TrendingUp,
  User,
} from "lucide-react";
import { businessTypes, OTHER_BUSINESS_TYPE } from "../data/businessTypes";

const perks = [
  { icon: Globe2, text: "List your services in front of shippers worldwide" },
  { icon: ShieldCheck, text: "Verified business badge once your listing is approved" },
  { icon: Send, text: "Receive enquiries directly — no middlemen" },
  { icon: TrendingUp, text: "Grow beyond your local trade lane" },
];

const stats = [
  { value: "10,000+", label: "Companies listed" },
  { value: "50+", label: "Countries served" },
  { value: "8", label: "Freight verticals" },
];

interface FormState {
  fullName: string;
  companyName: string;
  businessType: string;
  businessTypeOther: string;
  email: string;
  phone: string;
  city: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

const initialForm: FormState = {
  fullName: "",
  companyName: "",
  businessType: "",
  businessTypeOther: "",
  email: "",
  phone: "",
  city: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

const inputClass =
  "w-full rounded-lg border border-border bg-app-bg py-2.5 pl-9 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15";

export default function Register() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Enter your full name";
    if (!form.companyName.trim()) next.companyName = "Enter your company name";
    if (!form.businessType) next.businessType = "Select the nature of your business";
    if (form.businessType === OTHER_BUSINESS_TYPE && !form.businessTypeOther.trim())
      next.businessTypeOther = "Please specify your business type";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (form.phone.trim().length < 7) next.phone = "Enter a valid phone number";
    if (!form.city.trim()) next.city = "Enter your city";
    if (form.password.length < 6) next.password = "At least 6 characters";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords don't match";
    if (!form.agree) next.agree = "Required to continue";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  }

  return (
    <main className="flex flex-1 bg-app-bg">
      <div className="relative hidden w-[42%] shrink-0 overflow-hidden lg:block">
        <img
          src="/images/splash/splash.jpeg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(8,46,107,0.92) 0%, rgba(13,71,161,0.88) 55%, rgba(21,101,192,0.8) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col px-10 py-12 text-white xl:px-14">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
              <Building2 size={20} />
            </span>
            <span className="font-display text-lg font-bold">Yline Shipping</span>
          </Link>

          <div className="flex-1" />

          <h1 className="font-display text-3xl font-bold leading-tight text-balance xl:text-4xl">
            Grow your freight &amp; logistics business with Yline
          </h1>
          <p className="mt-3 max-w-sm text-sm text-white/85 xl:text-base">
            Join the B2B directory built for forwarders, liners, CHAs and
            transporters — list your services and start receiving enquiries.
          </p>

          <ul className="mt-8 space-y-4">
            {perks.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-white/90">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Icon size={14} />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <div className="flex-1" />

          <div className="flex gap-6 border-t border-white/20 pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-xl font-bold">{s.value}</p>
                <p className="text-xs text-white/75">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-12">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md text-center"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 size={32} />
            </span>
            <h1 className="mt-5 font-display text-2xl font-bold text-text-primary">
              Registration received
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Thanks, {form.fullName.split(" ")[0] || "there"}. Our team typically
              verifies new business listings for{" "}
              <span className="font-semibold text-text-primary">{form.companyName}</span>{" "}
              within 24 hours, then you'll be able to receive enquiries.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-light"
            >
              Back to Home
            </Link>
          </motion.div>
        ) : (
          <div className="w-full max-w-md">
            <p className="font-display text-sm font-semibold tracking-wide text-secondary">
              FREE BUSINESS ACCOUNT
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-text-primary sm:text-3xl">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Register free and start receiving enquiries from shippers and
              forwarders in minutes.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  error={errors.fullName}
                  icon={User}
                  input={
                    <input
                      className={inputClass}
                      placeholder="Jane Doe"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                    />
                  }
                />
                <Field
                  label="Company Name"
                  error={errors.companyName}
                  icon={Building2}
                  input={
                    <input
                      className={inputClass}
                      placeholder="Acme Freight Co."
                      value={form.companyName}
                      onChange={(e) => update("companyName", e.target.value)}
                    />
                  }
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text-primary">
                  Nature of Business
                </label>
                <select
                  className="w-full rounded-lg border border-border bg-app-bg px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                  value={form.businessType}
                  onChange={(e) => {
                    const value = e.target.value;
                    update("businessType", value);
                    if (value !== OTHER_BUSINESS_TYPE) update("businessTypeOther", "");
                  }}
                >
                  <option value="">Select what best describes you</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.businessType && (
                  <p className="mt-1 text-xs text-red-600">{errors.businessType}</p>
                )}

                {form.businessType === OTHER_BUSINESS_TYPE && (
                  <div className="mt-3">
                    <input
                      className="w-full rounded-lg border border-border bg-app-bg px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                      placeholder="Please specify your business type"
                      value={form.businessTypeOther}
                      onChange={(e) => update("businessTypeOther", e.target.value)}
                      autoFocus
                    />
                    {errors.businessTypeOther && (
                      <p className="mt-1 text-xs text-red-600">{errors.businessTypeOther}</p>
                    )}
                  </div>
                )}
              </div>

              <Field
                label="Email"
                error={errors.email}
                icon={Mail}
                input={
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                }
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Phone Number"
                  error={errors.phone}
                  icon={Phone}
                  input={
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="+1 555 000 1234"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  }
                />
                <Field
                  label="City"
                  error={errors.city}
                  icon={MapPin}
                  input={
                    <input
                      className={inputClass}
                      placeholder="Mumbai"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                    />
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Password"
                  error={errors.password}
                  icon={Lock}
                  input={
                    <>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`${inputClass} pr-9`}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => update("password", e.target.value)}
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </>
                  }
                />
                <Field
                  label="Confirm Password"
                  error={errors.confirmPassword}
                  icon={Lock}
                  input={
                    <input
                      type={showPassword ? "text" : "password"}
                      className={inputClass}
                      placeholder="••••••••"
                      value={form.confirmPassword}
                      onChange={(e) => update("confirmPassword", e.target.value)}
                    />
                  }
                />
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-2.5 text-xs text-text-secondary">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => update("agree", e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-primary/30"
                  />
                  I agree to the Terms of Use and Privacy Policy.
                </label>
                {errors.agree && <p className="mt-1 text-xs text-red-600">{errors.agree}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-light disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Creating account…
                  </>
                ) : (
                  "Create Free Account"
                )}
              </button>

              <p className="text-center text-xs text-text-secondary">
                Already have an account?{" "}
                <span className="cursor-pointer font-semibold text-primary hover:underline">
                  Log in
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  icon: typeof User;
  input: React.ReactNode;
}

function Field({ label, error, icon: Icon, input }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-text-primary">{label}</label>
      <div className="relative">
        <Icon
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
        />
        {input}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
