import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const NAV = (navigate) => [
  { label: "Dashboard",    path: "/dashboard" },
  { label: "Monitors",     path: "/monitor" },
  { label: "Alerts",       path: "/alerts" },
  { label: "Status Pages", path: "/status-pages" },
  { label: "Integrations", path: "/integrations", active: true },
  { label: "Settings",     path: "/settings" },
];

const ICONS = {
  Dashboard:    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  Monitors:     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  Alerts:       <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6v3L2 11h12l-1.5-2V6C12.5 3.5 10.5 1.5 8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M6.5 11v.5a1.5 1.5 0 003 0V11" stroke="currentColor" strokeWidth="1.4"/></svg>,
  "Status Pages":<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M1.5 5h13" stroke="currentColor" strokeWidth="1.4"/><path d="M4 8.5h8M4 11h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  Integrations: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="4" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6.5 8H9.5M6.5 7L9.5 4.5M6.5 9L9.5 11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  Settings:     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.7 3.3l-1.06 1.06M4.36 11.64l-1.06 1.06M12.7 12.7l-1.06-1.06M4.36 4.36L3.3 3.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
};

const INTEGRATIONS = [
  { name: "Slack",            color: "#4A154B", letter: "S",  desc: "Receive monitoring alerts in Slack channels." },
  { name: "Discord",          color: "#5865F2", letter: "D",  desc: "Send instant outage notifications to Discord servers." },
  { name: "Microsoft Teams",  color: "#6264A7", letter: "T",  desc: "Share alerts with your team on Microsoft Teams." },
  { name: "Webhook",          color: "#111827", letter: "W",  desc: "Send monitoring events to any external HTTP endpoint." },
  { name: "PagerDuty",        color: "#06AC38", letter: "P",  desc: "Incident management and on-call scheduling." },
  { name: "Telegram",         color: "#2CA5E0", letter: "Tg", desc: "Receive instant alerts on Telegram." },
];

const ROADMAP = ["Jira", "Notion", "ServiceNow", "Grafana"];

function ComingSoonBadge() {
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFF3E0] text-[#F59E0B] border border-[#FDE68A]">Coming Soon</span>;
}

export default function IntegrationsPage() {
  const navigate  = useNavigate();
  const { logout, user } = useAuth();
  const handleLogOut = () => { logout(); navigate("/login"); };

  return (
    <div className="flex h-screen bg-[#F6F2EB] text-[#111827] overflow-hidden font-sans">

      {/* Sidebar */}
      <aside className="w-47.5 shrink-0 border-r border-[#E7E0D8] bg-white flex flex-col">
        <div className="px-5 py-5 border-b border-[#E7E0D8]">
          <div className="flex items-center gap-2.5">
            <svg width="32" height="26" viewBox="0 0 34 28" fill="none">
              <polyline points="0,14 4,14 7,4 10,24 13,10 16,18 19,6 22,22 25,12 28,16 31,14 34,14" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <span className="text-[15px] font-bold tracking-tight">Net<span className="text-[#F59E0B]">Watch</span></span>
              <p className="text-[9px] text-[#B0A090] uppercase tracking-[0.18em] leading-none mt-0.5">Monitor</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-2.5 py-4 space-y-0.5">
          {NAV(navigate).map(({ label, path, active }) => (
            <button key={label} onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                active ? "bg-[#FFF8E6] text-[#F59E0B] font-semibold border border-[#FDE68A]"
                       : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F6F2EB]"}`}>
              <span className="shrink-0">{ICONS[label]}</span>{label}
            </button>
          ))}
        </nav>
        <div className="px-2.5 pb-4 border-t border-[#E7E0D8] pt-3 space-y-1">
          <div className="flex items-center gap-2.5 px-3 py-2">
            <div className="h-7 w-7 rounded-full bg-[#F59E0B] flex items-center justify-center text-xs font-bold text-white shrink-0">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#111827] truncate">{user?.name ?? "User"}</p>
              <p className="text-[10px] text-[#B0A090] truncate">Pro Plan</p>
            </div>
          </div>
          <button onClick={handleLogOut} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#B0A090] hover:text-red-500 hover:bg-red-50 transition-colors">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5.5 7.5H13m0 0l-2.5-2.5M13 7.5l-2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 2H3a1 1 0 00-1 1v9a1 1 0 001 1h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-15 shrink-0 border-b border-[#E7E0D8] bg-white flex items-center px-7">
          <div>
            <h1 className="text-[15px] font-bold text-[#111827]">Integrations</h1>
            <p className="text-xs text-[#9C8E80]">Connect NetWatch with your favorite tools and workflows.</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-7 py-6 space-y-6">

          {/* Integration cards grid */}
          <div>
            <p className="text-xs font-semibold text-[#9C8E80] uppercase tracking-wider mb-3">Available Integrations</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INTEGRATIONS.map(({ name, color, letter, desc }) => (
                <div key={name} className="bg-white rounded-xl border border-[#E7E0D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: color }}>
                        {letter}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#111827]">{name}</p>
                        <ComingSoonBadge />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#9C8E80] leading-relaxed flex-1">{desc}</p>
                  <button disabled className="w-full border border-[#E7E0D8] bg-[#FAF8F5] text-[#C4B49A] text-xs font-medium py-2 rounded-lg cursor-not-allowed">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div>
            <p className="text-xs font-semibold text-[#9C8E80] uppercase tracking-wider mb-3">Future Integrations</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ROADMAP.map((name) => (
                <div key={name} className="bg-white rounded-xl border border-dashed border-[#E7E0D8] p-4 flex flex-col items-center gap-2 text-center opacity-60">
                  <div className="h-9 w-9 rounded-lg bg-[#F6F2EB] flex items-center justify-center text-sm font-bold text-[#9C8E80]">
                    {name[0]}
                  </div>
                  <p className="text-xs font-semibold text-[#6B7280]">{name}</p>
                  <span className="text-[10px] text-[#B0A090] bg-[#F6F2EB] px-2 py-0.5 rounded-full">Planned</span>
                </div>
              ))}
            </div>
          </div>

          {/* Banner */}
          <div className="rounded-xl border border-[#FDE68A] bg-[#FFF8E6] px-6 py-4 flex items-start gap-4">
            <div className="h-8 w-8 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center shrink-0 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#F59E0B" strokeWidth="1.4"/><path d="M8 5v3.5M8 10.5v.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#92400E]">Integrations Coming Soon</p>
              <p className="text-xs text-[#B45309] mt-1 leading-relaxed">
                Full integration support including webhooks, Slack, Discord, PagerDuty, and more is actively being developed. Stay tuned for updates.
              </p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}