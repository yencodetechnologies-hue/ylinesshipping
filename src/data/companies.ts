export interface Company {
  id: number;
  name: string;
  description: string;
  rating: number;
  location: string;
  services: string[];
}

const names = [
  "Global Shipping Solutions",
  "Ocean Freight Express",
  "Air Cargo International",
  "Swift Road Logistics",
  "Bluewater Container Lines",
  "Skyline Air Freight",
  "Metro Warehouse Co.",
  "Prime Customs Brokers",
  "Continental Transport Group",
  "Harbor Point Shipping",
];

const locations = [
  "Mumbai, India",
  "New York, USA",
  "Rotterdam, Netherlands",
  "Singapore",
  "Dubai, UAE",
  "Shanghai, China",
  "Hamburg, Germany",
  "Los Angeles, USA",
  "Chennai, India",
  "Antwerp, Belgium",
];

const allServices = [
  "Sea Freight",
  "Air Freight",
  "Road Transport",
  "Courier",
  "Warehouse",
  "Customs Clearance",
];

function pickServices(seed: number): string[] {
  const count = 2 + (seed % 4);
  const start = seed % allServices.length;
  const picked: string[] = [];
  for (let i = 0; i < count; i++) {
    picked.push(allServices[(start + i) % allServices.length]);
  }
  return picked;
}

export const companies: Company[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: names[i % names.length],
  description: `Professional shipping and logistics services with ${20 + i} years of experience in international trade.`,
  rating: Number((3.5 + (i % 3) * 0.5).toFixed(1)),
  location: locations[i % locations.length],
  services: pickServices(i),
}));
