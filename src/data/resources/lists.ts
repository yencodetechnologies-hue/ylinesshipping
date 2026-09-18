export interface DirectoryEntry {
  name: string;
  location: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export const directoryLists: Record<string, DirectoryEntry[]> = {
  "fumigation-companies": [
    { name: "Pacific Fumigation Pvt Ltd", location: "Nhava Sheva, India", phone: "+91 22 4001 2100", email: "ops@pacificfumigation.example", notes: "ISPM-15 wooden packing" },
    { name: "Gulf Pest Control", location: "Jebel Ali, UAE", phone: "+971 4 880 1100", notes: "Container & warehouse" },
    { name: "Rotterdam BioSafe", location: "Rotterdam, Netherlands", email: "desk@rotterdambiosafe.example", notes: "Methyl bromide alternatives" },
    { name: "Singapore Cargo Treat", location: "Pasir Panjang, Singapore", phone: "+65 6271 4400" },
    { name: "LA Harbor Fume Tech", location: "Long Beach, USA", notes: "USDA APHIS partners" },
  ],
  "export-promotion-councils": [
    { name: "EEPC India", location: "New Delhi, India", notes: "Engineering exports" },
    { name: "APEDA", location: "New Delhi, India", notes: "Agricultural & processed food" },
    { name: "GEM & Jewellery EPC", location: "Mumbai, India" },
    { name: "TEXPROCIL", location: "Mumbai, India", notes: "Cotton textiles" },
    { name: "CHEMEXCIL", location: "Mumbai, India", notes: "Chemicals & allied products" },
  ],
  "chamber-of-commerce": [
    { name: "Indian Chamber of Commerce", location: "Kolkata, India", phone: "+91 33 2230 3242" },
    { name: "FICCI", location: "New Delhi, India", email: "info@ficci.example" },
    { name: "Dubai Chamber", location: "Dubai, UAE" },
    { name: "Singapore Business Federation", location: "Singapore" },
    { name: "US Chamber of Commerce", location: "Washington, DC, USA" },
  ],
  "exim-consultants": [
    { name: "TradePath Advisors", location: "Chennai, India", notes: "IEC, DGFT, drawback" },
    { name: "Gulf EXIM Desk", location: "Dubai, UAE", notes: "GCC customs classification" },
    { name: "Atlantic Compliance", location: "Hamburg, Germany", notes: "EU dual-use" },
    { name: "Pacific Trade Partners", location: "Hong Kong", notes: "AEO & origin" },
    { name: "Sahara Logistics Counsel", location: "Mumbai, India" },
  ],
  "financial-institutions": [
    { name: "Export-Import Bank of India", location: "Mumbai, India", notes: "Lines of credit" },
    { name: "ECGC", location: "New Delhi, India", notes: "Export credit insurance" },
    { name: "SBI Trade Finance", location: "Mumbai, India" },
    { name: "Emirates NBD Trade", location: "Dubai, UAE" },
    { name: "HSBC Trade Solutions", location: "London, UK" },
  ],
  "advocates": [
    { name: "Maritime Law Chambers", location: "Mumbai, India", notes: "Bills of lading, arrest" },
    { name: "Customs & Trade Bar", location: "New Delhi, India" },
    { name: "Gulf Shipping Counsel", location: "Dubai, UAE" },
    { name: "Rotterdam Admiralty", location: "Rotterdam, Netherlands" },
    { name: "Singapore Admiralty Desk", location: "Singapore" },
  ],
  "government-schemes": [
    { name: "RoDTEP", location: "India", notes: "Rebate of duties and taxes on exported products" },
    { name: "Advance Authorisation", location: "India", notes: "Duty-free import of inputs" },
    { name: "EPCG", location: "India", notes: "Capital goods at concessional duty" },
    { name: "SEIS", location: "India", notes: "Services exports incentive (sample)" },
    { name: "Duty Drawback", location: "India", notes: "All-industry / brand rate" },
  ],
  "foreign-trade-policies": [
    { name: "India FTP 2023", location: "India", notes: "DGFT handbook of procedures (summary)" },
    { name: "UAE Foreign Trade Policy", location: "UAE", notes: "GCC customs union notes" },
    { name: "EU Common Commercial Policy", location: "European Union" },
    { name: "US Trade Policy Agenda", location: "United States" },
    { name: "ASEAN Trade in Goods", location: "ASEAN" },
  ],
  "universities": [
    { name: "M.Sc. Logistics — IIM Mumbai (sample)", location: "Mumbai, India", notes: "Supply chain focus" },
    { name: "M.A. International Trade — JNU", location: "New Delhi, India" },
    { name: "MSc Maritime — Erasmus UPT", location: "Rotterdam, Netherlands" },
    { name: "MSc Shipping — NUS", location: "Singapore" },
    { name: "LLM Maritime Law — Swansea", location: "United Kingdom" },
  ],
  "insurance-companies": [
    { name: "New India Assurance — Marine", location: "Mumbai, India" },
    { name: "ICICI Lombard Marine", location: "Mumbai, India" },
    { name: "Allianz Marine", location: "Munich, Germany" },
    { name: "AXA XL Cargo", location: "Paris, France" },
    { name: "Oman Insurance Marine", location: "Dubai, UAE" },
  ],
  "licences-permits": [
    { name: "IEC (Importer Exporter Code)", location: "India", notes: "DGFT — mandatory for EXIM" },
    { name: "AD Code / Bank registration", location: "India" },
    { name: "FSSAI import licence", location: "India", notes: "Food products" },
    { name: "Drug licence (CDSCO)", location: "India" },
    { name: "AEO status", location: "India / WCO", notes: "Authorised Economic Operator" },
  ],
  "special-equipment": [
    { name: "40' Reefer — sale / lease", location: "Mundra, India", notes: "Star Cool, 2020 build" },
    { name: "Flat rack 40'", location: "Jebel Ali, UAE", notes: "OOG project cargo" },
    { name: "Open top 20'", location: "Rotterdam, Netherlands" },
    { name: "Genset 15 kVA", location: "Chennai, India", notes: "Reefer power" },
    { name: "Spreader 40t", location: "Singapore", notes: "Yard hire" },
  ],
  "educational-institutions": [
    { name: "Indian Institute of Foreign Trade", location: "New Delhi, India" },
    { name: "CII Institute of Logistics", location: "Chennai, India" },
    { name: "World Maritime University", location: "Malmö, Sweden" },
    { name: "NUS Centre for Maritime Studies", location: "Singapore" },
    { name: "Lloyd's Maritime Academy", location: "London, UK" },
  ],
};

export const directoryIndex = [
  { slug: "fumigation-companies", label: "Fumigation Companies" },
  { slug: "export-promotion-councils", label: "Export Promotion Councils" },
  { slug: "chamber-of-commerce", label: "Chamber of Commerce" },
  { slug: "exim-consultants", label: "EXIM Consultants" },
  { slug: "financial-institutions", label: "Financial Institutions" },
  { slug: "advocates", label: "Advocates" },
  { slug: "government-schemes", label: "Government Schemes" },
  { slug: "foreign-trade-policies", label: "Foreign Trade Policies" },
  { slug: "universities", label: "University Courses" },
  { slug: "insurance-companies", label: "Insurance Companies" },
  { slug: "licences-permits", label: "Licences & Permits" },
  { slug: "special-equipment", label: "Rental / Sale Equipment" },
  { slug: "educational-institutions", label: "Educational Institutions" },
];
