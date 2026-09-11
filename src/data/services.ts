export interface ServiceCategory {
  id: string;
  label: string;
  description: string;
  image: string;
}

export const services: ServiceCategory[] = [
  { id: "sea", label: "Sea", description: "Ocean freight (FCL & LCL)", image: "/images/icons/sea.png" },
  { id: "air", label: "Air", description: "Air cargo forwarding", image: "/images/icons/air.png" },
  { id: "road", label: "Road", description: "Domestic road transport", image: "/images/icons/road.png" },
  { id: "courier", label: "Courier", description: "Door-to-door parcels", image: "/images/icons/courier.png" },
  { id: "sharespace", label: "Share the Space", description: "LCL space sharing", image: "/images/icons/sharespace.png" },
  { id: "warehouse", label: "Warehouse", description: "Storage & fulfillment", image: "/images/icons/warehouse.png" },
  { id: "jobs", label: "Jobs", description: "Logistics job board", image: "/images/icons/jobs.png" },
  { id: "rental", label: "Rental", description: "Containers & equipment", image: "/images/icons/rental.png" },
];
