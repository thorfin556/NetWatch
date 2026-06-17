import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const NAV = (navigate, logout) => [
  { label: "Dashboard",    path: "/dashboard",    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4"/></svg> },
  { label: "Monitors",     path: "/monitors",     icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { label: "Alerts",       path: "/alerts",       icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6v3L2 11h12l-1.5-2V6C12.5 3.5 10.5 1.5 8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M6.5 11v.5a1.5 1.5 0 003 0V11" stroke="currentColor" strokeWidth="1.4"/></svg> },
  { label: "Status Pages", path: "/status-pages", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M1.5 5h13" stroke="currentColor" strokeWidth="1.4"/><path d="M4 8.5h8M4 11h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  { label: "Integrations", path: "/integrations", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="4" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6.5 8H9.5M6.5 7L9.5 4.5M6.5 9L9.5 11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { label: "Settings",     path: "/settings",     active: true, icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.7 3.3l-1.06 1.06M4.36 11.64l-1.06 1.06M12.7 12.7l-1.06-1.06M4.36 4.36L3.3 3.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
];

function ComingSoonBadge() {
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFF3E0] text-[#F59E0B] border border-[#FDE68A]">Coming Soon</span>;
}

function Toggle() {
  return (
    <div className="relative w-10 h-5 rounded-full bg-[#E7E0D8] cursor-not-allowed opacity-50">
      <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
    </div>
  );
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-xl border border-[#E7E0D8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="px-6 py-5 border-b border-[#F0EBE3]">
        <h2 className="text-sm font-bold text-[#111827]">{title}</h2>
        {subtitle && <p className="text-xs text-[#9C8E80] mt-0.5">{subtitle}</p>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

function DisabledInput({ label, value, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">{label}</label>
      <input type={type} value={value} disabled
        className="w-full border border-[#E7E0D8] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#9C8E80] rounded-lg cursor-not-allowed opacity-70" readOnly />
    </div>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const handleLogOut = () => { logout(); navigate("/login"); };

  return (
    <div className="flex h-screen bg-[#F6F2EB] text-[#111827] overflow-hidden font-sans">

      {/* Sidebar */}
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
          {NAV(navigate, handleLogOut).map(({ label, icon, path, active }) => (
            <button key={label} onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                active ? "bg-[#FFF8E6] text-[#F59E0B] font-semibold border border-[#FDE68A]"
                       : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F6F2EB]"}`}>
              <span className="shrink-0">{icon}</span>{label}
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
          <button onClick={handleLogOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#B0A090] hover:text-red-500 hover:bg-red-50 transition-colors">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5.5 7.5H13m0 0l-2.5-2.5M13 7.5l-2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 2H3a1 1 0 00-1 1v9a1 1 0 001 1h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-15 shrink-0 border-b border-[#E7E0D8] bg-white flex items-center px-7">
          <div>
            <h1 className="text-[15px] font-bold text-[#111827]">Settings</h1>
            <p className="text-xs text-[#9C8E80]">Manage your account and preferences.</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-7 py-6 space-y-5">

          {/* Profile */}
          <SectionCard title="Profile Settings" subtitle="Your personal information and role.">
            <div className="space-y-4 max-w-lg">
              <DisabledInput label="Name" value={user?.name ?? "testSubject"} />
              <DisabledInput label="Email" value={user?.email ?? "user@example.com"} type="email" />
              <DisabledInput label="Role" value="Admin" />
              <button disabled
                className="flex items-center gap-2 bg-[#F59E0B] opacity-40 cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-lg">
                Save Changes
              </button>
            </div>
          </SectionCard>

          {/* Notifications */}
          <SectionCard title="Notification Settings" subtitle="Control how you receive alerts and updates.">
            <div className="space-y-4 max-w-lg">
              {[
                { label: "Email Notifications", desc: "Receive alerts and summaries via email." },
                { label: "Slack Notifications", desc: "Push alerts directly to your Slack workspace." },
                { label: "Discord Notifications", desc: "Send alerts to your Discord server." },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-[#F0EBE3] last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[#374151]">{label}</p>
                      <ComingSoonBadge />
                    </div>
                    <p className="text-xs text-[#9C8E80] mt-0.5">{desc}</p>
                  </div>
                  <Toggle />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Account */}
          <SectionCard title="Account Settings" subtitle="Security and account management options.">
            <div className="space-y-3 max-w-lg">
              {[
                { label: "Change Password", desc: "Update your account password.", icon: "🔑" },
                { label: "Two-Factor Authentication", desc: "Add an extra layer of security.", icon: "🛡" },
                { label: "Delete Account", desc: "Permanently remove your account and data.", icon: "🗑", danger: true },
              ].map(({ label, desc, icon, danger }) => (
                <div key={label} className="flex items-center justify-between p-4 rounded-lg border border-[#F0EBE3] bg-[#FAF8F5]">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    <div>
                      <p className={`text-sm font-medium ${danger ? "text-red-400" : "text-[#374151]"}`}>{label}</p>
                      <p className="text-xs text-[#9C8E80] mt-0.5">{desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ComingSoonBadge />
                    <button disabled
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border cursor-not-allowed opacity-40 ${
                        danger ? "border-red-200 text-red-400 bg-red-50" : "border-[#E7E0D8] text-[#6B7280] bg-white"}`}>
                      {danger ? "Delete" : "Configure"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Banner */}
          <div className="rounded-xl border border-[#FDE68A] bg-[#FFF8E6] px-6 py-4 flex items-start gap-4">
            <div className="h-8 w-8 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center shrink-0 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#F59E0B" strokeWidth="1.4"/><path d="M8 5v3.5M8 10.5v.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#92400E]">Under Development</p>
              <p className="text-xs text-[#B45309] mt-1 leading-relaxed">
                Settings functionality is currently under development. Future updates will include profile management, notification preferences, security controls, and account customization.
              </p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}