import { Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import type { TeamMember } from "../backend";
import AnimatedSection from "../components/AnimatedSection";
import { useActor } from "../hooks/useActor";

const defaultTeam: TeamMember[] = [
  {
    id: 1n,
    name: "Karan Vishwakarma",
    role: "CEO & Founder",
    bio: "Visionary entrepreneur with deep expertise in data strategy and enterprise analytics. Founded DataForge to make world-class data intelligence accessible to every organization.",
    order: 1n,
    isActive: true,
  },
  {
    id: 2n,
    name: "Neha Soni",
    role: "Co-Founder",
    bio: "Strategic leader and data innovator. Co-founded DataForge with a passion for transforming raw data into actionable insights that drive measurable business growth.",
    order: 2n,
    isActive: true,
  },
  {
    id: 3n,
    name: "Marcus Williams",
    role: "Lead Data Engineer",
    bio: "Full-stack data architect specializing in large-scale web scraping infrastructure and ETL pipeline design. 10+ years in distributed systems.",
    order: 3n,
    isActive: true,
  },
  {
    id: 4n,
    name: "Priya Sharma",
    role: "Client Success Director",
    bio: "Dedicated to ensuring every DataForge client achieves measurable ROI. Expert in data strategy consulting and project management.",
    order: 4n,
    isActive: true,
  },
];

const values = [
  {
    title: "Precision",
    desc: "Every data point we deliver meets rigorous quality standards with 99.9% accuracy SLAs.",
  },
  {
    title: "Transparency",
    desc: "We believe in open communication, clear deliverables, and no hidden surprises.",
  },
  {
    title: "Innovation",
    desc: "Continuously evolving our methods using cutting-edge AI and automation technologies.",
  },
  {
    title: "Global Reach",
    desc: "Operating across 50+ countries, we understand data in its local and global context.",
  },
];

export default function About() {
  const { actor } = useActor();
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    if (!actor) return;
    actor
      .getTeam()
      .then((t) =>
        setTeam(
          t
            .filter((m) => m.isActive)
            .sort((a, b) => Number(a.order) - Number(b.order)),
        ),
      );
  }, [actor]);

  const displayTeam = team.length > 0 ? team : defaultTeam;

  return (
    <div className="pt-24">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
              Our Story
            </p>
            <h1 className="section-title text-white mb-4">
              Built by data <span className="gradient-text">obsessives</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              DataForge was founded on a simple belief: that every organization
              deserves access to world-class data intelligence, not just
              enterprises with massive budgets.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="df-card p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-white font-extrabold text-2xl mb-4">
                A decade of turning chaos into clarity
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Founded in 2015, DataForge emerged from the frustration of
                seeing valuable business decisions made on incomplete or
                unreliable data. Our founders &mdash; veterans of the data
                industry &mdash; set out to build a firm that prioritized
                accuracy, speed, and strategic value above all.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Today, we serve clients across 50+ countries, from early-stage
                startups to multinational corporations. Our team of 50+
                specialists brings domain expertise in ESG research, alternative
                data, and enterprise data operations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "2015", l: "Year Founded" },
                { n: "50+", l: "Countries Served" },
                { n: "500+", l: "Happy Clients" },
                { n: "$2B+", l: "Client Revenue Impacted" },
              ].map((item) => (
                <div
                  key={item.l}
                  className="p-6 rounded-xl bg-white/3 border border-white/5 text-center"
                >
                  <div className="text-3xl font-black gradient-text mb-1">
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
      </section>

      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-center section-title text-white mb-10">
            Our <span className="gradient-text">Values</span>
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 80}>
              <div className="df-card p-6">
                <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
              The Team
            </p>
            <h2 className="section-title text-white">
              Meet Our <span className="gradient-text">Leadership</span>
            </h2>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayTeam.map((member, i) => (
            <AnimatedSection key={member.id.toString()} delay={i * 80}>
              <div className="df-card p-6 text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-black text-xl"
                  style={{
                    background: "linear-gradient(135deg, #2f7bff, #22d3ee)",
                  }}
                >
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <h3 className="text-white font-bold text-base mb-1">
                  {member.name}
                </h3>
                <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  {member.role}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
