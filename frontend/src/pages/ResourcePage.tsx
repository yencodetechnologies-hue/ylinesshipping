import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";
import ResourceList from "../components/resources/ResourceList";
import {
  CbmTool,
  ContainerTool,
  CurrencyTool,
  ExportDocsTool,
  HolidaysTool,
  HsCodeTool,
  PincodesTool,
  PortsTool,
  UsefulLinksTool,
  VesselTool,
} from "../components/resources/ResourceTools";
import { getToolBySlug } from "../data/tools";

function ToolBody({ slug }: { slug: string }) {
  switch (slug) {
    case "currency-exchange":
      return <CurrencyTool />;
    case "cbm-calculator":
      return <CbmTool />;
    case "vessel-tracking":
      return <VesselTool />;
    case "container-tracking":
      return <ContainerTool />;
    case "holidays":
      return <HolidaysTool />;
    case "useful-links":
      return <UsefulLinksTool />;
    case "export-documents":
      return <ExportDocsTool />;
    case "hs-code-list":
      return <HsCodeTool />;
    case "ports-airports":
      return <PortsTool />;
    case "pincodes":
      return <PincodesTool />;
    default:
      return <ResourceList slug={slug} />;
  }
}

export default function ResourcePage() {
  const { slug = "" } = useParams();
  const tool = getToolBySlug(slug);

  return (
    <>
      <main className="flex-1 bg-app-bg">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link to="/#resources" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            <ArrowLeft size={16} /> All resources
          </Link>
          {tool ? (
            <>
              <h1 className="mt-4 font-display text-2xl font-bold text-text-primary">{tool.label}</h1>
              <p className="mt-1 mb-6 text-sm text-text-secondary">{tool.description}</p>
              <ToolBody slug={slug} />
            </>
          ) : (
            <>
              <h1 className="mt-4 font-display text-2xl font-bold">Page not found</h1>
              <p className="mt-2 text-sm text-text-secondary">This resource does not exist.</p>
              <Link to="/" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
                Back home
              </Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
