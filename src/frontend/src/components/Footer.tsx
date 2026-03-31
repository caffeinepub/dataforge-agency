import { Link } from "@tanstack/react-router";
import { Database, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#070b14] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight">
                Data<span className="gradient-text">Forge</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Transforming raw data into strategic insights for forward-thinking
              enterprises across the globe.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {(
                [
                  ["Home", "/"],
                  ["Services", "/services"],
                  ["About", "/about"],
                  ["Contact", "/contact"],
                ] as [string, string][]
              ).map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "ESG Research",
                "Data Mining",
                "Web Scraping",
                "Lead Generation",
                "Data Entry",
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; 2026 DataForge. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">Powered by Internet Computer</p>
        </div>
      </div>
    </footer>
  );
}
