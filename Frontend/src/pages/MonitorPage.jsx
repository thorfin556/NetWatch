import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useAuth from "../hooks/useAuth.jsx";

// ── Shared nav ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = (navigate) => [
  {
    label: "Dashboard", active: false, onClick: () => navigate("/dashboard"),
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  },
  {
    label: "Monitors", active: true, onClick: null,
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  },
  {
    label: "Alerts", active: false, onClick: () => navigate("/alerts"),
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6v3L2 11h12l-1.5-2V6C12.5 3.5 10.5 1.5 8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M6.5 11v.5a1.5 1.5 0 003 0V11" stroke="currentColor" strokeWidth="1.4"/></svg>,
  },
  {
    label: "Status Pages", active: false, onClick: () => navigate("/status-pages"),
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M1.5 5h13" stroke="currentColor" strokeWidth="1.4"/><path d="M4 8.5h8M4 11h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  },
  {
    label: "Integrations", active: false, onClick: () => navigate("/integrations"),
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="4" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6.5 8H9.5M6.5 7L9.5 4.5M6.5 9L9.5 11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
  {
    label: "Settings", active: false, onClick: () => navigate("/settings"),
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.7 3.3l-1.06 1.06M4.36 11.64l-1.06 1.06M12.7 12.7l-1.06-1.06M4.36 4.36L3.3 3.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function StatusBadge({ up }) {
  return up ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
      UP
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
      DOWN
    </span>
  );
}

function MonitorAvatar({ name }) {
  const initials = (name || "?").slice(0, 2).toUpperCase();
  const palette = ["#E8793A", "#D4A94D", "#22C55E", "#3B82F6", "#8B5CF6", "#EF4444"];
  const bg = palette[(name?.charCodeAt(0) || 0) % palette.length];
  return (
    <div className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 select-none" style={{ backgroundColor: bg }}>
      {initials}
    </div>
  );
}

const INTERVAL_OPTIONS = [
  { value: "1",  label: "Every 1 minute"  },
  { value: "5",  label: "Every 5 minutes" },
  { value: "15", label: "Every 15 minutes"},
  { value: "30", label: "Every 30 minutes"},
  { value: "60", label: "Every 60 minutes"},
];

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-[#E7E0D8] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-[#C4B49A] rounded-lg focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all";

// ── Modal shell ────────────────────────────────────────────────────────────────
function Modal({ onClose, title, subtitle, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#1A1008]/25 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white rounded-2xl border border-[#E7E0D8] shadow-[0_20px_60px_rgba(0,0,0,0.12)] w-full max-w-md">
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-[#F0EBE3]">
          <div>
            <h2 className="text-base font-bold text-[#111827]">{title}</h2>
            {subtitle && <p className="text-xs text-[#9C8E80] mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#C4B49A] hover:text-[#111827] hover:bg-[#F5F1EA] transition-colors ml-4 shrink-0">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 2l11 11M13 2L2 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
function MonitorPage() {
  const [monitors, setMonitors]     = useState([]);
  const [IsLoading, setIsLoading]   = useState(true);
  const [Error, setError]           = useState(null);
  const navigate                    = useNavigate();

  const [search, setSearch]         = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formName, setFormName]         = useState("");
  const [formUrl, setFormUrl]           = useState("");
  const [formInterval, setFormInterval] = useState("5");
  const [formLoading, setFormLoading]   = useState(false);
  const [formError, setFormError]       = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenuId(null); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const fetchMonitors = async () => {
    try {
      setIsLoading(true); setError(null);
      const res = await api.get("/monitors/");
      setMonitors(res.data.monitor);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchMonitors(); }, []);

  const { logout,user } = useAuth();
  const handleLogOut = () => { logout(); navigate("/login"); };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/monitors/${id}`);
      setMonitors((p) => p.filter((m) => m._id !== id));
      setDeleteTarget(null);
    } catch (err) { console.error(err); }
  };

  const openCreate = () => { setFormName(""); setFormUrl(""); setFormInterval("5"); setFormError(null); setCreateOpen(true); };

  const handleCreate = async (e) => {
    e.preventDefault(); setFormError(null);
    try {
      setFormLoading(true);
      await api.post("/monitors/", { name: formName, url: formUrl, interval: Number(formInterval) });
      await fetchMonitors();
      setCreateOpen(false);
    } catch (err) { setFormError(err.response?.data?.message || "Something went wrong"); }
    finally { setFormLoading(false); }
  };

  const openEdit = (monitor) => {
    setFormName(monitor.name); setFormUrl(monitor.url);
    setFormInterval(String(monitor.interval || "5")); setFormError(null);
    setEditTarget(monitor); setOpenMenuId(null);
  };

  const handleEdit = async (e) => {
    e.preventDefault(); setFormError(null);
    try {
      setFormLoading(true);
      await api.put(`/monitors/${editTarget._id}`, { name: formName, url: formUrl, interval: Number(formInterval) });
      await fetchMonitors();
      setEditTarget(null);
    } catch (err) { setFormError(err.response?.data?.message || "Something went wrong"); }
    finally { setFormLoading(false); }
  };

  const filtered = monitors.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch = m.name.toLowerCase().includes(q) || m.url.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || (statusFilter === "up" && m.isActive) || (statusFilter === "down" && !m.isActive);
    return matchSearch && matchStatus;
  });

  // ── Sidebar ────────────────────────────────────────────────────────────────
  const Sidebar = () => (
    <aside className="w-47.5 shrink-0 border-r border-[#E7E0D8] bg-white flex flex-col">
      <div className="px-5 py-5 border-b border-[#E7E0D8]">
        <div className="flex items-center gap-2.5">
          <svg width="32" height="26" viewBox="0 0 34 28" fill="none">
            <polyline points="0,14 4,14 7,4 10,24 13,10 16,18 19,6 22,22 25,12 28,16 31,14 34,14"
              fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <span className="text-[15px] font-bold tracking-tight text-[#111827]">Net<span className="text-[#F59E0B]">Watch</span></span>
            <p className="text-[9px] text-[#B0A090] uppercase tracking-[0.18em] leading-none mt-0.5">Monitor</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-2.5 py-4 space-y-0.5">
        {NAV_ITEMS(navigate).map(({ label, icon, active, onClick }) => (
          <button key={label} onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
              active ? "bg-[#FFF8E6] text-[#F59E0B] font-semibold border border-[#FDE68A]"
                     : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F6F2EB]"
            }`}
          >
            <span className="shrink-0">{icon}</span>{label}
          </button>
        ))}
      </nav>
      <div className="px-2.5 pb-4 border-t border-[#E7E0D8] pt-3 space-y-1">
        <div className="flex items-center gap-2.5 px-3 py-2">
            <div className="h-7 w-7 rounded-full bg-[#E8793A] flex items-center justify-center text-xs font-bold text-white shrink-0">
                {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
            <p className="text-xs font-semibold text-[#1A1008] truncate">
                {user?.name}
            </p>
          </div>
        </div>
        <button onClick={handleLogOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#B0A090] hover:text-red-500 hover:bg-red-50 transition-colors">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M5.5 7.5H13m0 0l-2.5-2.5M13 7.5l-2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 2H3a1 1 0 00-1 1v9a1 1 0 001 1h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );

  if (IsLoading) return (
    <div className="flex h-screen bg-[#F6F2EB]">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[#F59E0B] border-t-transparent animate-spin" />
          <p className="text-sm text-[#9C8E80]">Loading monitors…</p>
        </div>
      </div>
    </div>
  );

  if (Error) return (
    <div className="flex h-screen bg-[#F6F2EB]">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-red-500">Error: {Error}</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F6F2EB] text-[#111827] overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-15 shrink-0 border-b border-[#E7E0D8] bg-white flex items-center justify-between px-7">
          <div>
            <h1 className="text-[15px] font-bold text-[#111827]">Monitors</h1>
            <p className="text-xs text-[#9C8E80]">Manage and monitor your websites and APIs.</p>
          </div>
          <button onClick={openCreate}
            className="flex items-center gap-1.5 bg-[#F59E0B] hover:bg-[#EA8C00] transition-colors px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-sm">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
            Create Monitor
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-7 py-6">
          <div className="bg-white rounded-xl border border-[#E7E0D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">

            {/* Toolbar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F0EBE3]">
              <div className="relative flex-1 max-w-xs">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4B49A]" width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search monitors…"
                  className="w-full pl-9 pr-4 py-2 text-sm border border-[#E7E0D8] bg-[#FAF8F5] rounded-lg text-[#111827] placeholder:text-[#C4B49A] focus:outline-none focus:border-[#F59E0B] transition-colors" />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-[#E7E0D8] bg-[#FAF8F5] px-3 py-2 rounded-lg text-[#6B7280] focus:outline-none focus:border-[#F59E0B] transition-colors cursor-pointer">
                <option value="all">All Status</option>
                <option value="up">UP</option>
                <option value="down">DOWN</option>
              </select>
              <div className="ml-auto flex items-center gap-3">
                {/* Status summary pills */}
                <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {monitors.filter(m => m.isActive).length} up
                </span>
                {monitors.filter(m => !m.isActive).length > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    {monitors.filter(m => !m.isActive).length} down
                  </span>
                )}
                <span className="text-xs text-[#B0A090]">{filtered.length} total</span>
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#F0EBE3] bg-[#FAF8F5]">
                  {["Monitor", "Status", "Created At", ""].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-[#9C8E80] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F6F2EB]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-14 w-14 rounded-2xl bg-[#FFF8E6] border border-[#FDE68A] flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="2" y="3" width="20" height="14" rx="2" stroke="#F59E0B" strokeWidth="1.6"/>
                            <path d="M8 21h8M12 17v4" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#111827]">No monitors found</p>
                          <p className="text-xs text-[#9C8E80] mt-1">
                            {search || statusFilter !== "all" ? "Try adjusting your search or filter." : "Create your first monitor to begin tracking uptime."}
                          </p>
                        </div>
                        {!search && statusFilter === "all" && (
                          <button onClick={openCreate}
                            className="mt-1 text-xs text-[#F59E0B] font-semibold hover:underline">
                            Create your first monitor →
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : filtered.map((monitor) => (
                  <tr key={monitor._id}
                    onClick={() => navigate(`/monitor/${monitor._id}`)}
                    className="hover:bg-[#FAF8F5] transition-colors group cursor-pointer">

                    {/* Monitor */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <MonitorAvatar name={monitor.name} />
                        <div>
                          <p className="font-semibold text-[#111827] group-hover:text-[#F59E0B] transition-colors leading-none">{monitor.name}</p>
                          <p className="text-xs text-[#9C8E80] mt-0.5 truncate max-w-50">{monitor.url}</p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <StatusBadge up={monitor.isActive} />
                    </td>

                    {/* Created At */}
                    <td className="px-5 py-4 text-xs text-[#9C8E80] whitespace-nowrap">
                      {monitor.createdAt
                        ? new Date(monitor.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                        : "—"}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}
                      ref={openMenuId === monitor._id ? menuRef : null}>
                      <button
                        onClick={() => setOpenMenuId(openMenuId === monitor._id ? null : monitor._id)}
                        className="p-1.5 rounded-md text-[#C4B49A] hover:text-[#111827] hover:bg-[#F0EBE3] transition-colors opacity-0 group-hover:opacity-100">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="3" r="1.2" fill="currentColor"/>
                          <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
                          <circle cx="8" cy="13" r="1.2" fill="currentColor"/>
                        </svg>
                      </button>
                      {openMenuId === monitor._id && (
                        <div className="absolute right-6 z-30 w-44 bg-white border border-[#E7E0D8] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden py-1 mt-1">
                          <button
                            onClick={() => { navigate(`/monitor/${monitor._id}`); setOpenMenuId(null); }}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#374151] hover:bg-[#FAF8F5] transition-colors">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/><path d="M7 5v4M7 4.5v-.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                            View Details
                          </button>
                          <button
                            onClick={() => openEdit(monitor)}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#374151] hover:bg-[#FAF8F5] transition-colors">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9.5 2.5l2 2L5 11H3v-2l6.5-6.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                            Edit Monitor
                          </button>
                          <div className="my-1 h-px bg-[#F0EBE3]" />
                          <button
                            onClick={() => { setDeleteTarget(monitor); setOpenMenuId(null); }}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M5.5 3.5V2.5h3v1M5 3.5v7.5a1 1 0 001 1h2a1 1 0 001-1V3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Delete Monitor
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer */}
            {filtered.length > 0 && (
              <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#F0EBE3] bg-[#FAF8F5]">
                <p className="text-xs text-[#9C8E80]">Showing {filtered.length} of {monitors.length} monitor{monitors.length !== 1 ? "s" : ""}</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── CREATE MODAL ── */}
      {createOpen && (
        <Modal onClose={() => setCreateOpen(false)} title="Create Monitor" subtitle="Start monitoring a new endpoint.">
          <form onSubmit={handleCreate} className="space-y-4">
            <Field label="Monitor Name">
              <input id="c-name" value={formName} onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. My Website" className={inputCls} />
            </Field>
            <Field label="URL">
              <input id="c-url" value={formUrl} onChange={(e) => setFormUrl(e.target.value)}
                placeholder="https://example.com" className={inputCls} />
            </Field>
            <Field label="Check Interval">
              <select id="c-interval" value={formInterval} onChange={(e) => setFormInterval(e.target.value)}
                className={inputCls + " appearance-none cursor-pointer"}>
                {INTERVAL_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            {formError && <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">{formError}</p>}
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setCreateOpen(false)}
                className="flex-1 border border-[#E7E0D8] bg-[#FAF8F5] text-[#6B7280] text-sm font-medium py-2.5 rounded-lg hover:border-[#D4C4B0] transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={formLoading}
                className="flex-1 bg-[#F59E0B] hover:bg-[#EA8C00] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60">
                {formLoading ? "Creating…" : "Create Monitor"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── EDIT MODAL ── */}
      {editTarget && (
        <Modal onClose={() => setEditTarget(null)} title="Edit Monitor" subtitle="Update the monitor configuration.">
          <form onSubmit={handleEdit} className="space-y-4">
            <Field label="Monitor Name">
              <input id="e-name" value={formName} onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. My Website" className={inputCls} />
            </Field>
            <Field label="URL">
              <input id="e-url" value={formUrl} onChange={(e) => setFormUrl(e.target.value)}
                placeholder="https://example.com" className={inputCls} />
            </Field>
            <Field label="Check Interval">
              <select id="e-interval" value={formInterval} onChange={(e) => setFormInterval(e.target.value)}
                className={inputCls + " appearance-none cursor-pointer"}>
                {INTERVAL_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            {formError && <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">{formError}</p>}
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setEditTarget(null)}
                className="flex-1 border border-[#E7E0D8] bg-[#FAF8F5] text-[#6B7280] text-sm font-medium py-2.5 rounded-lg hover:border-[#D4C4B0] transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={formLoading}
                className="flex-1 bg-[#F59E0B] hover:bg-[#EA8C00] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60">
                {formLoading ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ── DELETE CONFIRM ── */}
      {deleteTarget && (
        <Modal onClose={() => setDeleteTarget(null)} title="Delete Monitor?">
          <div className="flex flex-col items-center text-center py-2">
            <div className="h-12 w-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 5h14M8 5V3.5h4V5M7 5v10a1 1 0 001 1h4a1 1 0 001-1V5" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-sm text-[#6B7280] mb-6">
              <span className="font-semibold text-[#111827]">{deleteTarget.name}</span> will be permanently deleted. This cannot be undone.
            </p>
            <div className="flex gap-3 w-full">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 border border-[#E7E0D8] bg-[#FAF8F5] text-[#6B7280] text-sm font-medium py-2.5 rounded-lg hover:border-[#D4C4B0] transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteTarget._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default MonitorPage;