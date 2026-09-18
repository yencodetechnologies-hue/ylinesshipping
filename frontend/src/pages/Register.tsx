import { type FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe2,
  Hash,
  Home,
  IdCard,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  ReceiptText,
  Send,
  ShieldCheck,
  TrendingUp,
  Upload,
  User,
  UserCircle2,
  Users,
} from "lucide-react";
import { businessTypes, OTHER_BUSINESS_TYPE, SHIPPING_LOGISTICS_TYPE } from "../data/businessTypes";
import {
  shippingLogisticsCategories,
  OTHER_SHIPPING_CATEGORY,
} from "../data/shippingLogisticsCategories";
import { productCategories, OTHER_PRODUCT_CATEGORY } from "../data/productCategories";
import { legalStatusOptions, OTHER_LEGAL_STATUS } from "../data/legalStatus";
import { countryOptions, getStatesForCountry, OTHER_COUNTRY, OTHER_STATE } from "../data/locations";

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

type AccountType = "company" | "employee" | "individual";

const accountTypes: { value: AccountType; label: string; icon: typeof Building2 }[] = [
  { value: "company", label: "Company", icon: Building2 },
  { value: "employee", label: "Employee", icon: Users },
  { value: "individual", label: "Individual", icon: UserCircle2 },
];

interface FormState {
  // Shared across all account types
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agree: boolean;

  // Company account
  companyName: string;
  businessType: string;
  businessTypeOther: string;
  shippingCategories: string[];
  shippingCategoryOther: string;
  productCategories: string[];
  productCategoryOther: string;
  legalStatus: string;
  legalStatusOther: string;
  gstNo: string;
  panNo: string;
  landline: string;

  // Employee account
  companyCode: string;
  designation: string;

  // Individual account & company address
  city: string;
  country: string;
  countryOther: string;
  state: string;
  stateOther: string;
  pincode: string;
  address: string;

  // Individual account only
  idNumber: string;
  idProofFront: File | null;
  idProofBack: File | null;
}

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agree: false,

  companyName: "",
  businessType: "",
  businessTypeOther: "",
  shippingCategories: [],
  shippingCategoryOther: "",
  productCategories: [],
  productCategoryOther: "",
  legalStatus: "",
  legalStatusOther: "",
  gstNo: "",
  panNo: "",
  landline: "",

  companyCode: "",
  designation: "",

  city: "",
  country: "",
  countryOther: "",
  state: "",
  stateOther: "",
  pincode: "",
  address: "",

  idNumber: "",
  idProofFront: null,
  idProofBack: null,
};

const inputClass =
  "w-full rounded-lg border border-border bg-app-bg py-2.5 pl-9 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15";

export default function Register() {
  const [accountType, setAccountType] = useState<AccountType>("company");
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function handleAccountTypeChange(type: AccountType) {
    setAccountType(type);
    setErrors({});
  }

  const stateOptions = useMemo(() => getStatesForCountry(form.country), [form.country]);

  function handleCountryChange(value: string) {
    setForm((f) => ({
      ...f,
      country: value,
      countryOther: value === OTHER_COUNTRY ? f.countryOther : "",
      state: "",
      stateOther: "",
    }));
    setErrors((e) => ({ ...e, country: undefined, countryOther: undefined, state: undefined, stateOther: undefined }));
  }

  function handleStateChange(value: string) {
    setForm((f) => ({
      ...f,
      state: value,
      stateOther: value === OTHER_STATE ? f.stateOther : "",
    }));
    setErrors((e) => ({ ...e, state: undefined, stateOther: undefined }));
  }

  function toggleShippingCategory(category: string) {
    setForm((f) => ({
      ...f,
      shippingCategories: f.shippingCategories.includes(category)
        ? f.shippingCategories.filter((c) => c !== category)
        : [...f.shippingCategories, category],
    }));
    setErrors((e) => ({ ...e, shippingCategoryOther: undefined }));
  }

  function toggleProductCategory(category: string) {
    setForm((f) => ({
      ...f,
      productCategories: f.productCategories.includes(category)
        ? f.productCategories.filter((c) => c !== category)
        : [...f.productCategories, category],
    }));
    setErrors((e) => ({ ...e, productCategories: undefined, productCategoryOther: undefined }));
  }

  function handleIdProofChange(side: "idProofFront" | "idProofBack", file: File | null) {
    update(side, file);
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};

    // Shared fields, required for every account type
    if (!form.fullName.trim()) next.fullName = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (form.phone.trim().length < 7) next.phone = "Enter a valid mobile number";
    if (form.password.length < 6) next.password = "At least 6 characters";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords don't match";
    if (!form.agree) next.agree = "Required to continue";

    if (accountType === "company") {
      if (!form.companyName.trim()) next.companyName = "Enter your company name";
      if (!form.designation.trim()) next.designation = "Enter your designation";
      if (!form.businessType) next.businessType = "Select the nature of your business";
      if (form.businessType === OTHER_BUSINESS_TYPE && !form.businessTypeOther.trim())
        next.businessTypeOther = "Please specify your business type";
      if (
        form.businessType === SHIPPING_LOGISTICS_TYPE &&
        form.shippingCategories.includes(OTHER_SHIPPING_CATEGORY) &&
        !form.shippingCategoryOther.trim()
      )
        next.shippingCategoryOther = "Please specify your category";
      if (
        form.businessType &&
        form.businessType !== SHIPPING_LOGISTICS_TYPE &&
        form.productCategories.includes(OTHER_PRODUCT_CATEGORY) &&
        !form.productCategoryOther.trim()
      )
        next.productCategoryOther = "Please specify your product category";
      if (!form.legalStatus) next.legalStatus = "Select the legal status of your firm";
      if (form.legalStatus === OTHER_LEGAL_STATUS && !form.legalStatusOther.trim())
        next.legalStatusOther = "Please specify your legal status";
      if (form.gstNo.trim() && !/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(form.gstNo.trim()))
        next.gstNo = "Enter a valid 15-character GSTIN";
      if (form.panNo.trim() && !/^[A-Z]{5}\d{4}[A-Z]$/.test(form.panNo.trim()))
        next.panNo = "Enter a valid 10-character PAN";
      if (!form.city.trim()) next.city = "Enter your city";
      if (!form.country) next.country = "Select your country";
      if (form.country === OTHER_COUNTRY && !form.countryOther.trim())
        next.countryOther = "Please specify your country";
      if (!form.state) next.state = "Select your state";
      if (form.state === OTHER_STATE && !form.stateOther.trim())
        next.stateOther = "Please specify your state";
      if (!form.pincode.trim()) next.pincode = "Enter your pincode";
      if (!form.address.trim()) next.address = "Enter your full address";
    }

    if (accountType === "employee") {
      if (!form.companyCode.trim()) next.companyCode = "Enter your company code";
      if (!form.designation.trim()) next.designation = "Enter your designation";
      if (!form.city.trim()) next.city = "Enter your city";
      if (!form.country) next.country = "Select your country";
      if (form.country === OTHER_COUNTRY && !form.countryOther.trim())
        next.countryOther = "Please specify your country";
      if (!form.state) next.state = "Select your state";
      if (form.state === OTHER_STATE && !form.stateOther.trim())
        next.stateOther = "Please specify your state";
      if (!form.pincode.trim()) next.pincode = "Enter your pincode";
      if (!form.address.trim()) next.address = "Enter your full address";
      if (!form.idNumber.trim()) next.idNumber = "Enter your ID proof number";
      if (!form.idProofFront) next.idProofFront = "Upload the front side of your ID proof";
      if (!form.idProofBack) next.idProofBack = "Upload the back side of your ID proof";
    }

    if (accountType === "individual") {
      if (!form.city.trim()) next.city = "Enter your city";
      if (!form.country) next.country = "Select your country";
      if (form.country === OTHER_COUNTRY && !form.countryOther.trim())
        next.countryOther = "Please specify your country";
      if (!form.state) next.state = "Select your state";
      if (form.state === OTHER_STATE && !form.stateOther.trim())
        next.stateOther = "Please specify your state";
      if (!form.pincode.trim()) next.pincode = "Enter your pincode";
      if (!form.address.trim()) next.address = "Enter your full address";
      if (form.productCategories.length === 0)
        next.productCategories = "Select at least one product category";
      if (form.productCategories.includes(OTHER_PRODUCT_CATEGORY) && !form.productCategoryOther.trim())
        next.productCategoryOther = "Please specify your product category";
      if (!form.idNumber.trim()) next.idNumber = "Enter your ID proof number";
      if (!form.idProofFront) next.idProofFront = "Upload the front side of your ID proof";
      if (!form.idProofBack) next.idProofBack = "Upload the back side of your ID proof";
    }

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

  const addressFields = (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        <Field
          label="Pincode / ZIP Code"
          error={errors.pincode}
          icon={Hash}
          input={
            <input
              className={inputClass}
              placeholder="400001"
              value={form.pincode}
              onChange={(e) => update("pincode", e.target.value)}
            />
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-text-primary">Country</label>
          <select
            className="w-full rounded-lg border border-border bg-app-bg px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
            value={form.country}
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            <option value="">Select country</option>
            {countryOptions.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country}</p>}

          {form.country === OTHER_COUNTRY && (
            <div className="mt-3">
              <input
                className="w-full rounded-lg border border-border bg-app-bg px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                placeholder="Please specify your country"
                value={form.countryOther}
                onChange={(e) => update("countryOther", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                autoFocus
              />
              {errors.countryOther && (
                <p className="mt-1 text-xs text-red-600">{errors.countryOther}</p>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-text-primary">State</label>
          <select
            className="w-full rounded-lg border border-border bg-app-bg px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60"
            value={form.state}
            onChange={(e) => handleStateChange(e.target.value)}
            disabled={!form.country}
          >
            <option value="">{form.country ? "Select state" : "Select country first"}</option>
            {stateOptions.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}

          {form.state === OTHER_STATE && (
            <div className="mt-3">
              <input
                className="w-full rounded-lg border border-border bg-app-bg px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                placeholder="Please specify your state"
                value={form.stateOther}
                onChange={(e) => update("stateOther", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                autoFocus
              />
              {errors.stateOther && <p className="mt-1 text-xs text-red-600">{errors.stateOther}</p>}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold text-text-primary">Full Address</label>
        <div className="relative">
          <Home size={15} className="pointer-events-none absolute left-3 top-3 text-text-secondary" />
          <textarea
            className="w-full rounded-lg border border-border bg-app-bg py-2.5 pl-9 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
            rows={3}
            placeholder="Building, street, area"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
          />
        </div>
        {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
      </div>
    </>
  );

  const passwordAndSubmitFields = (
    <>
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
        <span className="cursor-pointer font-semibold text-primary hover:underline">Log in</span>
      </p>
    </>
  );

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
              {accountType === "company" && (
                <>
                  Thanks, {form.fullName.split(" ")[0] || "there"}. Our team typically
                  verifies new business listings for{" "}
                  <span className="font-semibold text-text-primary">{form.companyName}</span>{" "}
                  within 24 hours, then you'll be able to receive enquiries.
                </>
              )}
              {accountType === "employee" && (
                <>
                  Thanks, {form.fullName.split(" ")[0] || "there"}. Your employee account
                  request under company code{" "}
                  <span className="font-semibold text-text-primary">{form.companyCode}</span>{" "}
                  has been sent to the company admin for approval.
                </>
              )}
              {accountType === "individual" && (
                <>
                  Thanks, {form.fullName.split(" ")[0] || "there"}. Your individual account is
                  ready — you can now start reaching out to shippers and forwarders.
                </>
              )}
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

            <div className="mt-5 grid grid-cols-3 gap-1 rounded-lg border border-border bg-app-bg p-1">
              {accountTypes.map(({ value, label, icon: Icon }) => {
                const active = accountType === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleAccountTypeChange(value)}
                    className={`flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition-colors sm:text-sm ${
                      active
                        ? "bg-primary text-white shadow-sm"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              {accountType === "company" && (
                <>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    <Field
                      label="Designation"
                      error={errors.designation}
                      icon={Briefcase}
                      input={
                        <input
                          className={inputClass}
                          placeholder="Managing Director"
                          value={form.designation}
                          onChange={(e) => update("designation", e.target.value)}
                        />
                      }
                    />
                  </div>

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
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Mobile Number"
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
                      label="Landline Number (Optional)"
                      error={errors.landline}
                      icon={PhoneCall}
                      input={
                        <input
                          type="tel"
                          className={inputClass}
                          placeholder="+1 22 6000 0000"
                          value={form.landline}
                          onChange={(e) => update("landline", e.target.value)}
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
                        if (value !== SHIPPING_LOGISTICS_TYPE) {
                          update("shippingCategories", []);
                          update("shippingCategoryOther", "");
                        } else {
                          update("productCategories", []);
                          update("productCategoryOther", "");
                        }
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
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.preventDefault();
                          }}
                          autoFocus
                        />
                        {errors.businessTypeOther && (
                          <p className="mt-1 text-xs text-red-600">{errors.businessTypeOther}</p>
                        )}
                      </div>
                    )}

                    {form.businessType === SHIPPING_LOGISTICS_TYPE && (
                      <div className="mt-3">
                        <p className="mb-1.5 text-xs font-semibold text-text-primary">
                          Select your specific category
                          {form.shippingCategories.length > 0 && (
                            <span className="font-normal text-text-secondary">
                              {" "}
                              ({form.shippingCategories.length} selected)
                            </span>
                          )}
                        </p>
                        <div className="grid max-h-56 grid-cols-1 gap-x-4 gap-y-1.5 overflow-y-auto rounded-lg border border-border bg-app-bg p-3 sm:grid-cols-2">
                          {shippingLogisticsCategories.map((category) => (
                            <label
                              key={category}
                              className="flex cursor-pointer items-center gap-2 text-xs text-text-primary"
                            >
                              <input
                                type="checkbox"
                                checked={form.shippingCategories.includes(category)}
                                onChange={() => toggleShippingCategory(category)}
                                className="h-3.5 w-3.5 shrink-0 rounded border-border text-primary focus:ring-primary/30"
                              />
                              {category}
                            </label>
                          ))}
                        </div>

                        {form.shippingCategories.includes(OTHER_SHIPPING_CATEGORY) && (
                          <div className="mt-2">
                            <input
                              className="w-full rounded-lg border border-border bg-app-bg px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                              placeholder="Please specify your category"
                              value={form.shippingCategoryOther}
                              onChange={(e) => update("shippingCategoryOther", e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") e.preventDefault();
                              }}
                              autoFocus
                            />
                            {errors.shippingCategoryOther && (
                              <p className="mt-1 text-xs text-red-600">
                                {errors.shippingCategoryOther}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {form.businessType && form.businessType !== SHIPPING_LOGISTICS_TYPE && (
                      <div className="mt-3">
                        <p className="mb-1.5 text-xs font-semibold text-text-primary">
                          Product Dealing With
                          {form.productCategories.length > 0 && (
                            <span className="font-normal text-text-secondary">
                              {" "}
                              ({form.productCategories.length} selected)
                            </span>
                          )}
                        </p>
                        <div className="grid max-h-56 grid-cols-1 gap-x-4 gap-y-1.5 overflow-y-auto rounded-lg border border-border bg-app-bg p-3 sm:grid-cols-2">
                          {productCategories.map((category) => (
                            <label
                              key={category}
                              className="flex cursor-pointer items-center gap-2 text-xs text-text-primary"
                            >
                              <input
                                type="checkbox"
                                checked={form.productCategories.includes(category)}
                                onChange={() => toggleProductCategory(category)}
                                className="h-3.5 w-3.5 shrink-0 rounded border-border text-primary focus:ring-primary/30"
                              />
                              {category}
                            </label>
                          ))}
                        </div>

                        {form.productCategories.includes(OTHER_PRODUCT_CATEGORY) && (
                          <div className="mt-2">
                            <input
                              className="w-full rounded-lg border border-border bg-app-bg px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                              placeholder="Please specify your product category"
                              value={form.productCategoryOther}
                              onChange={(e) => update("productCategoryOther", e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") e.preventDefault();
                              }}
                              autoFocus
                            />
                            {errors.productCategoryOther && (
                              <p className="mt-1 text-xs text-red-600">
                                {errors.productCategoryOther}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-text-primary">
                      Legal Status of Firm
                    </label>
                    <select
                      className="w-full rounded-lg border border-border bg-app-bg px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                      value={form.legalStatus}
                      onChange={(e) => {
                        const value = e.target.value;
                        update("legalStatus", value);
                        if (value !== OTHER_LEGAL_STATUS) update("legalStatusOther", "");
                      }}
                    >
                      <option value="">Select legal status</option>
                      {legalStatusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    {errors.legalStatus && (
                      <p className="mt-1 text-xs text-red-600">{errors.legalStatus}</p>
                    )}

                    {form.legalStatus === OTHER_LEGAL_STATUS && (
                      <div className="mt-3">
                        <input
                          className="w-full rounded-lg border border-border bg-app-bg px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                          placeholder="Please specify the legal status"
                          value={form.legalStatusOther}
                          onChange={(e) => update("legalStatusOther", e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.preventDefault();
                          }}
                          autoFocus
                        />
                        {errors.legalStatusOther && (
                          <p className="mt-1 text-xs text-red-600">{errors.legalStatusOther}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="Company GST No (Optional)"
                      error={errors.gstNo}
                      icon={ReceiptText}
                      input={
                        <input
                          className={inputClass}
                          placeholder="22AAAAA0000A1Z5"
                          maxLength={15}
                          value={form.gstNo}
                          onChange={(e) => update("gstNo", e.target.value.toUpperCase())}
                        />
                      }
                    />
                    <Field
                      label="Company PAN No (Optional)"
                      error={errors.panNo}
                      icon={IdCard}
                      input={
                        <input
                          className={inputClass}
                          placeholder="AAAAA0000A"
                          maxLength={10}
                          value={form.panNo}
                          onChange={(e) => update("panNo", e.target.value.toUpperCase())}
                        />
                      }
                    />
                  </div>

                  {addressFields}
                </>
              )}

              {accountType === "employee" && (
                <>
                  <Field
                    label="Company Code"
                    error={errors.companyCode}
                    icon={KeyRound}
                    input={
                      <input
                        className={inputClass}
                        placeholder="e.g. YLN-0042"
                        value={form.companyCode}
                        onChange={(e) => update("companyCode", e.target.value.toUpperCase())}
                      />
                    }
                  />
                  <p className="-mt-2 text-xs text-text-secondary">
                    Ask your company admin for the code, then fill in your own details below.
                  </p>

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
                      label="Designation"
                      error={errors.designation}
                      icon={Briefcase}
                      input={
                        <input
                          className={inputClass}
                          placeholder="Operations Executive"
                          value={form.designation}
                          onChange={(e) => update("designation", e.target.value)}
                        />
                      }
                    />
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

                  <Field
                    label="Mobile Number"
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

                  {addressFields}

                  <Field
                    label="ID Proof Number"
                    error={errors.idNumber}
                    icon={IdCard}
                    input={
                      <input
                        className={inputClass}
                        placeholder="e.g. Aadhaar / Passport / Driving Licence / Employee ID No."
                        value={form.idNumber}
                        onChange={(e) => update("idNumber", e.target.value)}
                      />
                    }
                  />

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-text-primary">
                      ID Proof Upload
                    </label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <IdUploadBox
                        label="Front Side"
                        file={form.idProofFront}
                        error={errors.idProofFront}
                        onChange={(file) => handleIdProofChange("idProofFront", file)}
                      />
                      <IdUploadBox
                        label="Back Side"
                        file={form.idProofBack}
                        error={errors.idProofBack}
                        onChange={(file) => handleIdProofChange("idProofBack", file)}
                      />
                    </div>
                  </div>
                </>
              )}

              {accountType === "individual" && (
                <>
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
                    label="Email"
                    error={errors.email}
                    icon={Mail}
                    input={
                      <input
                        type="email"
                        className={inputClass}
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    }
                  />

                  <Field
                    label="Mobile Number"
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

                  {addressFields}

                  <div>
                    <p className="mb-1.5 text-xs font-semibold text-text-primary">
                      Product Dealing With
                      {form.productCategories.length > 0 && (
                        <span className="font-normal text-text-secondary">
                          {" "}
                          ({form.productCategories.length} selected)
                        </span>
                      )}
                    </p>
                    <div className="grid max-h-56 grid-cols-1 gap-x-4 gap-y-1.5 overflow-y-auto rounded-lg border border-border bg-app-bg p-3 sm:grid-cols-2">
                      {productCategories.map((category) => (
                        <label
                          key={category}
                          className="flex cursor-pointer items-center gap-2 text-xs text-text-primary"
                        >
                          <input
                            type="checkbox"
                            checked={form.productCategories.includes(category)}
                            onChange={() => toggleProductCategory(category)}
                            className="h-3.5 w-3.5 shrink-0 rounded border-border text-primary focus:ring-primary/30"
                          />
                          {category}
                        </label>
                      ))}
                    </div>
                    {errors.productCategories && (
                      <p className="mt-1 text-xs text-red-600">{errors.productCategories}</p>
                    )}

                    {form.productCategories.includes(OTHER_PRODUCT_CATEGORY) && (
                      <div className="mt-2">
                        <input
                          className="w-full rounded-lg border border-border bg-app-bg px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                          placeholder="Please specify your product category"
                          value={form.productCategoryOther}
                          onChange={(e) => update("productCategoryOther", e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.preventDefault();
                          }}
                          autoFocus
                        />
                        {errors.productCategoryOther && (
                          <p className="mt-1 text-xs text-red-600">{errors.productCategoryOther}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <Field
                    label="ID Proof Number"
                    error={errors.idNumber}
                    icon={IdCard}
                    input={
                      <input
                        className={inputClass}
                        placeholder="e.g. Aadhaar / Passport / Driving Licence No."
                        value={form.idNumber}
                        onChange={(e) => update("idNumber", e.target.value)}
                      />
                    }
                  />

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-text-primary">
                      ID Proof Upload
                    </label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <IdUploadBox
                        label="Front Side"
                        file={form.idProofFront}
                        error={errors.idProofFront}
                        onChange={(file) => handleIdProofChange("idProofFront", file)}
                      />
                      <IdUploadBox
                        label="Back Side"
                        file={form.idProofBack}
                        error={errors.idProofBack}
                        onChange={(file) => handleIdProofChange("idProofBack", file)}
                      />
                    </div>
                  </div>
                </>
              )}

              {passwordAndSubmitFields}
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

interface IdUploadBoxProps {
  label: string;
  file: File | null;
  error?: string;
  onChange: (file: File | null) => void;
}

function IdUploadBox({ label, file, error, onChange }: IdUploadBoxProps) {
  const inputId = `id-upload-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div>
      <label
        htmlFor={inputId}
        className={`flex h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed px-3 text-center transition-colors ${
          error ? "border-red-400 bg-red-50" : "border-border bg-app-bg hover:border-primary"
        }`}
      >
        {file ? (
          <>
            <CheckCircle2 size={18} className="text-primary" />
            <span className="w-full truncate text-xs font-medium text-text-primary">{file.name}</span>
            <span className="text-[11px] text-text-secondary">Click to replace</span>
          </>
        ) : (
          <>
            <Upload size={18} className="text-text-secondary" />
            <span className="text-xs font-medium text-text-primary">{label}</span>
            <span className="text-[11px] text-text-secondary">Click to upload</span>
          </>
        )}
        <input
          id={inputId}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </label>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
