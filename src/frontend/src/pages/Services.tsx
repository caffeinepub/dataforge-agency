import {
  CheckCircle2,
  ClipboardList,
  Database,
  Globe2,
  Leaf,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Service } from "../backend";
import AnimatedSection from "../components/AnimatedSection";
import { useActor } from "../hooks/useActor";

const iconMap: Record<string, React.ReactNode> = {
  leaf: <Leaf className="w-8 h-8 text-cyan-400" />,
  database: <Database className="w-8 h-8 text-cyan-400" />,
  globe: <Globe2 className="w-8 h-8 text-cyan-400" />,
  mail: <Mail className="w-8 h-8 text-cyan-400" />,
  clipboard: <ClipboardList className="w-8 h-8 text-cyan-400" />,
};

const serviceFeatures: Record<string, string[]> = {
  leaf: [
    "TCFD & GRI framework alignment",
    "ESG scoring & benchmarking",
    "Carbon footprint analytics",
    "Regulatory compliance tracking",
  ],
  database: [
    "Structured & unstructured data extraction",
    "Pattern recognition & anomaly detection",
    "Custom ML pipeline design",
    "Historical data analysis",
  ],
  globe: [
    "High-volume automated scraping",
    "Anti-bot bypass & JS rendering",
    "Structured JSON/CSV output",
    "Real-time monitoring & alerts",
  ],
  mail: [
    "B2B prospect database building",
    "Email verification & validation",
    "LinkedIn & social data enrichment",
    "CRM-ready data exports",
  ],
  clipboard: [
    "Bulk data entry & indexing",
    "OCR & document digitization",
    "Data cleaning & normalization",
    "Multi-format transformation",
  ],
};

const defaultServices: Service[] = [
  {
    id: 1n,
    title: "ESG & Sustainability Data Research",
    description:
      "Comprehensive ESG data collection, scoring, and sustainability analytics tailored for investors, corporations, and regulators navigating the evolving landscape of responsible business.",
    icon: "leaf",
    order: 1n,
    isActive: true,
  },
  {
    id: 2n,
    title: "Data Mining",
    description:
      "Leverage advanced algorithms and machine learning to uncover hidden patterns, correlations, and insights buried within your structured and unstructured data sources.",
    icon: "database",
    order: 2n,
    isActive: true,
  },
  {
    id: 3n,
    title: "Web Scraping",
    description:
      "Scalable, intelligent web data extraction services that gather competitive intelligence, pricing data, product listings, and more — delivered clean and structured.",
    icon: "globe",
    order: 3n,
    isActive: true,
  },
  {
    id: 4n,
    title: "Lead Generation & Email Finding",
    description:
      "Build high-quality prospect lists with verified contact information. We use multi-source enrichment to deliver B2B leads ready for your sales and marketing teams.",
    icon: "mail",
    order: 4n,
    isActive: true,
  },
  {
    id: 5n,
    title: "Data Entry & Processing",
    description:
      "Accurate, scalable data entry, document processing, and transformation services. From raw inputs to structured databases, we handle any volume with precision.",
    icon: "clipboard",
    order: 5n,
    isActive: true,
  },
];

export default function Services() {
  const { actor } = useActor();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!actor) return;
    actor
      .getServices()
      .then((s) =>
        setServices(
          s
            .filter((x) => x.isActive)
            .sort((a, b) => Number(a.order) - Number(b.order)),
        ),
      );
  }, [actor]);

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <div className="pt-24">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
              Our Services
            </p>
            <h1 className="section-title text-white mb-4">
              Comprehensive{" "}
              <span className="gradient-text">Data Solutions</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              From raw data collection to strategic insights, DataForge provides
              end-to-end data services for enterprises that demand excellence.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {displayServices.map((service, i) => (
            <AnimatedSection key={service.id.toString()} delay={i * 100}>
              <div className="df-card p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                        {iconMap[service.icon] ?? (
                          <Database className="w-8 h-8 text-cyan-400" />
                        )}
                      </div>
                      <div>
                        <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
                          Service {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="text-white font-extrabold text-xl">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-slate-300 text-sm font-semibold uppercase tracking-wider mb-4">
                      What&apos;s Included
                    </p>
                    <ul className="space-y-3">
                      {(serviceFeatures[service.icon] ?? []).map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-3 text-slate-400 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
