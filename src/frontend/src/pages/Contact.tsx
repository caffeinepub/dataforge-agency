import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import { useActor } from "../hooks/useActor";

export default function Contact() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      setFormError("Service unavailable. Please try again shortly.");
      return;
    }
    setSending(true);
    setFormError("");
    try {
      await actor.submitContactForm({
        id: 0n,
        name: form.name,
        email: form.email,
        company: form.company,
        message: form.message,
        timestamp: BigInt(Date.now()),
      });
      setSuccess(true);
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-24">
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
              Get In Touch
            </p>
            <h1 className="section-title text-white mb-4">
              Let's build something{" "}
              <span className="gradient-text">great together</span>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              Tell us about your data challenges. Our team will respond within
              24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <AnimatedSection>
              <div className="df-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      Email Us
                    </p>
                    <p className="text-slate-400 text-sm">hello@dataforge.ai</p>
                    <p className="text-slate-400 text-sm">
                      enterprise@dataforge.ai
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <div className="df-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      Call Us
                    </p>
                    <p className="text-slate-400 text-sm">+91 7987254547</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <div className="df-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      Our Office
                    </p>
                    <p className="text-slate-400 text-sm">
                      Sagar, Madhya Pradesh
                    </p>
                    <p className="text-slate-400 text-sm">India 470002</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={240}>
              <div className="df-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      Response Time
                    </p>
                    <p className="text-slate-400 text-sm">
                      Within 24 hours guaranteed
                    </p>
                    <p className="text-slate-400 text-sm">
                      Enterprise: Same-day SLA
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-3">
            <AnimatedSection delay={150}>
              <div className="df-card p-8">
                {success ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-slate-400">
                      We'll be in touch within 24 hours. Thank you for reaching
                      out.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSuccess(false)}
                      className="mt-6 btn-gradient text-white font-semibold px-6 py-2.5 rounded-full"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-white font-bold text-xl mb-6">
                      Send a Message
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-slate-300 text-sm font-medium mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-slate-300 text-sm font-medium mb-1.5"
                        >
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-slate-300 text-sm font-medium mb-1.5"
                      >
                        Company
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={form.company}
                        onChange={(e) =>
                          setForm({ ...form, company: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-slate-300 text-sm font-medium mb-1.5"
                      >
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all resize-none"
                        placeholder="Tell us about your data needs..."
                      />
                    </div>
                    {formError && (
                      <p className="text-red-400 text-sm">{formError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-gradient text-white font-bold px-8 py-3.5 rounded-full w-full disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
