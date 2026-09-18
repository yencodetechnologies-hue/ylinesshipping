export const usdRates: Record<string, number> = {
  USD: 1,
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
  CNY: 7.24,
  SGD: 1.35,
};

export const currencyCodes = Object.keys(usdRates);

export function convertCurrency(amount: number, from: string, to: string) {
  const fromRate = usdRates[from];
  const toRate = usdRates[to];
  if (!fromRate || !toRate) return 0;
  const usd = amount / fromRate;
  return usd * toRate;
}

export const dummyVessels = [
  {
    query: ["MAERSK ALTAIR", "9778820"],
    name: "MAERSK ALTAIR",
    imo: "9778820",
    mmsi: "219123000",
    flag: "Denmark",
    voyage: "441W",
    from: "Shanghai",
    to: "Rotterdam",
    eta: "2026-09-24 06:00 UTC",
    status: "Under way",
  },
  {
    query: ["MSC OSCAR", "9703291"],
    name: "MSC OSCAR",
    imo: "9703291",
    mmsi: "636017231",
    flag: "Liberia",
    voyage: "OF642A",
    from: "Nhava Sheva",
    to: "Felixstowe",
    eta: "2026-09-21 14:00 UTC",
    status: "At anchorage",
  },
  {
    query: ["EVER GIVEN", "9811000"],
    name: "EVER GIVEN",
    imo: "9811000",
    mmsi: "353136000",
    flag: "Panama",
    voyage: "0815-079E",
    from: "Taipei",
    to: "Rotterdam",
    eta: "2026-10-02 18:00 UTC",
    status: "Under way",
  },
];

export const dummyContainers = [
  {
    number: "MSCU1234567",
    type: "40' HC",
    status: "In transit",
    events: [
      { at: "2026-09-10 08:00", loc: "Nhava Sheva", event: "Gate in empty" },
      { at: "2026-09-11 16:40", loc: "Nhava Sheva", event: "Loaded on MSC OSCAR" },
      { at: "2026-09-12 02:10", loc: "Arabian Sea", event: "Vessel departed" },
    ],
  },
  {
    number: "TCLU7654321",
    type: "20' DV",
    status: "Arrived",
    events: [
      { at: "2026-09-01 11:00", loc: "Shanghai", event: "Loaded" },
      { at: "2026-09-14 09:20", loc: "Los Angeles", event: "Discharged" },
      { at: "2026-09-15 13:00", loc: "Los Angeles", event: "Gate out" },
    ],
  },
];

export const holidaysByCountry: Record<string, { date: string; name: string }[]> = {
  India: [
    { date: "2026-01-26", name: "Republic Day" },
    { date: "2026-03-14", name: "Holi" },
    { date: "2026-08-15", name: "Independence Day" },
    { date: "2026-10-02", name: "Gandhi Jayanti" },
    { date: "2026-11-08", name: "Diwali (sample)" },
  ],
  "United Arab Emirates": [
    { date: "2026-01-01", name: "New Year" },
    { date: "2026-12-02", name: "National Day" },
  ],
  Singapore: [
    { date: "2026-01-01", name: "New Year" },
    { date: "2026-02-17", name: "Chinese New Year (sample)" },
    { date: "2026-08-09", name: "National Day" },
  ],
  "United States": [
    { date: "2026-01-01", name: "New Year's Day" },
    { date: "2026-07-04", name: "Independence Day" },
    { date: "2026-11-26", name: "Thanksgiving" },
  ],
  "United Kingdom": [
    { date: "2026-01-01", name: "New Year's Day" },
    { date: "2026-12-25", name: "Christmas Day" },
    { date: "2026-12-26", name: "Boxing Day" },
  ],
  China: [
    { date: "2026-01-01", name: "New Year" },
    { date: "2026-02-17", name: "Spring Festival (sample)" },
    { date: "2026-10-01", name: "National Day" },
  ],
  Netherlands: [
    { date: "2026-01-01", name: "New Year" },
    { date: "2026-04-27", name: "King's Day" },
  ],
};

export const usefulLinks = [
  { group: "India", items: [
    { name: "DGFT", href: "https://www.dgft.gov.in/" },
    { name: "ICEGATE", href: "https://www.icegate.gov.in/" },
    { name: "CBIC", href: "https://www.cbic.gov.in/" },
    { name: "Indian Customs EDI", href: "https://www.icegate.gov.in/" },
  ]},
  { group: "International", items: [
    { name: "IMO", href: "https://www.imo.org/" },
    { name: "WCO HS", href: "https://www.wcoomd.org/" },
    { name: "UNCTAD", href: "https://unctad.org/" },
    { name: "WTO", href: "https://www.wto.org/" },
  ]},
];

export const exportDocuments = [
  { name: "Commercial Invoice", note: "Value, Incoterms, HS, buyer/seller" },
  { name: "Packing List", note: "Marks, packages, net/gross weight, CBM" },
  { name: "Bill of Lading / AWB", note: "Negotiable B/L or airway bill" },
  { name: "Certificate of Origin", note: "Preferential or non-preferential" },
  { name: "Shipping Bill / Export Declaration", note: "Customs filing" },
  { name: "Insurance Certificate", note: "If CIF/CIP" },
  { name: "Letter of Credit / Payment proof", note: "If LC shipment" },
  { name: "Phyto / Health / Fumigation cert.", note: "As per cargo" },
];

export const hsCodes = [
  { code: "0901.11", desc: "Coffee, not roasted, not decaffeinated" },
  { code: "1006.30", desc: "Semi-milled or wholly milled rice" },
  { code: "5201.00", desc: "Cotton, not carded or combed" },
  { code: "6109.10", desc: "T-shirts, knitted, of cotton" },
  { code: "8471.30", desc: "Portable automatic data processing machines" },
  { code: "8703.23", desc: "Motor cars, spark-ignition, 1500–3000 cc" },
  { code: "2710.19", desc: "Petroleum oils, other than light oils" },
  { code: "3004.90", desc: "Medicaments, put up for retail, other" },
];

export const portsAirports = [
  { country: "India", type: "Sea", name: "Jawaharlal Nehru (Nhava Sheva)", code: "INNSA" },
  { country: "India", type: "Sea", name: "Mundra", code: "INMUN" },
  { country: "India", type: "Air", name: "Delhi IGI", code: "DEL" },
  { country: "India", type: "Air", name: "Mumbai CSIA", code: "BOM" },
  { country: "United Arab Emirates", type: "Sea", name: "Jebel Ali", code: "AEJEA" },
  { country: "United Arab Emirates", type: "Air", name: "Dubai International", code: "DXB" },
  { country: "Singapore", type: "Sea", name: "Port of Singapore", code: "SGSIN" },
  { country: "Singapore", type: "Air", name: "Changi", code: "SIN" },
  { country: "Netherlands", type: "Sea", name: "Rotterdam", code: "NLRTM" },
  { country: "Netherlands", type: "Air", name: "Schiphol", code: "AMS" },
  { country: "United States", type: "Sea", name: "Los Angeles", code: "USLAX" },
  { country: "United States", type: "Air", name: "JFK", code: "JFK" },
  { country: "China", type: "Sea", name: "Shanghai", code: "CNSHA" },
  { country: "China", type: "Air", name: "Pudong", code: "PVG" },
];

export const pincodes = [
  { country: "India", city: "Mumbai", code: "400001", area: "Fort" },
  { country: "India", city: "New Delhi", code: "110001", area: "Connaught Place" },
  { country: "India", city: "Chennai", code: "600001", area: "Parrys" },
  { country: "United Arab Emirates", city: "Dubai", code: "00000", area: "PO Box sample" },
  { country: "Singapore", city: "Singapore", code: "018956", area: "Marina Bay" },
  { country: "United States", city: "New York", code: "10001", area: "Manhattan" },
  { country: "United Kingdom", city: "London", code: "EC3N 4AB", area: "Tower Hill" },
  { country: "Netherlands", city: "Rotterdam", code: "3011 AA", area: "Centre" },
  { country: "China", city: "Shanghai", code: "200120", area: "Pudong" },
];
