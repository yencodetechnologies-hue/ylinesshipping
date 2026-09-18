import { City, Country } from "country-state-city";
import postalCodeData from "./postalCodeData.json";

export const OTHER_CITY = "Others";

const countryNameByIso = new Map(
  Country.getAllCountries().map((c) => [c.isoCode, c.name])
);
const isoByCountryName = new Map(
  Country.getAllCountries().map((c) => [c.name, c.isoCode])
);

const postalByIso = postalCodeData as Record<string, Record<string, string>>;

const seen = new Set<string>();
const cityOptions: string[] = [];
for (const city of City.getAllCities()) {
  const countryName = countryNameByIso.get(city.countryCode) ?? city.countryCode;
  const label = `${city.name}, ${countryName}`;
  if (!seen.has(label)) {
    seen.add(label);
    cityOptions.push(label);
  }
}
cityOptions.sort((a, b) => a.localeCompare(b));

const cityOptionsLower = cityOptions.map((c) => c.toLowerCase());

/**
 * Case-insensitive substring search across every city in the world
 * (~148k entries from country-state-city), capped at `limit` results so
 * the dropdown stays fast to render as the user types instead of loading
 * every city into a single <select>.
 */
export function searchCities(query: string, limit = 50): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: string[] = [];
  for (let i = 0; i < cityOptionsLower.length && results.length < limit; i++) {
    if (cityOptionsLower[i].includes(q)) results.push(cityOptions[i]);
  }
  return results;
}

/**
 * Looks up the postal/PIN code for a "City, Country" label as produced by
 * `searchCities`, from a GeoNames-derived dataset (postalCodeData.json,
 * CC BY 4.0 https://www.geonames.org) covering the ~80 countries with a
 * structured postal system. A city can have many postal codes in reality;
 * this returns one representative code as an auto-fill starting point, and
 * the postal code field stays editable so it can be corrected. Returns ""
 * when the city or country has no postal data.
 */
export function getPostalCodeForCity(cityLabel: string): string {
  const separatorIndex = cityLabel.lastIndexOf(", ");
  if (separatorIndex === -1) return "";

  const cityName = cityLabel.slice(0, separatorIndex).trim().toLowerCase();
  const countryName = cityLabel.slice(separatorIndex + 2).trim();

  const isoCode = isoByCountryName.get(countryName);
  if (!isoCode) return "";

  return postalByIso[isoCode]?.[cityName] ?? "";
}
