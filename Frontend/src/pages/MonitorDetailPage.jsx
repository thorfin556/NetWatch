
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

// ── Shared helpers ─────────────────────────────────────────────────────────────
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

function MonitorAvatar({ name, size = "lg" }) {
  const initials = (name || "?").slice(0, 2).toUpperCase();
  const palette = ["#F59E0B", "#D4A94D", "#22C55E", "#3B82F6", "#8B5CF6", "#EF4444"];
  const bg = palette[(name?.charCodeAt(0) || 0) % palette.length];
  const sz = size === "lg" ? "h-12 w-12 text-sm" : "h-8 w-8 text-xs";
  return (
    <div className={`${sz} rounded-full flex items-center justify-center text-white font-bold shrink-0 select-none`}
      style={{ backgroundColor: bg }}>
      {initials}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#F0EBE3] last:border-0">
      <span className="text-xs text-[#9C8E80] font-medium">{label}</span>
      <span className="text-xs font-semibold text-[#111827] text-right max-w-45 truncate">{value || "—"}</span>
    </div>
  );
}

function StatCard({ label, value, sub, color = "amber" }) {
  const colors = {
    amber:  "bg-[#FFF8E6] border-[#FDE68A] text-[#F59E0B]",
    green:  "bg-green-50 border-green-200 text-green-600",
    red:    "bg-red-50 border-red-200 text-red-600",
    slate:  "bg-[#FAF8F5] border-[#E7E0D8] text-[#6B7280]",
  };
  return (
    <div className={`rounded-xl border px-4 py-3.5 ${colors[color]}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70 mb-1">{label}</p>
      <p className="text-xl font-bold text-[#111827] leading-none">{value ?? "—"}</p>
      {sub && <p className="text-[10px] mt-1 opacity-60">{sub}</p>}
    </div>
  );
}

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg border border-[#E7E0D8] bg-white px-3 py-2 shadow-lg">
        <p className="text-[10px] text-[#9C8E80] mb-0.5">{label}</p>
        <p className="text-sm font-bold text-[#F59E0B]">{payload[0].value} ms</p>
      </div>
    );
  }
  return null;
};

// ── Edit modal ─────────────────────────────────────────────────────────────────
function EditModal({ monitor, onClose, onSaved }) {
  const [name, setName]         = useState(monitor.name || "");
  const [url, setUrl]           = useState(monitor.url || "");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(null);
    try {
      setLoading(true);
      await api.put(`/monitors/${monitor._id}`, { name, url });
      onSaved();
      onClose();
    } catch (err) { setError(err.response?.data?.message || "Something went wrong"); }
    finally { setLoading(false); }
  };

  const inputCls = "w-full border border-[#E7E0D8] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-[#C4B49A] rounded-lg focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#1A1008]/25 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white rounded-2xl border border-[#E7E0D8] shadow-[0_20px_60px_rgba(0,0,0,0.12)] w-full max-w-md">
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-[#F0EBE3]">
          <div>
            <h2 className="text-base font-bold text-[#111827]">Edit Monitor</h2>
            <p className="text-xs text-[#9C8E80] mt-0.5">Update monitor configuration.</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#C4B49A] hover:text-[#111827] hover:bg-[#F5F1EA] transition-colors ml-4">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 2l11 11M13 2L2 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">Monitor Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. My Website" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">URL</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className={inputCls} />
          </div>
          {error && <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">{error}</p>}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 border border-[#E7E0D8] bg-[#FAF8F5] text-[#6B7280] text-sm font-medium py-2.5 rounded-lg hover:border-[#D4C4B0] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-[#F59E0B] hover:bg-[#EA8C00] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60">
              {loading ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Delete modal ───────────────────────────────────────────────────────────────
function DeleteModal({ monitor, onClose, onDeleted }) {
  const handleDelete = async () => {
    await api.delete(`/monitors/${monitor._id}`);
    onDeleted();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#1A1008]/25 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative bg-white rounded-2xl border border-[#E7E0D8] shadow-[0_20px_60px_rgba(0,0,0,0.12)] w-full max-w-sm p-6 text-center">
        <div className="h-12 w-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M8 5V3.5h4V5M7 5v10a1 1 0 001 1h4a1 1 0 001-1V5" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-base font-bold text-[#111827]">Delete Monitor?</h2>
        <p className="text-sm text-[#6B7280] mt-2 mb-6">
          <span className="font-semibold text-[#111827]">{monitor.name}</span> will be permanently removed. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 border border-[#E7E0D8] bg-[#FAF8F5] text-[#6B7280] text-sm font-medium py-2.5 rounded-lg hover:border-[#D4C4B0] transition-colors">
            Cancel
          </button>
          <button onClick={handleDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar nav ────────────────────────────────────────────────────────────────
const NAV = (navigate) => [
  { label: "Dashboard",    path: "/dashboard",    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/></svg> },
  { label: "Monitors",     path: "/monitors",     active: true, icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { label: "Alerts",       path: "/alerts",       icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6v3L2 11h12l-1.5-2V6C12.5 3.5 10.5 1.5 8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M6.5 11v.5a1.5 1.5 0 003 0V11" stroke="currentColor" strokeWidth="1.4"/></svg> },
  { label: "Status Pages", path: "/status-pages", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M1.5 5h13" stroke="currentColor" strokeWidth="1.4"/><path d="M4 8.5h8M4 11h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { label: "Settings",     path: "/settings",     icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
];

// ── Main ───────────────────────────────────────────────────────────────────────
function MonitorDetailPage() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const [error, seterror]     = useState(null);
  const [monitor, setMonitor] = useState(null);
  const [latest, setLatest]   = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab]   = useState("overview");
  const [editOpen, setEditOpen]     = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [histSearch, setHistSearch] = useState("");
  const [histFilter, setHistFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const fetchAll = async () => {
    try {
      const [rv, rl, rh] = await Promise.all([
        api.get(`/monitors/${id}`),
        api.get(`/monitors/${id}/latest`),
        api.get(`/monitors/${id}/history`),
      ]);
      setMonitor(rv.data.monitor);
      setLatest(rl.data.latest);
      setHistory(rh.data.history);
    } catch (err) { seterror(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, [id]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAll();
    setRefreshing(false);
  };

  // ── Computed stats from history ──
  const totalChecks  = history.length;
  const successCount = history.filter(h => h.status === "UP").length;
  const failCount    = history.filter(h => h.status === "DOWN").length;
  const avgRT        = totalChecks
    ? Math.round(history.reduce((s, h) => s + (h.responseTime || 0), 0) / totalChecks)
    : null;

  // ── Chart data — from history, chronological ──
  const chartData = [...history]
    .sort((a, b) => new Date(a.checkedAt) - new Date(b.checkedAt))
    .slice(-30)
    .map(h => ({
      time: new Date(h.checkedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      ms: h.responseTime,
    }));

  // ── Filtered history for History tab ──
  const filteredHistory = history.filter(h => {
    const matchStatus = histFilter === "all" || h.status === histFilter;
    const matchSearch = histSearch === "" ||
      h.status.toLowerCase().includes(histSearch.toLowerCase()) ||
      String(h.responseTime).includes(histSearch);
    return matchStatus && matchSearch;
  });

  // ── Sidebar ──
  const Sidebar = () => (
    <aside className="hidden md:flex w-47.5 shrink-0 border-r border-[#E7E0D8] bg-white flex-col">
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
        {NAV(navigate).map(({ label, icon, path, active }) => (
          <button key={label} onClick={() => navigate(path)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
              active ? "bg-[#FFF8E6] text-[#F59E0B] font-semibold border border-[#FDE68A]"
                     : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F6F2EB]"
            }`}>
            <span className="shrink-0">{icon}</span>{label}
          </button>
        ))}
      </nav>
      <div className="px-2.5 pb-4 border-t border-[#E7E0D8] pt-3">
        <button onClick={() => navigate("/login")}
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

  // ── Loading ──
  if (loading) return (
    <div className="flex h-screen bg-[#F6F2EB]">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[#F59E0B] border-t-transparent animate-spin" />
          <p className="text-sm text-[#9C8E80]">Loading monitor…</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex h-screen bg-[#F6F2EB]">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-red-500">Error: {error}</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F6F2EB] text-[#111827] overflow-hidden font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Header */}
        <header className="shrink-0 border-b border-[#E7E0D8] bg-white flex flex-col md:flex-row gap-3 md:gap-0 md:items-center justify-between px-3 md:px-7 py-3">
          <button onClick={() => navigate("/monitor")}
            className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111827] transition-colors group">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-0.5 transition-transform">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Monitors
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={handleRefresh}
              className={`flex items-center gap-1.5 border border-[#E7E0D8] bg-white text-[#6B7280] hover:text-[#111827] hover:border-[#D4C4B0] text-xs font-medium px-3 py-2 rounded-lg transition-colors ${refreshing ? "opacity-60" : ""}`}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className={refreshing ? "animate-spin" : ""}>
                <path d="M11.5 6.5A5 5 0 112.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M2.5 1v2.5H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Refresh
            </button>
            <button onClick={() => setEditOpen(true)}
              className="flex items-center gap-1.5 border border-[#E7E0D8] bg-white text-[#6B7280] hover:text-[#111827] hover:border-[#D4C4B0] text-xs font-medium px-3 py-2 rounded-lg transition-colors">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M8.5 2.5l2 2L4 11H2v-2l6.5-6.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
              Edit Monitor
            </button>
            <button onClick={() => setDeleteOpen(true)}
              className="flex items-center gap-1.5 border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 text-xs font-medium px-3 py-2 rounded-lg transition-colors">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 3h9M5 3V2h3v1M4.5 3v7a.5.5 0 00.5.5h3a.5.5 0 00.5-.5V3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Delete
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-3 md:px-7 py-4 md:py-6 space-y-5">

          {/* ── HERO CARD ── */}
          <div className="bg-white rounded-xl border border-[#E7E0D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] px-6 py-5">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="flex items-center gap-4">
                <MonitorAvatar name={monitor?.name} size="lg" />
                <div>
                  <h1 className="text-lg font-bold text-[#111827] leading-none">{monitor?.name}</h1>
                  <a href={monitor?.url} target="_blank" rel="noreferrer"
                    className="text-xs text-[#9C8E80] hover:text-[#F59E0B] transition-colors mt-1 block">
                    {monitor?.url}
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge up={monitor?.isActive} />
                {latest?.checkedAt && (
                  <span className="text-[10px] text-[#B0A090] font-mono">
                    Last checked {new Date(latest.checkedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── TABS ── */}
          <div className="flex items-center gap-0 border-b border-[#E7E0D8]">
            {["overview", "history"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-medium capitalize transition-colors relative ${
                  activeTab === tab
                    ? "text-[#F59E0B] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F59E0B] after:rounded-t"
                    : "text-[#9C8E80] hover:text-[#111827]"
                }`}>
                {tab}
              </button>
            ))}
          </div>

          {/* ══ OVERVIEW TAB ══ */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-[1fr_300px] gap-5 items-start">

              {/* Left column */}
              <div className="space-y-5">

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatCard label="Total Checks" value={totalChecks} color="slate" />
                  <StatCard label="Avg Response" value={avgRT ? `${avgRT} ms` : "—"} color="amber" />
                  <StatCard label="Successful" value={successCount} sub={totalChecks ? `${Math.round(successCount/totalChecks*100)}%` : ""} color="green" />
                  <StatCard label="Failed" value={failCount} sub={totalChecks ? `${Math.round(failCount/totalChecks*100)}%` : ""} color={failCount > 0 ? "red" : "slate"} />
                </div>

                {/* Performance chart */}
                {chartData.length > 0 && (
                  <div className="bg-white rounded-xl border border-[#E7E0D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">Performance</p>
                        <p className="text-xs text-[#9C8E80] mt-0.5">Response time — last {chartData.length} checks</p>
                      </div>
                      <span className="text-[10px] font-mono text-[#9C8E80] bg-[#F6F2EB] border border-[#E7E0D8] px-2 py-1 rounded-lg">ms</span>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#F59E0B" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0EBE3" vertical={false}/>
                        <XAxis dataKey="time" tick={{ fill: "#B0A090", fontSize: 10 }} tickLine={false} axisLine={false} interval={Math.floor(chartData.length/6)}/>
                        <YAxis tick={{ fill: "#B0A090", fontSize: 10 }} tickLine={false} axisLine={false}/>
                        <Tooltip content={<ChartTooltip />}/>
                        <Area type="monotone" dataKey="ms" stroke="#F59E0B" strokeWidth={2}
                          fill="url(#perfGrad)" dot={false}
                          activeDot={{ r: 4, fill: "#F59E0B", stroke: "#fff", strokeWidth: 2 }}/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Recent checks table */}
                <div className="bg-white rounded-xl border border-[#E7E0D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                  <div className="px-5 py-4 border-b border-[#F0EBE3]">
                    <p className="text-sm font-semibold text-[#111827]">Recent Checks</p>
                    <p className="text-xs text-[#9C8E80] mt-0.5">Latest 15 records</p>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#F0EBE3] bg-[#FAF8F5]">
                        {["Status", "Response Time", "Checked At"].map(h => (
                          <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-[#9C8E80] uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F6F2EB]">
                      {history.length === 0 ? (
                        <tr><td colSpan={3} className="px-5 py-8 text-center text-xs text-[#9C8E80]">No checks available yet.</td></tr>
                      ) : [...history].reverse().slice(0, 15).map((item) => (
                        <tr key={item._id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="px-5 py-3">
                            <StatusBadge up={item.status?.toLowerCase() === "up"} /></td>
                          <td className="px-5 py-3 font-mono text-xs text-[#374151]">{item.responseTime ? `${item.responseTime} ms` : "—"}</td>
                          <td className="px-5 py-3 text-xs text-[#9C8E80] whitespace-nowrap">
                            {new Date(item.checkedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right column — summary */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-[#E7E0D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                  <div className="px-5 py-4 border-b border-[#F0EBE3]">
                    <p className="text-xs font-semibold text-[#9C8E80] uppercase tracking-wider">Summary</p>
                  </div>
                  <div className="px-5 py-1">
                    <SummaryRow label="Current Status"
                      value={<StatusBadge up={monitor?.isActive} />} />
                    <SummaryRow label="Latest Response"
                      value={latest?.responseTime ? `${latest.responseTime} ms` : "—"} />
                    <SummaryRow label="Last Checked"
                      value={latest?.checkedAt
                        ? new Date(latest.checkedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })
                        : "—"} />
                    <SummaryRow label="Created At"
                      value={monitor?.createdAt
                        ? new Date(monitor.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                        : "—"} />
                    <SummaryRow label="Monitor URL" value={monitor?.url} />
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#E7E0D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                  <div className="px-5 py-4 border-b border-[#F0EBE3]">
                    <p className="text-xs font-semibold text-[#9C8E80] uppercase tracking-wider">Statistics</p>
                  </div>
                  <div className="px-5 py-1">
                    <SummaryRow label="Total Checks" value={totalChecks} />
                    <SummaryRow label="Avg. Response Time" value={avgRT ? `${avgRT} ms` : "—"} />
                    <SummaryRow label="Successful Checks" value={`${successCount} (${totalChecks ? Math.round(successCount/totalChecks*100) : 0}%)`} />
                    <SummaryRow label="Failed Checks" value={`${failCount} (${totalChecks ? Math.round(failCount/totalChecks*100) : 0}%)`} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ HISTORY TAB ══ */}
          {activeTab === "history" && (
            <div className="bg-white rounded-xl border border-[#E7E0D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F0EBE3]">
                <div className="relative flex-1 max-w-xs">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C4B49A]" width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  <input value={histSearch} onChange={(e) => setHistSearch(e.target.value)}
                    placeholder="Search history…"
                    className="w-full pl-9 pr-4 py-2 text-sm border border-[#E7E0D8] bg-[#FAF8F5] rounded-lg text-[#111827] placeholder:text-[#C4B49A] focus:outline-none focus:border-[#F59E0B] transition-colors" />
                </div>
                <select value={histFilter} onChange={(e) => setHistFilter(e.target.value)}
                  className="text-sm border border-[#E7E0D8] bg-[#FAF8F5] px-3 py-2 rounded-lg text-[#6B7280] focus:outline-none focus:border-[#F59E0B] transition-colors cursor-pointer">
                  <option value="all">All</option>
                  <option value="up">UP</option>
                  <option value="down">DOWN</option>
                </select>
                <div className="ml-auto text-xs text-[#B0A090]">{filteredHistory.length} records</div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#F0EBE3] bg-[#FAF8F5]">
                      {["Status", "Response Time", "Checked At"].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-[#9C8E80] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F6F2EB]">
                    {filteredHistory.length === 0 ? (
                      <tr><td colSpan={3} className="px-5 py-12 text-center text-xs text-[#9C8E80]">No history records found.</td></tr>
                    ) : [...filteredHistory].reverse().map((item) => (
                      <tr key={item._id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="px-5 py-3.5">
                            <StatusBadge up={item.status?.toLowerCase() === "up"} /></td>
                        <td className="px-5 py-3.5 font-mono text-xs text-[#374151]">{item.responseTime ? `${item.responseTime} ms` : "—"}</td>
                        <td className="px-5 py-3.5 text-xs text-[#9C8E80] whitespace-nowrap">
                          {new Date(item.checkedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredHistory.length > 0 && (
                <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#F0EBE3] bg-[#FAF8F5]">
                  <p className="text-xs text-[#9C8E80]">Showing {filteredHistory.length} of {history.length} records</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {editOpen   && <EditModal   monitor={monitor} onClose={() => setEditOpen(false)}   onSaved={fetchAll} />}
      {deleteOpen && <DeleteModal monitor={monitor} onClose={() => setDeleteOpen(false)} onDeleted={() => navigate("/monitors")} />}
    </div>
  );
}

export default MonitorDetailPage;