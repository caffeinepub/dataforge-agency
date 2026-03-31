import {
  Database,
  FileText,
  Key,
  LogIn,
  MessageSquare,
  Pencil,
  Plus,
  Save,
  Shield,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type {
  ContactSubmission,
  ContentState,
  Service,
  TeamMember,
} from "../backend";
import AnimatedSection from "../components/AnimatedSection";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

type Tab = "content" | "services" | "team" | "submissions";

export default function Admin() {
  const { actor } = useActor();
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("content");

  // Admin claim state
  const [adminSecret, setAdminSecret] = useState("");
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState("");

  const [content, setContent] = useState<ContentState>({
    heroHeadline: "",
    heroSubheading: "",
    tagline: "",
    aboutText: "",
    ctaButtonText: "",
  });
  const [contentSaving, setContentSaving] = useState(false);
  const [contentSaved, setContentSaved] = useState(false);

  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    if (!actor || !identity) {
      setIsAdmin(null);
      return;
    }
    actor.isCallerAdmin().then(setIsAdmin);
  }, [actor, identity]);

  const loadData = useCallback(async () => {
    if (!actor) return;
    const [s, t, c, sub] = await Promise.all([
      actor.getServices(),
      actor.getTeam(),
      actor.getContent(),
      actor.getContactSubmissions().catch(() => [] as ContactSubmission[]),
    ]);
    setServices(s.sort((a, b) => Number(a.order) - Number(b.order)));
    setTeam(t.sort((a, b) => Number(a.order) - Number(b.order)));
    setContent(c);
    setSubmissions(sub);
  }, [actor]);

  useEffect(() => {
    if (isAdmin) loadData();
  }, [isAdmin, loadData]);

  const claimAdmin = async () => {
    if (!actor || !adminSecret.trim()) return;
    setClaiming(true);
    setClaimError("");
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const success: boolean = await (actor as any).claimAdminWithPassword(
        adminSecret.trim(),
      );
      if (success) {
        setIsAdmin(true);
      } else {
        setClaimError("Invalid password. Please try again.");
      }
    } catch {
      setClaimError("Invalid password. Please try again.");
    } finally {
      setClaiming(false);
    }
  };

  const saveContent = async () => {
    if (!actor) return;
    setContentSaving(true);
    try {
      await actor.updateContent(content);
      setContentSaved(true);
      setTimeout(() => setContentSaved(false), 3000);
    } finally {
      setContentSaving(false);
    }
  };

  const deleteService = async (id: bigint) => {
    if (!actor || !confirm("Delete this service?")) return;
    await actor.deleteService(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const saveService = async (service: Service) => {
    if (!actor) return;
    if (service.id === 0n) {
      const id = await actor.createService(service);
      setServices((prev) => [...prev, { ...service, id }]);
    } else {
      await actor.updateService(service);
      setServices((prev) =>
        prev.map((s) => (s.id === service.id ? service : s)),
      );
    }
    setEditingService(null);
  };

  const deleteMember = async (id: bigint) => {
    if (!actor || !confirm("Delete this team member?")) return;
    await actor.deleteTeamMember(id);
    setTeam((prev) => prev.filter((m) => m.id !== id));
  };

  const saveMember = async (member: TeamMember) => {
    if (!actor) return;
    if (member.id === 0n) {
      const id = await actor.createTeamMember(member);
      setTeam((prev) => [...prev, { ...member, id }]);
    } else {
      await actor.updateTeamMember(member);
      setTeam((prev) => prev.map((m) => (m.id === member.id ? member : m)));
    }
    setEditingMember(null);
  };

  if (!identity) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <AnimatedSection>
          <div className="df-card p-10 max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-2xl btn-gradient flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white font-extrabold text-2xl mb-2">
              Admin CMS Panel
            </h1>
            <p className="text-slate-400 mb-8">
              Sign in with Internet Identity to access the content management
              panel.
            </p>
            <button
              type="button"
              onClick={login}
              disabled={isLoggingIn}
              className="btn-gradient text-white font-bold px-8 py-3.5 rounded-full w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <LogIn className="w-4 h-4" />
              {isLoggingIn ? "Connecting..." : "Sign In with Internet Identity"}
            </button>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  if (isAdmin === null) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Verifying access...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-4">
        <AnimatedSection>
          <div className="df-card p-10 max-w-md w-full">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-4">
                <Key className="w-8 h-8 text-cyan-400" />
              </div>
              <h1 className="text-white font-extrabold text-2xl mb-2">
                Claim Admin Access
              </h1>
              <p className="text-slate-400 text-sm">
                Enter your admin password to gain access to the CMS panel.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="admin-secret"
                  className="block text-slate-300 text-sm font-medium mb-1.5"
                >
                  Admin Password
                </label>
                <input
                  id="admin-secret"
                  type="password"
                  value={adminSecret}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && claimAdmin()}
                  placeholder="Enter your admin password..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                />
              </div>
              {claimError && (
                <p className="text-red-400 text-sm">{claimError}</p>
              )}
              <button
                type="button"
                onClick={claimAdmin}
                disabled={claiming || !adminSecret.trim()}
                className="btn-gradient text-white font-bold px-8 py-3.5 rounded-full w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Shield className="w-4 h-4" />
                {claiming ? "Verifying..." : "Claim Admin Access"}
              </button>
            </div>
            <p className="text-slate-500 text-xs text-center mt-6">
              Contact your administrator for the password.
            </p>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "content",
      label: "Site Content",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "services",
      label: "Services",
      icon: <Database className="w-4 h-4" />,
    },
    { id: "team", label: "Team", icon: <Users className="w-4 h-4" /> },
    {
      id: "submissions",
      label: "Inquiries",
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-white font-extrabold text-3xl mb-1">
          CMS <span className="gradient-text">Panel</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Manage your website content, services, and team.
        </p>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "btn-gradient text-white"
                : "bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "content" && (
        <div className="df-card p-8 max-w-2xl">
          <h2 className="text-white font-bold text-xl mb-6">
            Edit Site Content
          </h2>
          <div className="space-y-5">
            {(
              [
                ["Hero Headline", "heroHeadline"],
                ["Hero Subheading", "heroSubheading"],
                ["Tagline", "tagline"],
                ["CTA Button Text", "ctaButtonText"],
              ] as [string, keyof ContentState][]
            ).map(([label, key]) => (
              <div key={key}>
                <label
                  htmlFor={`content-${key}`}
                  className="block text-slate-300 text-sm font-medium mb-1.5"
                >
                  {label}
                </label>
                <input
                  id={`content-${key}`}
                  type="text"
                  value={content[key]}
                  onChange={(e) =>
                    setContent({ ...content, [key]: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50 transition-all"
                />
              </div>
            ))}
            <div>
              <label
                htmlFor="content-aboutText"
                className="block text-slate-300 text-sm font-medium mb-1.5"
              >
                About Text
              </label>
              <textarea
                id="content-aboutText"
                rows={4}
                value={content.aboutText}
                onChange={(e) =>
                  setContent({ ...content, aboutText: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50 transition-all resize-none"
              />
            </div>
            <button
              type="button"
              onClick={saveContent}
              disabled={contentSaving}
              className="btn-gradient text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {contentSaved
                ? "Saved!"
                : contentSaving
                  ? "Saving..."
                  : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {activeTab === "services" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold text-xl">Manage Services</h2>
            <button
              type="button"
              onClick={() =>
                setEditingService({
                  id: 0n,
                  title: "",
                  description: "",
                  icon: "database",
                  order: BigInt(services.length + 1),
                  isActive: true,
                })
              }
              className="btn-gradient text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Service
            </button>
          </div>
          {editingService && (
            <ServiceForm
              service={editingService}
              onSave={saveService}
              onCancel={() => setEditingService(null)}
            />
          )}
          <div className="space-y-4">
            {services.map((s) => (
              <div
                key={s.id.toString()}
                className="df-card p-5 flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold truncate">
                      {s.title}
                    </span>
                    {!s.isActive && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm truncate">
                    {s.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingService(s)}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteService(s.id)}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "team" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold text-xl">Manage Team</h2>
            <button
              type="button"
              onClick={() =>
                setEditingMember({
                  id: 0n,
                  name: "",
                  role: "",
                  bio: "",
                  order: BigInt(team.length + 1),
                  isActive: true,
                })
              }
              className="btn-gradient text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Member
            </button>
          </div>
          {editingMember && (
            <MemberForm
              member={editingMember}
              onSave={saveMember}
              onCancel={() => setEditingMember(null)}
            />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((m) => (
              <div key={m.id.toString()} className="df-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm"
                    style={{
                      background: "linear-gradient(135deg, #2f7bff, #22d3ee)",
                    }}
                  >
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditingMember(m)}
                      className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMember(m.id)}
                      className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-white font-semibold text-sm">{m.name}</p>
                <p className="text-cyan-400 text-xs mb-2">{m.role}</p>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "submissions" && (
        <div>
          <h2 className="text-white font-bold text-xl mb-6">
            Contact Inquiries ({submissions.length})
          </h2>
          {submissions.length === 0 ? (
            <div className="df-card p-10 text-center text-slate-400">
              No inquiries yet.
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((sub) => (
                <div key={sub.id.toString()} className="df-card p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-semibold">{sub.name}</p>
                      <p className="text-cyan-400 text-sm">
                        {sub.email} {sub.company && `· ${sub.company}`}
                      </p>
                    </div>
                    <span className="text-slate-500 text-xs">
                      {new Date(Number(sub.timestamp)).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {sub.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ServiceForm({
  service,
  onSave,
  onCancel,
}: {
  service: Service;
  onSave: (s: Service) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Service>(service);
  return (
    <div className="df-card p-6 mb-6">
      <h3 className="text-white font-bold mb-4">
        {service.id === 0n ? "Add New Service" : "Edit Service"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="svc-title"
            className="block text-slate-300 text-sm font-medium mb-1.5"
          >
            Title
          </label>
          <input
            id="svc-title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50"
          />
        </div>
        <div>
          <label
            htmlFor="svc-icon"
            className="block text-slate-300 text-sm font-medium mb-1.5"
          >
            Icon
          </label>
          <select
            id="svc-icon"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-[#0b1426] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50"
          >
            {["leaf", "database", "globe", "mail", "clipboard"].map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="svc-desc"
          className="block text-slate-300 text-sm font-medium mb-1.5"
        >
          Description
        </label>
        <textarea
          id="svc-desc"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50 resize-none"
        />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <input
          id="svc-active"
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          className="rounded"
        />
        <label
          htmlFor="svc-active"
          className="text-slate-300 text-sm cursor-pointer"
        >
          Active (visible on site)
        </label>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onSave(form)}
          className="btn-gradient text-white text-sm font-bold px-5 py-2 rounded-full flex items-center gap-2"
        >
          <Save className="w-3.5 h-3.5" /> Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-white/5 border border-white/10 text-slate-400 text-sm font-medium px-5 py-2 rounded-full flex items-center gap-2 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </button>
      </div>
    </div>
  );
}

function MemberForm({
  member,
  onSave,
  onCancel,
}: {
  member: TeamMember;
  onSave: (m: TeamMember) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<TeamMember>(member);
  return (
    <div className="df-card p-6 mb-6">
      <h3 className="text-white font-bold mb-4">
        {member.id === 0n ? "Add Team Member" : "Edit Member"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="mem-name"
            className="block text-slate-300 text-sm font-medium mb-1.5"
          >
            Name
          </label>
          <input
            id="mem-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50"
          />
        </div>
        <div>
          <label
            htmlFor="mem-role"
            className="block text-slate-300 text-sm font-medium mb-1.5"
          >
            Role / Title
          </label>
          <input
            id="mem-role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50"
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="mem-bio"
          className="block text-slate-300 text-sm font-medium mb-1.5"
        >
          Bio
        </label>
        <textarea
          id="mem-bio"
          rows={3}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/50 resize-none"
        />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <input
          id="mem-active"
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          className="rounded"
        />
        <label
          htmlFor="mem-active"
          className="text-slate-300 text-sm cursor-pointer"
        >
          Active (visible on site)
        </label>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onSave(form)}
          className="btn-gradient text-white text-sm font-bold px-5 py-2 rounded-full flex items-center gap-2"
        >
          <Save className="w-3.5 h-3.5" /> Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-white/5 border border-white/10 text-slate-400 text-sm font-medium px-5 py-2 rounded-full flex items-center gap-2 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </button>
      </div>
    </div>
  );
}
