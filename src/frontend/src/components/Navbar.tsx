import { Link, useRouterState } from "@tanstack/react-router";
import { Database, Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { identity, clear } = useInternetIdentity();

  return (
    <nav className="glassmorphism fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg btn-gradient flex items-center justify-center flex-shrink-0">
              <Database className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight">
              Data<span className="gradient-text">Forge</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.to
                    ? "text-cyan-400 bg-cyan-400/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {identity ? (
              <>
                <Link
                  to="/admin"
                  className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  CMS Panel
                </Link>
                <button
                  type="button"
                  onClick={clear}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/contact"
                className="btn-gradient text-white text-sm font-bold px-5 py-2 rounded-full"
              >
                GET STARTED
              </Link>
            )}
          </div>

          <button
            type="button"
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0f1c]">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.to
                    ? "text-cyan-400 bg-cyan-400/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2">
              {identity ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-cyan-400"
                  >
                    CMS Panel
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      clear();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-slate-400"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block btn-gradient text-white text-sm font-bold px-5 py-2.5 rounded-full text-center mt-2"
                >
                  GET STARTED
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
