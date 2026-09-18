import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { countryOptions } from "../../data/locations";
import {
  convertCurrency,
  currencyCodes,
  dummyContainers,
  dummyVessels,
  exportDocuments,
  holidaysByCountry,
  hsCodes,
  pincodes,
  portsAirports,
  usefulLinks,
} from "../../data/resources/interactive";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary";

export function CurrencyTool() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const value = convertCurrency(Number(amount) || 0, from, to);

  return (
    <div className="max-w-lg space-y-4 rounded-xl border border-border bg-white p-5 shadow-sm">
      <label className="block text-sm font-medium">
        Amount
        <input className={`${inputClass} mt-1`} type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm font-medium">
          From
          <select className={`${inputClass} mt-1`} value={from} onChange={(e) => setFrom(e.target.value)}>
            {currencyCodes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          To
          <select className={`${inputClass} mt-1`} value={to} onChange={(e) => setTo(e.target.value)}>
            {currencyCodes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="font-display text-2xl font-bold text-primary">
        {value.toLocaleString(undefined, { maximumFractionDigits: 2 })} {to}
      </p>
      <p className="text-xs text-text-secondary">Sample mid-market rates for illustration only.</p>
    </div>
  );
}

export function CbmTool() {
  const [l, setL] = useState("120");
  const [w, setW] = useState("80");
  const [h, setH] = useState("100");
  const [qty, setQty] = useState("1");
  const [kg, setKg] = useState("250");
  const cbm = ((Number(l) || 0) * (Number(w) || 0) * (Number(h) || 0) * (Number(qty) || 0)) / 1_000_000;
  const volWeight = (cbm * 167).toFixed(1);

  return (
    <div className="max-w-lg space-y-4 rounded-xl border border-border bg-white p-5 shadow-sm">
      <p className="text-xs text-text-secondary">Dimensions in centimetres.</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["L", l, setL],
          ["W", w, setW],
          ["H", h, setH],
          ["Qty", qty, setQty],
        ].map(([label, val, set]) => (
          <label key={label as string} className="text-sm font-medium">
            {label as string}
            <input
              className={`${inputClass} mt-1`}
              type="number"
              min="0"
              value={val as string}
              onChange={(e) => (set as (v: string) => void)(e.target.value)}
            />
          </label>
        ))}
      </div>
      <label className="block text-sm font-medium">
        Actual weight (kg)
        <input className={`${inputClass} mt-1`} type="number" min="0" value={kg} onChange={(e) => setKg(e.target.value)} />
      </label>
      <div className="space-y-1 text-sm">
        <p>
          <span className="font-semibold">CBM:</span> {cbm.toFixed(4)} m³
        </p>
        <p>
          <span className="font-semibold">Volumetric weight (air ~167 kg/m³):</span> {volWeight} kg
        </p>
        <p>
          <span className="font-semibold">Chargeable (sample):</span> {Math.max(Number(kg) || 0, Number(volWeight)).toFixed(1)} kg
        </p>
      </div>
    </div>
  );
}

export function VesselTool() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<(typeof dummyVessels)[0] | null | undefined>(undefined);

  const search = () => {
    const n = q.trim().toLowerCase();
    const found = dummyVessels.find((v) => v.query.some((x) => x.toLowerCase().includes(n) || n.includes(x.toLowerCase())));
    setResult(found ?? null);
  };

  return (
    <div className="max-w-lg space-y-4">
      <div className="flex gap-2">
        <input className={inputClass} placeholder="Vessel name or IMO (try MSC OSCAR)" value={q} onChange={(e) => setQ(e.target.value)} />
        <button type="button" onClick={search} className="rounded-lg bg-primary px-4 text-sm font-semibold text-white">
          Track
        </button>
      </div>
      {result && (
        <article className="rounded-xl border border-border bg-white p-4 text-sm shadow-sm">
          <p className="font-display text-base font-semibold">{result.name}</p>
          <p className="text-text-secondary">IMO {result.imo} · {result.flag}</p>
          <p className="mt-2">{result.from} → {result.to}</p>
          <p>Voyage {result.voyage} · {result.status}</p>
          <p>ETA {result.eta}</p>
        </article>
      )}
      {result === null && <p className="text-sm text-text-secondary">No sample vessel matched. Try MAERSK ALTAIR, MSC OSCAR, or EVER GIVEN.</p>}
    </div>
  );
}

export function ContainerTool() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<(typeof dummyContainers)[0] | null | undefined>(undefined);

  const search = () => {
    const n = q.trim().toUpperCase();
    setResult(dummyContainers.find((c) => c.number === n) ?? null);
  };

  return (
    <div className="max-w-lg space-y-4">
      <div className="flex gap-2">
        <input className={inputClass} placeholder="e.g. MSCU1234567" value={q} onChange={(e) => setQ(e.target.value)} />
        <button type="button" onClick={search} className="rounded-lg bg-primary px-4 text-sm font-semibold text-white">
          Track
        </button>
      </div>
      {result && (
        <article className="rounded-xl border border-border bg-white p-4 text-sm shadow-sm">
          <p className="font-display font-semibold">{result.number} · {result.type}</p>
          <p className="text-primary">{result.status}</p>
          <ol className="mt-3 space-y-2 border-l-2 border-primary/30 pl-3">
            {result.events.map((ev) => (
              <li key={ev.at}>
                <p className="font-medium">{ev.event}</p>
                <p className="text-xs text-text-secondary">{ev.at} · {ev.loc}</p>
              </li>
            ))}
          </ol>
        </article>
      )}
      {result === null && <p className="text-sm text-text-secondary">Try MSCU1234567 or TCLU7654321.</p>}
    </div>
  );
}

function countryFromCoords(lat: number, lng: number) {
  if (lat >= 6 && lat <= 36 && lng >= 68 && lng <= 98) return "India";
  if (lat >= 22 && lat <= 27 && lng >= 51 && lng <= 57) return "United Arab Emirates";
  if (lat >= 1 && lat <= 2 && lng >= 103 && lng <= 105) return "Singapore";
  if (lat >= 24 && lat <= 50 && lng >= -125 && lng <= -66) return "United States";
  if (lat >= 49 && lat <= 59 && lng >= -8 && lng <= 2) return "United Kingdom";
  if (lat >= 18 && lat <= 54 && lng >= 73 && lng <= 135) return "China";
  if (lat >= 50 && lat <= 54 && lng >= 3 && lng <= 8) return "Netherlands";
  return "India";
}

export function HolidaysTool() {
  const [country, setCountry] = useState("India");
  const days = holidaysByCountry[country];

  const useLocation = () => {
    if (!navigator.geolocation) {
      setCountry("India");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCountry(countryFromCoords(pos.coords.latitude, pos.coords.longitude)),
      () => setCountry("India"),
    );
  };

  return (
    <div className="max-w-lg space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <select className={inputClass} value={country} onChange={(e) => setCountry(e.target.value)}>
          {countryOptions.filter((c) => c !== "Others").map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button type="button" onClick={useLocation} className="inline-flex items-center justify-center gap-1 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium">
          <MapPin size={16} /> Use my location
        </button>
      </div>
      {days ? (
        <ul className="divide-y divide-border rounded-xl border border-border bg-white">
          {days.map((d) => (
            <li key={d.date} className="flex justify-between px-4 py-3 text-sm">
              <span>{d.name}</span>
              <span className="text-text-secondary">{d.date}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-text-secondary">No sample holidays for this country yet. Try India, Singapore, or United States.</p>
      )}
    </div>
  );
}

export function UsefulLinksTool() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {usefulLinks.map((group) => (
        <div key={group.group}>
          <h3 className="mb-2 font-display text-sm font-semibold">{group.group}</h3>
          <ul className="space-y-2">
            {group.items.map((item) => (
              <li key={item.href + item.name}>
                <a href={item.href} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function ExportDocsTool() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  return (
    <ul className="max-w-xl space-y-2">
      {exportDocuments.map((doc) => (
        <li key={doc.name} className="flex gap-3 rounded-xl border border-border bg-white p-3">
          <input
            type="checkbox"
            checked={!!done[doc.name]}
            onChange={() => setDone((s) => ({ ...s, [doc.name]: !s[doc.name] }))}
            className="mt-1"
          />
          <div>
            <p className="text-sm font-semibold">{doc.name}</p>
            <p className="text-xs text-text-secondary">{doc.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function HsCodeTool() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return hsCodes;
    return hsCodes.filter((h) => h.code.includes(n) || h.desc.toLowerCase().includes(n));
  }, [q]);
  return (
    <div>
      <input className={`${inputClass} mb-4 max-w-md`} placeholder="Search code or description" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-app-bg text-text-secondary">
            <tr>
              <th className="px-4 py-2 font-medium">HS code</th>
              <th className="px-4 py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.code} className="border-t border-border">
                <td className="px-4 py-2 font-mono">{r.code}</td>
                <td className="px-4 py-2">{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PortsTool() {
  const countries = [...new Set(portsAirports.map((p) => p.country))];
  const [country, setCountry] = useState("India");
  const rows = portsAirports.filter((p) => p.country === country);
  return (
    <div>
      <select className={`${inputClass} mb-4 max-w-md`} value={country} onChange={(e) => setCountry(e.target.value)}>
        {countries.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <ul className="grid gap-3 sm:grid-cols-2">
        {rows.map((p) => (
          <li key={p.code} className="rounded-xl border border-border bg-white p-4 text-sm">
            <p className="font-semibold">{p.name}</p>
            <p className="text-text-secondary">{p.type} · {p.code}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PincodesTool() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return pincodes;
    return pincodes.filter((p) => `${p.country} ${p.city} ${p.code} ${p.area}`.toLowerCase().includes(n));
  }, [q]);
  return (
    <div>
      <input className={`${inputClass} mb-4 max-w-md`} placeholder="Country, city, or pincode" value={q} onChange={(e) => setQ(e.target.value)} />
      <ul className="grid gap-3 sm:grid-cols-2">
        {rows.map((p) => (
          <li key={`${p.country}-${p.code}`} className="rounded-xl border border-border bg-white p-4 text-sm">
            <p className="font-mono font-semibold">{p.code}</p>
            <p>{p.area}, {p.city}</p>
            <p className="text-text-secondary">{p.country}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
