import React, { useState, useEffect } from "react";
import api from "../api/axios.js";
import useAuth from "../hooks/useAuth.jsx";
import { Navigate, useNavigate, Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const INTERVAL_OPTIONS = [
  { value: "1", label: "Every 1 minute" },
  { value: "5", label: "Every 5 minutes" },
  { value: "15", label: "Every 15 minutes" },
  { value: "30", label: "Every 30 minutes" },
  { value: "60", label: "Every 60 minutes" },
];

const inputCls =
  "w-full border border-[#E7E0D8] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#111827] placeholder:text-[#C4B49A] rounded-lg focus:outline-none focus:border-[#E8793A] focus:ring-2 focus:ring-[#E8793A]/20 transition-all";

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function Modal({ onClose, title, subtitle, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#1A1008]/25 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl border border-[#E7E0D8] shadow-[0_20px_60px_rgba(0,0,0,0.12)] w-full max-w-md">
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-[#F0EBE3]">
          <div>
            <h2 className="text-base font-bold text-[#111827]">{title}</h2>
            {subtitle && (
              <p className="text-xs text-[#9C8E80] mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#C4B49A] hover:text-[#111827] hover:bg-[#F5F1EA] transition-colors ml-4 shrink-0"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M2 2l11 11M13 2L2 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [Error, setError] = useState(null);
  const navigate = useNavigate();

  const [createOpen, setCreateOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formInterval, setFormInterval] = useState("5");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get("/monitors/dashboard");
        setData(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const { logout, user } = useAuth();

  const handleLogOut = () => {
    logout();
    Navigate("/login");
  };

  const openCreate = () => {
    setFormName("");
    setFormUrl("");
    setFormInterval("5");
    setFormError(null);
    setCreateOpen(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      setFormLoading(true);
      await api.post("/monitors/", {
        name: formName,
        url: formUrl,
        interval: Number(formInterval),
      });
      setCreateOpen(false);
    } catch (err) {
      setFormError(err.response?.data?.message || "Something went wrong");
    } finally {
      setFormLoading(false);
    }
  };

  if (IsLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[#E8793A] border-t-transparent animate-spin" />
          <p className="text-sm text-[#8C7B69] font-medium">
            Loading dashboard…
          </p>
        </div>
      </div>
    );
  }

  if (Error) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAF8F5]">
        <p className="text-sm text-red-500">Error loading dashboard: {Error}</p>
      </div>
    );
  }

  const responseTimeData = data.recentChecks.map((item) => ({
    time: new Date(item.checkedAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    ms: item.responseTime,
  }));

  // ── Sub-components ────────────────────────────────────────────────

  function StatCard({ label, value, sub, icon }) {
    return (
      <div className="rounded-xl border border-[#EDE8E1] bg-white px-5 py-4 flex items-start justify-between hover:border-[#D4C4B0] transition-colors shadow-sm">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-[#9C8E80] font-medium uppercase tracking-wider truncate">
            {label}
          </p>
          <p className="text-xl md:text-2xl font-bold text-[#1A1008] mt-1 leading-none wrap-break-word">
            {value ?? "—"}
          </p>
          {sub && (
            <p className="text-xs text-[#B0A090] mt-1.5 truncate">{sub}</p>
          )}
        </div>
        <div className="ml-3 mt-0.5 shrink-0 text-lg text-[#C4B49A]">
          {icon}
        </div>
      </div>
    );
  }

  function SectionLabel({ children }) {
    return (
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[11px] font-semibold text-[#9C8E80] uppercase tracking-widest">
          {children}
        </span>
        <div className="flex-1 h-px bg-[#EDE8E1]" />
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-[#EDE8E1] bg-white px-3 py-2 shadow-lg">
          <p className="text-xs text-[#9C8E80] mb-1">{label}</p>
          <p className="text-sm font-semibold text-[#E8793A]">
            {payload[0].value} ms
          </p>
        </div>
      );
    }
    return null;
  };

  // Nav items with SVG icons
  const navItems = [
    {
      label: "Dashboard",
      active: true,
      onClick: null,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect
            x="1"
            y="1"
            width="6"
            height="6"
            rx="1.2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect
            x="9"
            y="1"
            width="6"
            height="6"
            rx="1.2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect
            x="1"
            y="9"
            width="6"
            height="6"
            rx="1.2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect
            x="9"
            y="9"
            width="6"
            height="6"
            rx="1.2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      ),
    },
    {
      label: "Monitors",
      active: false,
      onClick: () => navigate("/monitor"),
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect
            x="1"
            y="2"
            width="14"
            height="10"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M5 14h6M8 12v2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Alerts",
      active: false,
      onClick: () => navigate("/alerts"),
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6v3L2 11h12l-1.5-2V6C12.5 3.5 10.5 1.5 8 1.5z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 11v.5a1.5 1.5 0 003 0V11"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      ),
    },
    {
      label: "Status Pages",
      active: false,
      onClick: () => navigate("/status-pages"),
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect
            x="1.5"
            y="2"
            width="13"
            height="12"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="M1.5 5h13" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M4 8.5h8M4 11h5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Integrations",
      active: false,
      onClick: () => navigate("/integrations"),
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle
            cx="4"
            cy="8"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle
            cx="12"
            cy="4"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle
            cx="12"
            cy="12"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M6.5 8H9.5M6.5 7L9.5 4.5M6.5 9L9.5 11.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      label: "Settings",
      active: false,
      onClick: () => navigate("/settings"),
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle
            cx="8"
            cy="8"
            r="2.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.7 3.3l-1.06 1.06M4.36 11.64l-1.06 1.06M12.7 12.7l-1.06-1.06M4.36 4.36L3.3 3.3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  const up = Number(data.activeMonitor) || 0;
  const down = Number(data.downMonitor) || 0;
  const total = up + down || 1;
  const donutData = [
    { name: "Up", value: up, color: "#22C55E" },
    { name: "Down", value: down, color: "#EF4444" },
  ];

  return (
    <div className="flex h-screen bg-[#F5F1EA] text-[#1A1008] overflow-hidden font-sans">
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="w-64 h-full bg-white p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="mb-6 text-xl"
            >
              ✕
            </button>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setSidebarOpen(false);
                    item.onClick?.();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#F5F1EA] text-left text-[#1A1008]"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ── SIDEBAR ── */}
      <aside className="hidden md:flex w-60 shrink-0 border-r border-[#EDE8E1] bg-white flex-col">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#EDE8E1]">
          <div className="flex items-center gap-2.5">
            <svg width="32" height="26" viewBox="0 0 34 28" fill="none">
              <polyline
                points="0,14 4,14 7,4 10,24 13,10 16,18 19,6 22,22 25,12 28,16 31,14 34,14"
                fill="none"
                stroke="#E8793A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <span className="text-[15px] font-bold tracking-tight text-[#1A1008]">
                Net<span className="text-[#E8793A]">Watch</span>
              </span>
              <p className="text-[9px] text-[#B0A090] uppercase tracking-[0.18em] leading-none mt-0.5">
                Monitor
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2.5 py-4 space-y-0.5">
          {navItems.map(({ label, icon, active, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                active
                  ? "bg-[#FFF0E6] text-[#E8793A] font-semibold border border-[#FDDCC4]"
                  : "text-[#8C7B69] hover:text-[#1A1008] hover:bg-[#F5F1EA]"
              }`}
            >
              <span className="shrink-0">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-2.5 pb-4 border-t border-[#EDE8E1] pt-3 space-y-1">
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
          <button
            onClick={handleLogOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#B0A090] hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M5.5 7.5H13m0 0l-2.5-2.5M13 7.5l-2.5 2.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 2H3a1 1 0 00-1 1v9a1 1 0 001 1h6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-15 shrink-0 border-b border-[#EDE8E1] bg-white flex items-center justify-between px-4 md:px-7">
<div className="flex flex-col">
  <div className="flex items-center gap-3">
    <button
      onClick={() => setSidebarOpen(true)}
      className="md:hidden p-1"
    >
      ☰
    </button>

    <h1 className="text-[15px] font-bold text-[#1A1008]">
      Dashboard
    </h1>
  </div>

  <p className="text-xs text-[#9C8E80]">
    Here's what's happening with your monitors.
  </p>
</div>
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs text-[#9C8E80] font-mono bg-[#F5F1EA] border border-[#EDE8E1] px-3 py-1.5 rounded-lg">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <path
                  d="M6 3.5V6l1.5 1.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              {data.LastCheck ? new Date(data.LastCheck).toLocaleString() : "—"}
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-1.5 bg-[#E8793A] hover:bg-[#D4692A] transition-colors px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-sm"
            >
              <span className="text-base leading-none font-light">+</span>
              Create Monitor
            </button>
            <div className="h-7 w-7 rounded-full bg-[#E8793A] flex items-center justify-center text-xs font-bold text-white shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-3 md:px-7 py-4 md:py-6 space-y-6 bg-[#F5F1EA]">
          {/* Status banner */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:items-center md:justify-between bg-white border border-[#EDE8E1] rounded-xl px-4 md:px-5 py-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm text-[#3C3028] font-medium">
                All systems operational
              </span>
              <span className="text-[#B0A090] text-sm">·</span>
              <span className="text-sm text-[#9C8E80]">
                {data.UpTimePercentage
                  ? `${data.UpTimePercentage}% uptime`
                  : "99.97% uptime"}
              </span>
            </div>
            <div className="flex items-center gap-2 border border-[#EDE8E1] bg-[#F5F1EA] px-3 py-1.5 rounded-lg text-xs text-[#9C8E80]">
              Last 24 hours
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 3.5L5 6.5L8 3.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* ── ROW 1: Primary stats ── */}
          <div>
            <SectionLabel>Overview</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard
                label="Total Monitors"
                value={data.TotalMonitor}
                sub="All configured monitors"
                icon={
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <rect
                      x="1"
                      y="2"
                      width="14"
                      height="10"
                      rx="1.5"
                      stroke="#E8793A"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M5 14h6M8 12v2"
                      stroke="#E8793A"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                }
              />
              <StatCard
                label="Up Monitors"
                value={data.activeMonitor}
                sub="Currently operational"
                icon={
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="6.5"
                      stroke="#22C55E"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M5 8l2.2 2.2L11 5.5"
                      stroke="#22C55E"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />
              <StatCard
                label="Down Monitors"
                value={data.downMonitor}
                sub="Currently not responding"
                icon={
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="6.5"
                      stroke="#EF4444"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M5.5 5.5l5 5M10.5 5.5l-5 5"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                }
              />
              <StatCard
                label="Avg. Response Time"
                value={
                  data.avgResponseTime ? `${data.avgResponseTime} ms` : "—"
                }
                sub="Across all monitors"
                icon={
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <circle
                      cx="8"
                      cy="8"
                      r="6.5"
                      stroke="#E8793A"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M8 4.5V8l2 2"
                      stroke="#E8793A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                }
              />
            </div>
          </div>

          {/* ── ROW 2: Secondary stats ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <StatCard
              label="Total Checks"
              value={data.TotalChecks}
              sub="Last 24 hours"
              icon={
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <polyline
                    points="1,10 3.5,10 5,5 7,13 9,7 11,10 13,10 15,10"
                    stroke="#E8793A"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              }
            />
            <StatCard
              label="Uptime (Avg.)"
              value={data.UpTimePercentage ? `${data.UpTimePercentage}%` : "—"}
              sub="Across all monitors"
              icon={
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 11L7 7L9.5 9.5L13 5"
                    stroke="#22C55E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <StatCard
              label="Last Check"
              value={
                data.LastCheck
                  ? new Date(data.LastCheck).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"
              }
              sub={
                data.LastCheck
                  ? new Date(data.LastCheck).toLocaleDateString()
                  : "No data"
              }
              icon={
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="6.5"
                    stroke="#E8793A"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M8 4.5V8l2 2"
                    stroke="#E8793A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              }
            />
            <StatCard
              label="Fastest Monitor"
              value={data.fastestMonitor?.name ?? "—"}
              sub={
                data.fastestMonitor?.responseTime
                  ? `${data.fastestMonitor.responseTime} ms`
                  : "No data"
              }
              icon={
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2L9.5 6H14L10.5 8.5L12 13L8 10.5L4 13L5.5 8.5L2 6H6.5L8 2Z"
                    stroke="#F59E0B"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <StatCard
              label="Slowest Monitor"
              value={data.slowestMonitor?.name ?? "—"}
              sub={
                data.slowestMonitor?.responseTime
                  ? `${data.slowestMonitor.responseTime} ms`
                  : "No data"
              }
              icon={
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 3l-.01 7"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="8" cy="12.5" r="1" fill="#EF4444" />
                </svg>
              }
            />
          </div>

          {/* ── ROW 3: Charts ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
            {/* Response time chart */}
            <div className="rounded-xl border border-[#EDE8E1] bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-sm font-semibold text-[#1A1008]">
                    Response Time
                  </p>
                  <p className="text-xs text-[#9C8E80] mt-0.5">
                    Average response time across all monitors
                  </p>
                </div>
                <span className="text-xs font-mono text-[#9C8E80] bg-[#F5F1EA] border border-[#EDE8E1] px-2.5 py-1 rounded-lg">
                  24h
                </span>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                  data={responseTimeData}
                  margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="rtGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#E8793A"
                        stopOpacity={0.18}
                      />
                      <stop offset="95%" stopColor="#E8793A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#EDE8E1"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="time"
                    tick={{ fill: "#B0A090", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    interval={4}
                  />
                  <YAxis
                    tick={{ fill: "#B0A090", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-[#EDE8E1] bg-white px-3 py-2 shadow-lg">
                            <p className="text-xs text-[#9C8E80] mb-1">
                              {label}
                            </p>
                            <p className="text-sm font-semibold text-[#E8793A]">
                              {payload[0].value} ms
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ms"
                    stroke="#E8793A"
                    strokeWidth={2}
                    fill="url(#rtGrad)"
                    dot={false}
                    activeDot={{
                      r: 4,
                      fill: "#E8793A",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Status donut */}
            <div className="rounded-xl border border-[#EDE8E1] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-[#1A1008] mb-0.5">
                Status Overview
              </p>
              <p className="text-xs text-[#9C8E80] mb-4">
                Current status distribution
              </p>

              <div className="flex justify-center">
                <PieChart width={150} height={150}>
                  <Pie
                    data={donutData}
                    cx={70}
                    cy={70}
                    innerRadius={46}
                    outerRadius={66}
                    paddingAngle={3}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {donutData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                </PieChart>
              </div>

              <div className="space-y-2.5 mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-[#3C3028]">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500 inline-block" />
                    Up
                  </span>
                  <span className="font-semibold text-[#1A1008]">
                    {up}{" "}
                    <span className="text-[#B0A090] font-normal text-xs">
                      ({Math.round((up / total) * 100)}%)
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-[#3C3028]">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500 inline-block" />
                    Down
                  </span>
                  <span className="font-semibold text-[#1A1008]">
                    {down}{" "}
                    <span className="text-[#B0A090] font-normal text-xs">
                      ({Math.round((down / total) * 100)}%)
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ── CREATE MODAL ── */}
      {createOpen && (
        <Modal
          onClose={() => setCreateOpen(false)}
          title="Create Monitor"
          subtitle="Start monitoring a new endpoint."
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Field label="Monitor Name">
              <input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. My Website"
                className={inputCls}
              />
            </Field>
            <Field label="URL">
              <input
                value={formUrl}
                onChange={(e) => setFormUrl(e.target.value)}
                placeholder="https://example.com"
                className={inputCls}
              />
            </Field>
            <Field label="Check Interval">
              <select
                value={formInterval}
                onChange={(e) => setFormInterval(e.target.value)}
                className={inputCls + " appearance-none cursor-pointer"}
              >
                {INTERVAL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
            {formError && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                {formError}
              </p>
            )}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                className="flex-1 border border-[#E7E0D8] bg-[#FAF8F5] text-[#6B7280] text-sm font-medium py-2.5 rounded-lg hover:border-[#D4C4B0] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className="flex-1 bg-[#E8793A] hover:bg-[#D4692A] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60"
              >
                {formLoading ? "Creating…" : "Create Monitor"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;
