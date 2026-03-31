import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  ClipboardList,
  Database,
  Globe2,
  Leaf,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ContentState, Service } from "../backend";
import AnimatedSection from "../components/AnimatedSection";
import { useActor } from "../hooks/useActor";

const iconMap: Record<string, React.ReactNode> = {
  leaf: <Leaf className="w-6 h-6 text-cyan-400" />,
  database: <Database className="w-6 h-6 text-cyan-400" />,
  globe: <Globe2 className="w-6 h-6 text-cyan-400" />,
  mail: <Mail className="w-6 h-6 text-cyan-400" />,
  clipboard: <ClipboardList className="w-6 h-6 text-cyan-400" />,
};

const defaultContent: ContentState = {
  heroHeadline: "FORGE YOUR DATA INTO STRATEGY",
  heroSubheading:
    "Enterprise-grade data research and analytics that transforms raw information into competitive intelligence. We help global businesses make decisions with confidence.",
  tagline: "Turning Data Into Your Competitive Edge",
  aboutText:
    "DataForge is a premier data research and analytics agency trusted by enterprises worldwide. We combine cutting-edge technology with deep domain expertise to deliver actionable insights.",
  ctaButtonText: "Explore Solutions",
};

const stats = [
  { value: "500+", label: "CLIENTS SERVED" },
  { value: "150+", label: "DATASETS BUILT" },
  { value: "20+", label: "INDUSTRIES COVERED" },
  { value: "98%", label: "PROJECT ACCURACY" },
];

const trustedBy = ["Google", "Microsoft", "IBM", "Salesforce", "Oracle", "AWS"];

const fallbackServices: Service[] = [
  {
    id: 1n,
    title: "ESG & Sustainability Research",
    description:
      "Deep ESG data research and sustainability analytics for responsible investment decisions.",
    icon: "leaf",
    order: 1n,
    isActive: true,
  },
  {
    id: 2n,
    title: "Data Mining",
    description:
      "Extract patterns and insights from vast datasets using advanced ML-powered pipelines.",
    icon: "database",
    order: 2n,
    isActive: true,
  },
  {
    id: 3n,
    title: "Web Scraping",
    description:
      "Automated, large-scale web data extraction with structured output and real-time monitoring.",
    icon: "globe",
    order: 3n,
    isActive: true,
  },
  {
    id: 4n,
    title: "Lead Generation & Email Finding",
    description:
      "Precision-targeted lead lists with verified contact data for B2B sales acceleration.",
    icon: "mail",
    order: 4n,
    isActive: true,
  },
  {
    id: 5n,
    title: "Data Entry & Processing",
    description:
      "High-accuracy data entry, cleaning, and transformation at any scale, any format.",
    icon: "clipboard",
    order: 5n,
    isActive: true,
  },
];

export default function Home() {
  const { actor } = useActor();
  const [services, setServices] = useState<Service[]>([]);
  const [content, setContent] = useState<ContentState>(defaultContent);

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
    actor.getContent().then(setContent);
  }, [actor]);

  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid-bg">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[800px] h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
            }}
          />
        </div>
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(47,123,255,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {content.tagline}
          </div>

          <h1
            className="font-black tracking-tighter uppercase mb-6 leading-none"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            <span className="gradient-text">{content.heroHeadline}</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            {content.heroSubheading}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services"
              className="btn-gradient text-white font-bold px-8 py-4 rounded-full flex items-center gap-2"
            >
              {content.ctaButtonText} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              Learn More <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="stat-number gradient-text">{s.value}</div>
                <div className="text-slate-500 text-xs font-semibold tracking-widest mt-1 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2 className="section-title text-white mb-4">
              Our Advanced <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Comprehensive data services engineered for enterprise-scale
              challenges across every industry.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((s, i) => (
            <AnimatedSection key={s.id.toString()} delay={i * 80}>
              <div className="df-card p-6 h-full">
                <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-5">
                  {iconMap[s.icon] ?? (
                    <Database className="w-6 h-6 text-cyan-400" />
                  )}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {s.description}
                </p>
                <Link
                  to="/services"
                  className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest mb-10">
            Trusted By Industry Leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {trustedBy.map((brand) => (
              <span
                key={brand}
                className="text-slate-600 font-bold text-lg hover:text-slate-400 transition-colors cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About blurb */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
              About DataForge
            </p>
            <h2 className="section-title text-white mb-6">
              Data intelligence at{" "}
              <span className="gradient-text">global scale</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              {content.aboutText}
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Our team of data scientists, engineers, and researchers operate at
              the intersection of technology and business strategy, delivering
              results that move the needle.
            </p>
            <Link
              to="/about"
              className="btn-gradient text-white font-bold px-6 py-3 rounded-full inline-flex items-center gap-2"
            >
              Meet the Team <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="df-card p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { n: "10+", l: "Years of Experience" },
                  { n: "50+", l: "Expert Researchers" },
                  { n: "99.9%", l: "Data Accuracy SLA" },
                  { n: "24/7", l: "Dedicated Support" },
                ].map((item) => (
                  <div
                    key={item.l}
                    className="text-center p-4 rounded-xl border border-white/5"
                  >
                    <div className="text-2xl font-black gradient-text mb-1">
                      {item.n}
                    </div>
                    <div className="text-slate-500 text-xs font-medium">
                      {item.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div
              className="df-card p-12"
              style={{
                background:
                  "linear-gradient(135deg, rgba(47,123,255,0.1) 0%, rgba(34,211,238,0.08) 100%)",
                borderColor: "rgba(34,211,238,0.25)",
              }}
            >
              <h2 className="section-title text-white mb-4">
                Ready to forge your{" "}
                <span className="gradient-text">data advantage</span>?
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Let's discuss how DataForge can turn your data challenges into
                strategic opportunities.
              </p>
              <Link
                to="/contact"
                className="btn-gradient text-white font-bold px-8 py-4 rounded-full inline-flex items-center gap-2"
              >
                Start a Conversation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
