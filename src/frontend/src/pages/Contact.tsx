import {
  CheckCircle2,
  Clock,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedSection from "../components/AnimatedSection";
import { useActor } from "../hooks/useActor";
import type { ContactInfo } from "../types/contactInfo";

const DEFAULT_CONTACT: ContactInfo = {
  phone: "+91 7987254547",
  email: "hello@dataforge.ai",
  enterpriseEmail: "enterprise@dataforge.ai",
  linkedIn: "",
  twitter: "",
  instagram: "",
  address: "Sagar, Madhya Pradesh",
  city: "India 470002",
};

export default function Contact() {
  const { actor, isFetching } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [contactInfo, setContactInfo] = useState<ContactInfo>(DEFAULT_CONTACT);
  const [loadingContact, setLoadingContact] = useState(true);

  useEffect(() => {
    if (isFetching) return;
    if (!actor) {
      setLoadingContact(false);
      return;
    }
    (actor as any)
      .getContactInfo()
      .then((ci) => {
        if (ci) {
          setContactInfo({
            phone: ci.phone || DEFAULT_CONTACT.phone,
            email: ci.email || DEFAULT_CONTACT.email,
            enterpriseEmail:
              ci.enterpriseEmail || DEFAULT_CONTACT.enterpriseEmail,
            linkedIn: ci.linkedIn || "",
            twitter: ci.twitter || "",
            instagram: ci.instagram || "",
            address: ci.address || DEFAULT_CONTACT.address,
            city: ci.city || DEFAULT_CONTACT.city,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoadingContact(false));
  }, [actor, isFetching]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      setFormError("Please wait a moment and try again.");
      return;
    }
    setSending(true);
    setFormError("");
    try {
      await (actor as any).submitContactForm({
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
                    {loadingContact ? (
                      <div className="space-y-1">
                        <div className="h-4 w-40 bg-white/5 rounded animate-pulse" />
                        <div className="h-4 w-44 bg-white/5 rounded animate-pulse" />
                      </div>
                    ) : (
                      <>
                        <p className="text-slate-400 text-sm">
                          {contactInfo.email}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {contactInfo.enterpriseEmail}
                        </p>
                      </>
                    )}
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
                    {loadingContact ? (
                      <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
                    ) : (
                      <p className="text-slate-400 text-sm">
                        {contactInfo.phone}
                      </p>
                    )}
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
                    {loadingContact ? (
                      <div className="space-y-1">
                        <div className="h-4 w-36 bg-white/5 rounded animate-pulse" />
                        <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
                      </div>
                    ) : (
                      <>
                        <p className="text-slate-400 text-sm">
                          {contactInfo.address}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {contactInfo.city}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {!loadingContact && contactInfo.linkedIn && (
              <AnimatedSection delay={220}>
                <a
                  href={contactInfo.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="df-card p-6 flex items-start gap-4 hover:border-cyan-400/30 transition-all block"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      LinkedIn
                    </p>
                    <p className="text-slate-400 text-sm truncate max-w-[180px]">
                      {contactInfo.linkedIn}
                    </p>
                  </div>
                </a>
              </AnimatedSection>
            )}

            {!loadingContact && contactInfo.twitter && (
              <AnimatedSection delay={260}>
                <a
                  href={contactInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="df-card p-6 flex items-start gap-4 hover:border-cyan-400/30 transition-all block"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <Twitter className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      Twitter / X
                    </p>
                    <p className="text-slate-400 text-sm truncate max-w-[180px]">
                      {contactInfo.twitter}
                    </p>
                  </div>
                </a>
              </AnimatedSection>
            )}

            {!loadingContact && contactInfo.instagram && (
              <AnimatedSection delay={300}>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="df-card p-6 flex items-start gap-4 hover:border-cyan-400/30 transition-all block"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">
                      Instagram
                    </p>
                    <p className="text-slate-400 text-sm truncate max-w-[180px]">
                      {contactInfo.instagram}
                    </p>
                  </div>
                </a>
              </AnimatedSection>
            )}

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
                          data-ocid="contact.input"
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
                      <p
                        className="text-red-400 text-sm"
                        data-ocid="contactform.error_state"
                      >
                        {formError}
                      </p>
                    )}
                    <button
                      type="submit"
                      data-ocid="contactform.submit_button"
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
