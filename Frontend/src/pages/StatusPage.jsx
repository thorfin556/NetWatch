import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const NAV_PATHS = [
  { label: "Dashboard",    path: "/dashboard" },
  { label: "Monitors",     path: "/monitors" },
  { label: "Alerts",       path: "/alerts" },
  { label: "Status Pages", path: "/status-pages", active: true },
  { label: "Integrations", path: "/integrations" },
  { label: "Settings",     path: "/settings" },
];
const NAV_ICONS = {
  Dashboard:    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  Monitors:     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  Alerts:       <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6v3L2 11h12l-1.5-2V6C12.5 3.5 10.5 1.5 8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M6.5 11v.5a1.5 1.5 0 003 0V11" stroke="currentColor" strokeWidth="1.4"/></svg>,
  "Status Pages":<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M1.5 5h13" stroke="currentColor" strokeWidth="1.4"/><path d="M4 8.5h8M4 11h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  Integrations: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="4" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6.5 8H9.5M6.5 7L9.5 4.5M6.5 9L9.5 11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  Settings:     <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.7 3.3l-1.06 1.06M4.36 11.64l-1.06 1.06M12.7 12.7l-1.06-1.06M4.36 4.36L3.3 3.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
};

const COMING_SOON_FEATURES = [
  "Custom domains",
  "Incident management",
  "Scheduled maintenance",
  "Public uptime reports",
  "Custom branding",
];

const MOCK_SERVICES = [
  { name: "API Service",  status: "Operational" },
  { name: "Website",      status: "Operational" },
  { name: "Database",     status: "Operational" },
];

export default function StatusPagesPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const handleLogOut = () => { logout(); navigate("/login"); };

  return (
    <div className="flex h-screen bg-[#F6F2EB] text-[#111827] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[190px] shrink-0 border-r border-[#E7E0D8] bg-white flex flex-col">
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
          {NAV_PATHS.map(({ label, path, active }) => (
            <button key={label} onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                active ? "bg-[#FFF8E6] text-[#F59E0B] font-semibold border border-[#FDE68A]"
                       : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F6F2EB]"}`}>
              <span className="shrink-0">{NAV_ICONS[label]}</span>{label}
            </button>
          ))}
        </nav>
        <div className="px-2.5 pb-4 border-t border-[#E7E0D8] pt-3 space-y-1">
          <div className="flex items-center gap-2.5 px-3 py-2">
            <div className="h-7 w-7 rounded-full bg-[#F59E0B] flex items-center justify-center text-xs font-bold text-white shrink-0">{user?.name?.[0]?.toUpperCase() ?? "U"}</div>
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
        <header className="h-[60px] shrink-0 border-b border-[#E7E0D8] bg-white flex items-center px-7">
          <div>
            <h1 className="text-[15px] font-bold text-[#111827]">Status Pages</h1>
            <p className="text-xs text-[#9C8E80]">Create public status pages to share service uptime with your users.</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-7 py-6 space-y-5">

          {/* Empty state card */}
          <div className="bg-white rounded-xl border border-[#E7E0D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-10 flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-2xl bg-[#FFF8E6] border border-[#FDE68A] flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="4" width="24" height="18" rx="2.5" stroke="#F59E0B" strokeWidth="1.6"/>
                <path d="M2 9h24" stroke="#F59E0B" strokeWidth="1.6"/>
                <path d="M9 14h10M9 18h6" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#111827]">No public status page created</h3>
            <p className="text-xs text-[#9C8E80] mt-1.5 max-w-xs">Share uptime, incidents, and maintenance updates with your customers through a dedicated public page.</p>
            <button disabled className="mt-5 flex items-center gap-2 bg-[#F59E0B] opacity-40 cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-lg">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
              Create Status Page
            </button>
            <p className="text-[10px] text-[#C4B49A] mt-2">Feature coming soon</p>
          </div>

          {/* Preview card */}
          <div className="bg-white rounded-xl border border-[#E7E0D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0EBE3]">
              <p className="text-sm font-bold text-[#111827]">Preview</p>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-100">Preview</span>
            </div>
            {/* Mock public status page */}
            <div className="bg-[#F6F2EB] p-6">
              <div className="bg-white rounded-xl border border-[#E7E0D8] max-w-lg mx-auto p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <svg width="28" height="22" viewBox="0 0 34 28" fill="none">
                      <polyline points="0,14 4,14 7,4 10,24 13,10 16,18 19,6 22,22 25,12 28,16 31,14 34,14" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm font-bold text-[#111827]">NetWatch Status</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    All Systems Operational
                  </span>
                </div>
                <div className="space-y-2">
                  {MOCK_SERVICES.map(({ name, status }) => (
                    <div key={name} className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-[#F0EBE3] bg-[#FAF8F5]">
                      <span className="text-sm text-[#374151]">{name}</span>
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-green-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[#B0A090] text-center mt-4">Powered by NetWatch</p>
              </div>
            </div>
          </div>

          {/* Coming soon features */}
          <div className="rounded-xl border border-[#FDE68A] bg-[#FFF8E6] px-6 py-5">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#F59E0B" strokeWidth="1.4"/><path d="M8 5v3.5M8 10.5v.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#92400E] mb-3">Coming Soon</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {COMING_SOON_FEATURES.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-xs text-[#B45309]">
                      <div className="h-4 w-4 rounded border border-[#FDE68A] bg-white flex items-center justify-center shrink-0 opacity-50">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}