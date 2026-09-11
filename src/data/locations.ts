import { Country, State } from "country-state-city";

export const OTHER_COUNTRY = "Others";
export const OTHER_STATE = "Others";

const allCountries = Country.getAllCountries();

const countryIsoByName = new Map(allCountries.map((c) => [c.name, c.isoCode]));

export const countryOptions: string[] = [
  ...allCountries.map((c) => c.name).sort((a, b) => a.localeCompare(b)),
  OTHER_COUNTRY,
];

export function getStatesForCountry(countryName: string): string[] {
  const isoCode = countryIsoByName.get(countryName);
  if (!isoCode) return [OTHER_STATE];

  const states = State.getStatesOfCountry(isoCode)
    .map((s) => s.name)
    .sort((a, b) => a.localeCompare(b));

  return [...states, OTHER_STATE];
}
