import { City, Country } from "country-state-city";

export const OTHER_CITY = "Others";

const isoByCountryName = new Map(
  Country.getAllCountries().map((c) => [c.name, c.isoCode])
);

/**
 * Returns every city for the given country (from the same country-state-city
 * reference data used for the Country/State dropdowns), sorted alphabetically,
 * with "Others" appended so a location missing from the list can still be
 * entered as free text.
 */
export function getCitiesForCountry(countryName: string): string[] {
  const isoCode = isoByCountryName.get(countryName);
  const cities = isoCode ? City.getCitiesOfCountry(isoCode) : undefined;
  if (!cities || cities.length === 0) return [OTHER_CITY];

  const names = Array.from(new Set(cities.map((c) => c.name))).sort((a, b) =>
    a.localeCompare(b)
  );

  return [...names, OTHER_CITY];
}
