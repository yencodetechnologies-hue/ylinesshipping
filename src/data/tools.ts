import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  Ship,
  Container,
  Ruler,
  BookUser,
  Link2,
  SprayCan,
  Landmark,
  Building2,
  Briefcase,
  PiggyBank,
  Scale,
  FileBadge,
  CalendarDays,
  ScrollText,
  GraduationCap,
  FileCheck,
  Shield,
  Stamp,
  Anchor,
  MapPin,
  Forklift,
  Hash,
  School,
} from "lucide-react";

export type ToolKind = "tool" | "list";

export interface TradeTool {
  id: string;
  slug: string;
  label: string;
  description: string;
  icon: LucideIcon;
  kind: ToolKind;
}

export const tools: TradeTool[] = [
  { id: "currency", slug: "currency-exchange", label: "Currency Exchange", description: "Convert major trade currencies", icon: Banknote, kind: "tool" },
  { id: "vessel", slug: "vessel-tracking", label: "Vessel Tracking", description: "Look up sample vessel voyages", icon: Ship, kind: "tool" },
  { id: "container", slug: "container-tracking", label: "Container Tracking", description: "Dummy container status", icon: Container, kind: "tool" },
  { id: "cbm", slug: "cbm-calculator", label: "Units / CBM Calculator", description: "Volume and volumetric weight", icon: Ruler, kind: "tool" },
  { id: "directory", slug: "directory", label: "Directory", description: "All trade directories", icon: BookUser, kind: "list" },
  { id: "links", slug: "useful-links", label: "Other Useful Links", description: "Official trade portals", icon: Link2, kind: "tool" },
  { id: "fumigation", slug: "fumigation-companies", label: "Fumigation Companies", description: "Pest control for cargo", icon: SprayCan, kind: "list" },
  { id: "epc", slug: "export-promotion-councils", label: "Export Promotion Councils", description: "Sector EPCs", icon: Landmark, kind: "list" },
  { id: "chamber", slug: "chamber-of-commerce", label: "Chamber of Commerce", description: "Chamber contacts", icon: Building2, kind: "list" },
  { id: "exim", slug: "exim-consultants", label: "EXIM Consultants", description: "Export-import advisors", icon: Briefcase, kind: "list" },
  { id: "finance", slug: "financial-institutions", label: "Financial Institutions", description: "Banks and EXIM finance", icon: PiggyBank, kind: "list" },
  { id: "advocates", slug: "advocates", label: "Advocates", description: "Trade and customs lawyers", icon: Scale, kind: "list" },
  { id: "schemes", slug: "government-schemes", label: "Government Schemes", description: "Export incentives", icon: FileBadge, kind: "list" },
  { id: "holidays", slug: "holidays", label: "Holidays by Location", description: "Public holidays by country", icon: CalendarDays, kind: "tool" },
  { id: "ftp", slug: "foreign-trade-policies", label: "Foreign Trade Policies", description: "FTP summaries", icon: ScrollText, kind: "list" },
  { id: "university", slug: "universities", label: "University Courses", description: "Logistics and trade courses", icon: GraduationCap, kind: "list" },
  { id: "docs", slug: "export-documents", label: "Basic Export Documents", description: "Documents checklist", icon: FileCheck, kind: "tool" },
  { id: "insurance", slug: "insurance-companies", label: "Insurance Companies", description: "Marine cargo cover", icon: Shield, kind: "list" },
  { id: "licence", slug: "licences-permits", label: "Licences & Permits", description: "Trade licences", icon: Stamp, kind: "list" },
  { id: "ports", slug: "ports-airports", label: "Sea Ports & Airports", description: "Ports by country", icon: Anchor, kind: "tool" },
  { id: "pincodes", slug: "pincodes", label: "World Pincodes", description: "Sample postal codes", icon: MapPin, kind: "tool" },
  { id: "equipment", slug: "special-equipment", label: "Rental / Sale Equipment", description: "Special cargo equipment", icon: Forklift, kind: "list" },
  { id: "hs", slug: "hs-code-list", label: "HS Code List", description: "Sample HS codes", icon: Hash, kind: "tool" },
  { id: "edu", slug: "educational-institutions", label: "Educational Institutions", description: "Training institutes", icon: School, kind: "list" },
];

export function getToolBySlug(slug: string) {
  return tools.find((t) => t.slug === slug);
}
