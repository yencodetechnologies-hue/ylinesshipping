import { Country } from "country-state-city";
import portData from "./portData.json";

export const OTHER_PORT = "Others";

interface PortRecord {
  /** name */
  n: string;
  /** UN/LOCODE (country + location) */
  c: string;
  /** 1 = sea port, 2 = airport, 3 = both */
  t: 1 | 2 | 3;
}

const portsByIso = portData as Record<string, PortRecord[]>;

const isoByCountryName = new Map(
  Country.getAllCountries().map((c) => [c.name, c.isoCode])
);

function suffixFor(type: PortRecord["t"], enquiryType?: string): string {
  if (enquiryType === "sea") return "Sea Port";
  if (enquiryType === "air") return "Airport";
  if (type === 3) return "Sea/Air";
  if (type === 2) return "Airport";
  return "Sea Port";
}

/**
 * Returns the port options (name + UN/LOCODE, formatted for display) for
 * the given country, sourced from the UN/LOCODE reference list so every
 * country is covered. Used identically for Port of Loading and Port of
 * Discharge.
 *
 * When `enquiryType` is "sea" only sea-capable ports are shown (label:
 * "Sea Port", never "Air"); when it's "air" only air-capable ports are
 * shown (label: "Airport"). Dual-mode locations still appear because they
 * serve that mode, but the unused mode is not shown in the label. For any
 * other enquiry type the list is unfiltered.
 */
export function getPortsForCountry(countryName: string, enquiryType?: string): string[] {
  const isoCode = isoByCountryName.get(countryName);
  const ports = isoCode ? portsByIso[isoCode] : undefined;
  if (!ports || ports.length === 0) return [OTHER_PORT];

  const filtered =
    enquiryType === "sea"
      ? ports.filter((p) => p.t === 1 || p.t === 3)
      : enquiryType === "air"
        ? ports.filter((p) => p.t === 2 || p.t === 3)
        : ports;

  if (filtered.length === 0) return [OTHER_PORT];

  const formatted = filtered.map((p) => `${p.n} (${p.c}) – ${suffixFor(p.t, enquiryType)}`);

  return [...formatted, OTHER_PORT];
}
