import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  Box,
  CalendarDays,
  CheckCircle2,
  Container,
  FileText,
  Globe2,
  Hash,
  Loader2,
  MapPin,
  MessageSquareText,
  Package,
  Paperclip,
  Plus,
  Route,
  Ship,
  Trash2,
  Wallet,
  X,
} from "lucide-react";
import { countryOptions, OTHER_COUNTRY } from "../data/locations";
import { services } from "../data/services";

type EnquiryType = (typeof services)[number]["id"];
type ShipmentDirection = "IMPORT" | "EXPORT" | "DOMESTIC";
type ShipmentType = "FCL" | "LCL" | "BULK" | "BREAK BULK" | "PROJECT CARGO" | "OTHERS";

const shipmentDirections: ShipmentDirection[] = ["IMPORT", "EXPORT", "DOMESTIC"];
const shipmentTypes: ShipmentType[] = [
  "FCL",
  "LCL",
  "BULK",
  "BREAK BULK",
  "PROJECT CARGO",
  "OTHERS",
];
const OTHER_SHIPMENT_TYPE: ShipmentType = "OTHERS";

interface PackageRow {
  id: string;
  netWeight: string;
  grossWeight: string;
  length: string;
  breadth: string;
  height: string;
}

function newRow(): PackageRow {
  return {
    id: crypto.randomUUID(),
    netWeight: "",
    grossWeight: "",
    length: "",
    breadth: "",
    height: "",
  };
}

interface FormState {
  enquiryType: EnquiryType | "";
  shipment: ShipmentDirection | "";
  shipmentType: ShipmentType | "";
  shipmentTypeOther: string;

  departureCountry: string;
  departureCountryOther: string;
  portOfLoading: string;
  placeOfOrigin: string;
  departurePostalCode: string;

  arrivalCountry: string;
  arrivalCountryOther: string;
  portOfDischarge: string;
  placeOfDelivery: string;
  arrivalPostalCode: string;

  shipmentDate: string;
  incoTerm: string;
  preferredLine: string;
  paymentTerm: string;
  transitTime: string;
  shippingBillType: string;

  commodity: string;
  hsCode: string;
  packageType: string;
  noOfPackages: string;

  handlingInstruction: string;
  otherDescription: string;
}

const initialForm: FormState = {
  enquiryType: "",
  shipment: "",
  shipmentType: "",
  shipmentTypeOther: "",

  departureCountry: "",
  departureCountryOther: "",
  portOfLoading: "",
  placeOfOrigin: "",
  departurePostalCode: "",

  arrivalCountry: "",
  arrivalCountryOther: "",
  portOfDischarge: "",
  placeOfDelivery: "",
  arrivalPostalCode: "",

  shipmentDate: "",
  incoTerm: "",
  preferredLine: "",
  paymentTerm: "",
  transitTime: "",
  shippingBillType: "",

  commodity: "",
  hsCode: "",
  packageType: "",
  noOfPackages: "",

  handlingInstruction: "",
  otherDescription: "",
};

const inputClass =
  "w-full rounded-lg border border-border bg-app-bg py-2.5 pl-9 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15";
const plainInputClass =
  "w-full rounded-lg border border-border bg-app-bg px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15";
const cellInputClass =
  "w-full rounded-md border border-border bg-white px-2 py-1.5 text-xs text-text-primary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15";

function numeric(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export default function PostEnquiry() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [rows, setRows] = useState<PackageRow[]>([newRow(), newRow(), newRow()]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function updateRow(id: string, key: keyof Omit<PackageRow, "id">, value: string) {
    setRows((r) => r.map((row) => (row.id === id ? { ...row, [key]: value } : row)));
  }

  function addRow() {
    setRows((r) => [...r, newRow()]);
  }

  function removeRow(id: string) {
    setRows((r) => (r.length > 1 ? r.filter((row) => row.id !== id) : r));
  }

  function handleAttachmentChange(files: FileList | null) {
    if (!files || files.length === 0) return;
    setAttachments((a) => [...a, ...Array.from(files)]);
  }

  function removeAttachment(index: number) {
    setAttachments((a) => a.filter((_, i) => i !== index));
  }

  const totals = rows.reduce(
    (acc, row) => {
      acc.netWeight += numeric(row.netWeight);
      acc.grossWeight += numeric(row.grossWeight);
      acc.volume += (numeric(row.length) * numeric(row.breadth) * numeric(row.height)) / 1_000_000;
      return acc;
    },
    { netWeight: 0, grossWeight: 0, volume: 0 }
  );

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.enquiryType) next.enquiryType = "Select enquiry type";
    if (!form.shipment) next.shipment = "Select shipment direction";
    if (!form.shipmentType) next.shipmentType = "Select shipment type";
    if (form.shipmentType === OTHER_SHIPMENT_TYPE && !form.shipmentTypeOther.trim())
      next.shipmentTypeOther = "Please specify the shipment type";

    if (!form.departureCountry) next.departureCountry = "Select departure country";
    if (form.departureCountry === OTHER_COUNTRY && !form.departureCountryOther.trim())
      next.departureCountryOther = "Please specify the country";
    if (!form.portOfLoading.trim()) next.portOfLoading = "Enter port of loading";

    if (!form.arrivalCountry) next.arrivalCountry = "Select arrival country";
    if (form.arrivalCountry === OTHER_COUNTRY && !form.arrivalCountryOther.trim())
      next.arrivalCountryOther = "Please specify the country";
    if (!form.portOfDischarge.trim()) next.portOfDischarge = "Enter port of discharge";

    if (!form.commodity.trim()) next.commodity = "Enter the commodity";
    if (!form.noOfPackages.trim()) next.noOfPackages = "Enter number of packages";

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

  if (submitted) {
    return (
      <main className="flex flex-1 items-center justify-center bg-app-bg px-4 py-16">
        <div className="w-full max-w-md text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 size={32} />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-text-primary">
            Enquiry posted successfully
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Your {services.find((s) => s.id === form.enquiryType)?.label || "shipment"}{" "}
            {form.shipment.toLowerCase()} enquiry has been sent
            to matching freight forwarders and carriers. They'll reach out with quotes shortly.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-light"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-app-bg">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="font-display text-sm font-semibold tracking-wide text-secondary">
          FREIGHT ENQUIRY
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-text-primary sm:text-3xl">
          Post an Enquiry
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Share your shipment details and get quotes from verified forwarders, liners and CHAs.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <Section title="Shipment Detail" icon={Container}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text-primary">
                  Enquiry
                </label>
                <select
                  className={plainInputClass}
                  value={form.enquiryType}
                  onChange={(e) => update("enquiryType", e.target.value as EnquiryType)}
                >
                  <option value="">Select enquiry</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.label}
                    </option>
                  ))}
                </select>
                {errors.enquiryType && (
                  <p className="mt-1 text-xs text-red-600">{errors.enquiryType}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text-primary">
                  Shipment
                </label>
                <select
                  className={plainInputClass}
                  value={form.shipment}
                  onChange={(e) => update("shipment", e.target.value as ShipmentDirection)}
                >
                  <option value="">Select shipment</option>
                  {shipmentDirections.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0) + option.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                {errors.shipment && <p className="mt-1 text-xs text-red-600">{errors.shipment}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text-primary">
                  Shipment Type
                </label>
                <select
                  className={plainInputClass}
                  value={form.shipmentType}
                  onChange={(e) => {
                    const value = e.target.value as ShipmentType | "";
                    setForm((f) => ({
                      ...f,
                      shipmentType: value,
                      shipmentTypeOther: value === OTHER_SHIPMENT_TYPE ? f.shipmentTypeOther : "",
                    }));
                    setErrors((err) => ({
                      ...err,
                      shipmentType: undefined,
                      shipmentTypeOther: undefined,
                    }));
                  }}
                >
                  <option value="">Select shipment type</option>
                  {shipmentTypes.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.shipmentType && (
                  <p className="mt-1 text-xs text-red-600">{errors.shipmentType}</p>
                )}
                {form.shipmentType === OTHER_SHIPMENT_TYPE && (
                  <div className="mt-2">
                    <input
                      className={plainInputClass}
                      placeholder="Please specify the shipment type"
                      value={form.shipmentTypeOther}
                      onChange={(e) => update("shipmentTypeOther", e.target.value)}
                      autoFocus
                    />
                    {errors.shipmentTypeOther && (
                      <p className="mt-1 text-xs text-red-600">{errors.shipmentTypeOther}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Section>

          <Section title="Departure &amp; Arrival Detail" icon={Route}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wide text-text-secondary">
                  Departure
                </p>
                <CountryField
                  label="Country"
                  value={form.departureCountry}
                  otherValue={form.departureCountryOther}
                  error={errors.departureCountry}
                  otherError={errors.departureCountryOther}
                  onChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      departureCountry: v,
                      departureCountryOther: v === OTHER_COUNTRY ? f.departureCountryOther : "",
                    }))
                  }
                  onOtherChange={(v) => update("departureCountryOther", v)}
                />
                <Field
                  label="Port of Loading"
                  error={errors.portOfLoading}
                  icon={Anchor}
                  input={
                    <input
                      className={inputClass}
                      placeholder="e.g. Nhava Sheva (INNSA)"
                      value={form.portOfLoading}
                      onChange={(e) => update("portOfLoading", e.target.value)}
                    />
                  }
                />
                <Field
                  label="Place of Origin"
                  icon={MapPin}
                  input={
                    <input
                      className={inputClass}
                      placeholder="City / factory location"
                      value={form.placeOfOrigin}
                      onChange={(e) => update("placeOfOrigin", e.target.value)}
                    />
                  }
                />
                <Field
                  label="Postal Code"
                  icon={Hash}
                  input={
                    <input
                      className={inputClass}
                      placeholder="400707"
                      value={form.departurePostalCode}
                      onChange={(e) => update("departurePostalCode", e.target.value)}
                    />
                  }
                />
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wide text-text-secondary">
                  Arrival
                </p>
                <CountryField
                  label="Country"
                  value={form.arrivalCountry}
                  otherValue={form.arrivalCountryOther}
                  error={errors.arrivalCountry}
                  otherError={errors.arrivalCountryOther}
                  onChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      arrivalCountry: v,
                      arrivalCountryOther: v === OTHER_COUNTRY ? f.arrivalCountryOther : "",
                    }))
                  }
                  onOtherChange={(v) => update("arrivalCountryOther", v)}
                />
                <Field
                  label="Port of Discharge"
                  error={errors.portOfDischarge}
                  icon={Anchor}
                  input={
                    <input
                      className={inputClass}
                      placeholder="e.g. Jebel Ali (AEJEA)"
                      value={form.portOfDischarge}
                      onChange={(e) => update("portOfDischarge", e.target.value)}
                    />
                  }
                />
                <Field
                  label="Place of Delivery"
                  icon={MapPin}
                  input={
                    <input
                      className={inputClass}
                      placeholder="City / warehouse location"
                      value={form.placeOfDelivery}
                      onChange={(e) => update("placeOfDelivery", e.target.value)}
                    />
                  }
                />
                <Field
                  label="Postal Code"
                  icon={Hash}
                  input={
                    <input
                      className={inputClass}
                      placeholder="00000"
                      value={form.arrivalPostalCode}
                      onChange={(e) => update("arrivalPostalCode", e.target.value)}
                    />
                  }
                />
              </div>
            </div>
          </Section>

          <Section title="Transit Detail" icon={Globe2}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Shipment Date"
                icon={CalendarDays}
                input={
                  <input
                    type="date"
                    className={inputClass}
                    value={form.shipmentDate}
                    onChange={(e) => update("shipmentDate", e.target.value)}
                  />
                }
              />
              <Field
                label="Inco Term"
                icon={FileText}
                input={
                  <input
                    className={inputClass}
                    placeholder="e.g. FOB, CIF, EXW"
                    value={form.incoTerm}
                    onChange={(e) => update("incoTerm", e.target.value.toUpperCase())}
                  />
                }
              />
              <Field
                label="Preferred Line"
                icon={Ship}
                input={
                  <input
                    className={inputClass}
                    placeholder="Carrier / shipping line preference"
                    value={form.preferredLine}
                    onChange={(e) => update("preferredLine", e.target.value)}
                  />
                }
              />
              <Field
                label="Payment Term"
                icon={Wallet}
                input={
                  <input
                    className={inputClass}
                    placeholder="e.g. Prepaid, Collect"
                    value={form.paymentTerm}
                    onChange={(e) => update("paymentTerm", e.target.value)}
                  />
                }
              />
              <Field
                label="Transit Time"
                icon={CalendarDays}
                input={
                  <input
                    className={inputClass}
                    placeholder="e.g. 18-22 days"
                    value={form.transitTime}
                    onChange={(e) => update("transitTime", e.target.value)}
                  />
                }
              />
              <Field
                label="Type of Shipping Bill"
                icon={FileText}
                input={
                  <input
                    className={inputClass}
                    placeholder="e.g. Drawback, DEEC, DEPB"
                    value={form.shippingBillType}
                    onChange={(e) => update("shippingBillType", e.target.value)}
                  />
                }
              />
            </div>
          </Section>

          <Section title="Cargo Detail" icon={Package}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Commodity"
                error={errors.commodity}
                icon={Box}
                input={
                  <input
                    className={inputClass}
                    placeholder="e.g. Cotton textiles"
                    value={form.commodity}
                    onChange={(e) => update("commodity", e.target.value)}
                  />
                }
              />
              <Field
                label="HS Code"
                icon={Hash}
                input={
                  <input
                    className={inputClass}
                    placeholder="e.g. 5208.11"
                    value={form.hsCode}
                    onChange={(e) => update("hsCode", e.target.value)}
                  />
                }
              />
              <Field
                label="Package Type"
                icon={Package}
                input={
                  <input
                    className={inputClass}
                    placeholder="e.g. Carton, Pallet, Drum"
                    value={form.packageType}
                    onChange={(e) => update("packageType", e.target.value)}
                  />
                }
              />
              <Field
                label="No of Packages"
                error={errors.noOfPackages}
                icon={Box}
                input={
                  <input
                    className={inputClass}
                    placeholder="e.g. 120"
                    value={form.noOfPackages}
                    onChange={(e) => update("noOfPackages", e.target.value)}
                  />
                }
              />
            </div>
          </Section>

          <Section title="Weight &amp; Volume" icon={Box}>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[640px] border-collapse text-xs">
                <thead>
                  <tr className="bg-app-bg text-left text-text-secondary">
                    <th className="w-10 border-b border-border px-2 py-2 font-semibold">S.No</th>
                    <th className="border-b border-border px-2 py-2 font-semibold">
                      Net Weight (kg)
                    </th>
                    <th className="border-b border-border px-2 py-2 font-semibold">
                      Gross Weight (kg)
                    </th>
                    <th className="border-b border-border px-2 py-2 font-semibold">Length (cm)</th>
                    <th className="border-b border-border px-2 py-2 font-semibold">Breadth (cm)</th>
                    <th className="border-b border-border px-2 py-2 font-semibold">Height (cm)</th>
                    <th className="border-b border-border px-2 py-2 font-semibold">Volume (CBM)</th>
                    <th className="w-8 border-b border-border px-2 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => {
                    const volume =
                      (numeric(row.length) * numeric(row.breadth) * numeric(row.height)) /
                      1_000_000;
                    return (
                      <tr key={row.id} className="border-b border-border last:border-b-0">
                        <td className="px-2 py-1.5 text-center text-text-secondary">{index + 1}</td>
                        <td className="px-2 py-1.5">
                          <input
                            className={cellInputClass}
                            inputMode="decimal"
                            value={row.netWeight}
                            onChange={(e) => updateRow(row.id, "netWeight", e.target.value)}
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            className={cellInputClass}
                            inputMode="decimal"
                            value={row.grossWeight}
                            onChange={(e) => updateRow(row.id, "grossWeight", e.target.value)}
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            className={cellInputClass}
                            inputMode="decimal"
                            value={row.length}
                            onChange={(e) => updateRow(row.id, "length", e.target.value)}
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            className={cellInputClass}
                            inputMode="decimal"
                            value={row.breadth}
                            onChange={(e) => updateRow(row.id, "breadth", e.target.value)}
                          />
                        </td>
                        <td className="px-2 py-1.5">
                          <input
                            className={cellInputClass}
                            inputMode="decimal"
                            value={row.height}
                            onChange={(e) => updateRow(row.id, "height", e.target.value)}
                          />
                        </td>
                        <td className="px-2 py-1.5 text-center text-text-secondary">
                          {volume > 0 ? volume.toFixed(3) : "—"}
                        </td>
                        <td className="px-2 py-1.5 text-center">
                          <button
                            type="button"
                            onClick={() => removeRow(row.id)}
                            disabled={rows.length === 1}
                            aria-label="Remove row"
                            className="text-text-secondary hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-app-bg font-semibold text-text-primary">
                    <td className="px-2 py-2">Total</td>
                    <td className="px-2 py-2">{totals.netWeight.toFixed(2)}</td>
                    <td className="px-2 py-2">{totals.grossWeight.toFixed(2)}</td>
                    <td className="px-2 py-2" colSpan={2} />
                    <td className="px-2 py-2 text-text-secondary">CBM</td>
                    <td className="px-2 py-2">{totals.volume.toFixed(3)}</td>
                    <td className="px-2 py-2" />
                  </tr>
                </tfoot>
              </table>
            </div>
            <button
              type="button"
              onClick={addRow}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/5"
            >
              <Plus size={14} /> Add Row
            </button>
          </Section>

          <Section title="Handling Instruction (if any)" icon={MessageSquareText}>
            <textarea
              className={`${plainInputClass} resize-none`}
              rows={3}
              placeholder="e.g. Fragile, keep upright, temperature controlled"
              value={form.handlingInstruction}
              onChange={(e) => update("handlingInstruction", e.target.value)}
            />
          </Section>

          <Section title="Other Description" icon={FileText}>
            <textarea
              className={`${plainInputClass} resize-none`}
              rows={3}
              placeholder="Any other details forwarders should know"
              value={form.otherDescription}
              onChange={(e) => update("otherDescription", e.target.value)}
            />
          </Section>

          <Section title="Attachment (if any)" icon={Paperclip}>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-app-bg px-3 py-6 text-center transition-colors hover:border-primary">
              <Paperclip size={18} className="text-text-secondary" />
              <span className="text-xs font-medium text-text-primary">
                Click to upload packing list, invoice, or photos
              </span>
              <span className="text-[11px] text-text-secondary">PDF, image or document files</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleAttachmentChange(e.target.files)}
              />
            </label>

            {attachments.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {attachments.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border bg-app-bg px-3 py-2 text-xs text-text-primary"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      aria-label={`Remove ${file.name}`}
                      className="shrink-0 text-text-secondary hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-light disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Posting enquiry…
              </>
            ) : (
              "Post Enquiry"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

interface SectionProps {
  title: string;
  icon: typeof Package;
  children: React.ReactNode;
}

function Section({ title, icon: Icon, children }: SectionProps) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
      <h2 className="mb-4 flex items-center gap-2 font-display text-sm font-bold text-text-primary sm:text-base">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon size={14} />
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  icon: typeof Package;
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

interface CountryFieldProps {
  label: string;
  value: string;
  otherValue: string;
  error?: string;
  otherError?: string;
  onChange: (value: string) => void;
  onOtherChange: (value: string) => void;
}

function CountryField({
  label,
  value,
  otherValue,
  error,
  otherError,
  onChange,
  onOtherChange,
}: CountryFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-text-primary">{label}</label>
      <select
        className={plainInputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select country</option>
        {countryOptions.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}

      {value === OTHER_COUNTRY && (
        <div className="mt-2">
          <input
            className={plainInputClass}
            placeholder="Please specify the country"
            value={otherValue}
            onChange={(e) => onOtherChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            autoFocus
          />
          {otherError && <p className="mt-1 text-xs text-red-600">{otherError}</p>}
        </div>
      )}
    </div>
  );
}
