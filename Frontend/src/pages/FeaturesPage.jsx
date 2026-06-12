import { useNavigate } from "react-router-dom";

const coreFeatures = [
  {
    category: "Monitoring",
    title: "Real-Time Uptime Monitoring",
    desc: "Your sites are checked every 60 seconds automatically. The moment something goes DOWN, it is recorded instantly with full context.",
    highlight: "HTTP HEAD requests · 10s timeout · auto-fallback",
  },
  {
    category: "Analytics",
    title: "Latency History Charts",
    desc: "Every check records exact response time in milliseconds. Browse full performance history as a live time-series chart.",
    highlight: "Time-series storage · Recharts · 24h history",
  },
  {
    category: "Security",
    title: "JWT Secured Accounts",
    desc: "Each user gets a fully private workspace. Monitors and history are isolated per account using industry-standard authentication.",
    highlight: "bcrypt hashing · Bearer token flow · protected routes",
  },
  {
    category: "Dashboard",
    title: "Live Statistics Dashboard",
    desc: "Uptime percentage, average response time, fastest and slowest endpoints — all computed from real data in real time.",
    highlight: "Uptime % · avg response · fastest/slowest monitor",
  },
  {
    category: "Detection",
    title: "Instant DOWN Detection",
    desc: "Connection errors, DNS failures, and timeouts are all treated as DOWN events. NetWatch tells the difference between slow and dead.",
    highlight: "Timeout handling · DNS fail · status code tracking",
  },
  {
    category: "Management",
    title: "Full Monitor Control",
    desc: "Add, edit, pause, and delete monitors from a clean interface. Search and filter by status. Everything updates without a page reload.",
    highlight: "CRUD operations · search + filter · instant feedback",
  },
];

const steps = [
  { n: "01", title: "User Adds Monitor", desc: "Enter a name and URL. NetWatch normalises and validates it automatically." },
  { n: "02", title: "Scheduled Checks Run", desc: "node-cron fires every 60 seconds and sends an HTTP request to every active monitor." },
  { n: "03", title: "Results Are Stored", desc: "Status, response time, and status code are saved to MongoDB as time-series records." },
  { n: "04", title: "Dashboard Updates", desc: "The React frontend polls the API every 30 seconds. Charts and stats refresh live." },
];

const techCards = [
  {
    label: "Frontend",
    items: ["React", "React Router", "Tailwind CSS", "Vite", "Recharts", "Context API"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "JWT Auth", "Axios", "bcryptjs", "REST APIs"],
  },
  {
    label: "Database",
    items: ["MongoDB", "Mongoose", "Schema Design", "ObjectId Relations", "Query Filtering"],
  },
  {
    label: "Monitoring Engine",
    items: ["node-cron", "HTTP Health Checks", "Response Tracking", "Time-Series Storage", "Timeout Handling"],
  },
];

const whyCards = [
  {
    icon: "◈",
    title: "No Vendor Lock-In",
    desc: "NetWatch is open source and self-explainable. Every piece of infrastructure is standard MERN — no proprietary services, no black boxes.",
  },
  {
    icon: "◎",
    title: "Simple Architecture",
    desc: "One backend, one database, one frontend. The codebase is intentionally lean so any developer can read, understand, and extend it.",
  },
  {
    icon: "◉",
    title: "Built By Developers",
    desc: "Every feature exists because it solves a real problem. No bloat, no onboarding funnels — just the monitoring tools that actually matter.",
  },
];

export default function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans" style={{ background: "#18110C", color: "#F5F1EA" }}>

      {/* Nav */}
      <nav
        className="flex items-center justify-between px-12 py-5 sticky top-0 z-50"
        style={{
          background: "rgba(24,17,12,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(212,169,77,0.12)",
        }}
      >
        <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl font-bold" style={{ color: "#D4A94D" }}>NetWatch</span>
          <span className="text-xs tracking-widest" style={{ color: "#6b5a44" }}>MONITOR</span>
        </div>
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate("/features")}
            className="text-sm bg-transparent border-none cursor-pointer"
            style={{ color: "#D4A94D" }}
          >Features</button>
          <button
            onClick={() => navigate("/about-me")}
            className="text-sm bg-transparent border-none cursor-pointer"
            style={{ color: "#B8A999" }}
          >About Myself</button>
          <button
            onClick={() => navigate("/login")}
            className="text-sm px-5 py-2 rounded-md bg-transparent cursor-pointer"
            style={{ border: "1px solid #D4A94D", color: "#D4A94D" }}
          >Sign In</button>
        </div>
      </nav>

      {/* SECTION 1 — Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 50% -10%, rgba(212,169,77,0.1) 0%, transparent 55%), #18110C",
        }}
      >
        <div className="max-w-4xl mx-auto px-12 py-36 text-center">
          <div
            className="inline-flex items-center gap-2 text-xs tracking-widest px-4 py-2 rounded-full mb-10"
            style={{
              border: "1px solid rgba(212,169,77,0.3)",
              color: "#D4A94D",
              background: "rgba(212,169,77,0.06)",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#D4A94D" }} />
            WEBSITE MONITORING PLATFORM
          </div>

          <h1
            className="font-black mb-6 leading-none"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", color: "#F5F1EA" }}
          >
            Know your outages
            <br />
            <span style={{ color: "#D4A94D" }}>before your users do.</span>
          </h1>

          <p
            className="mx-auto mb-12 leading-relaxed"
            style={{ maxWidth: 580, fontSize: 18, color: "#B8A999" }}
          >
            NetWatch continuously monitors websites, APIs, and services every minute,
            helping developers detect downtime, latency spikes, and failures before
            they become incidents.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 rounded-lg text-sm font-bold border-none cursor-pointer transition-opacity duration-200 hover:opacity-90"
              style={{ background: "#D4A94D", color: "#18110C" }}
            >
              Start Monitoring Free →
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 rounded-lg text-sm font-bold cursor-pointer"
              style={{
                background: "rgba(212,169,77,0.06)",
                border: "1px solid rgba(212,169,77,0.25)",
                color: "#D4A94D",
              }}
            >
              View Dashboard Preview
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { val: "99.97%", label: "Uptime Tracking" },
              { val: "24/7", label: "Monitoring" },
              { val: "Real-Time", label: "Response Tracking" },
            ].map((m) => (
              <div key={m.label} className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#D4A94D" }}
                />
                <span className="text-sm font-semibold" style={{ color: "#F5F1EA" }}>{m.val}</span>
                <span className="text-sm" style={{ color: "#7a6a52" }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Trust Metrics */}
      <section style={{ background: "#21160F", borderTop: "1px solid rgba(212,169,77,0.08)", borderBottom: "1px solid rgba(212,169,77,0.08)" }}>
        <div className="max-w-5xl mx-auto px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "99.97%", label: "Uptime Visibility", sub: "Track availability across all your monitors" },
              { stat: "60s", label: "Check Frequency", sub: "Every active monitor checked every minute" },
              { stat: "Live", label: "Response Tracking", sub: "Response time recorded on every single check" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-2xl p-8 text-center transition-transform duration-200 hover:-translate-y-1"
                style={{
                  background: "#18110C",
                  border: "1px solid rgba(212,169,77,0.12)",
                }}
              >
                <div
                  className="font-black mb-2"
                  style={{ fontSize: "clamp(36px, 5vw, 52px)", color: "#D4A94D" }}
                >
                  {m.stat}
                </div>
                <div className="text-base font-semibold mb-2" style={{ color: "#F5F1EA" }}>{m.label}</div>
                <div className="text-sm" style={{ color: "#7a6a52" }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Core Features */}
      <section style={{ background: "#332216" }}>
        <div className="max-w-5xl mx-auto px-12 py-24">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest mb-4" style={{ color: "#D4A94D" }}>CAPABILITIES</p>
            <h2 className="text-6xl font-bold mb-4" style={{ color: "#F5F1EA" }}>Core Features</h2>
            <p className="text-base mx-auto" style={{ color: "#ffd7ba", maxWidth: 480 }}>
              Everything you need to monitor your infrastructure — nothing you don't.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {coreFeatures.map((f) => (
              <div
                key={f.title}
                className="flex flex-col rounded-2xl p-7 transition-transform duration-200 hover:-translate-y-1"
                style={{
                  background: "#F5F1EA",
                  border: "1px solid rgba(212,169,77,0.1)",
                }}
              >
                <span
                  className="text-xs font-bold tracking-wider px-3 py-1 rounded-full self-start mb-5"
                  style={{
                    background: "rgba(212,169,77,0.1)",
                    color: "#D4A94D",
                    border: "1px solid rgba(212,169,77,0.2)",
                  }}
                >
                  {f.category.toUpperCase()}
                </span>
                <h3 className="text-base font-bold mb-3" style={{ color: "#F5F1EA" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#7a6a52" }}>{f.desc}</p>
                <div
                  className="text-xs pt-4"
                  style={{
                    color: "#4a3a28",
                    borderTop: "1px solid rgba(212,169,77,0.07)",
                    fontFamily: "monospace",
                  }}
                >
                  {f.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Product Workflow */}
      <section style={{ background: "#21160F", borderTop: "1px solid rgba(212,169,77,0.08)" }}>
        <div className="max-w-5xl mx-auto px-12 py-24">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest mb-4" style={{ color: "#D4A94D" }}>WORKFLOW</p>
            <h2 className="text-4xl font-bold" style={{ color: "#F5F1EA" }}>How Monitoring Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            {steps.map((s, i) => (
              <div key={s.n} className="relative flex flex-col items-center text-center px-6">
                {/* connector line */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute top-6 left-1/2 w-full h-px hidden md:block"
                    style={{ background: "linear-gradient(to right, rgba(212,169,77,0.4), rgba(212,169,77,0.1))" }}
                  />
                )}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm mb-5 relative z-10"
                  style={{ background: "#D4A94D", color: "#18110C" }}
                >
                  {s.n}
                </div>
                <h4 className="text-sm font-bold mb-2" style={{ color: "#F5F1EA" }}>{s.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "#7a6a52" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Technical Architecture */}
      <section style={{ background: "#18110C", borderTop: "1px solid rgba(212,169,77,0.08)" }}>
        <div className="max-w-5xl mx-auto px-12 py-24">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest mb-4" style={{ color: "#D4A94D" }}>ARCHITECTURE</p>
            <h2 className="text-4xl font-bold" style={{ color: "#F5F1EA" }}>Built With Modern Technologies</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {techCards.map((t) => (
              <div
                key={t.label}
                className="flex flex-col rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
                style={{
                  background: "#21160F",
                  border: "1px solid rgba(212,169,77,0.1)",
                }}
              >
                <div
                  className="text-xs font-bold tracking-widest mb-5 pb-4"
                  style={{
                    color: "#D4A94D",
                    borderBottom: "1px solid rgba(212,169,77,0.12)",
                  }}
                >
                  {t.label.toUpperCase()}
                </div>
                <ul className="flex flex-col gap-3 flex-1 list-none p-0 m-0">
                  {t.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "#B8A999" }}>
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#D4A94D" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SECTION 6 — CTA */}
      <section
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(212,169,77,0.09) 0%, transparent 65%), #18110C",
          borderTop: "1px solid rgba(212,169,77,0.08)",
        }}
      >
        <div className="max-w-3xl mx-auto px-12 py-32 text-center">
          <p className="text-xs tracking-widest mb-6" style={{ color: "#D4A94D" }}>GET STARTED</p>
          <h2
            className="font-black mb-6 leading-tight"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "#F5F1EA" }}
          >
            Start Monitoring In Minutes
          </h2>
          <p
            className="leading-relaxed mb-14"
            style={{ fontSize: 17, color: "#7a6a52", maxWidth: 440, margin: "0 auto 56px" }}
          >
            Create an account, add your first monitor, and start tracking uptime immediately.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 rounded-lg text-sm font-bold border-none cursor-pointer transition-opacity duration-200 hover:opacity-90"
              style={{ background: "#D4A94D", color: "#18110C" }}
            >
              Create Free Account →
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 rounded-lg text-sm font-bold cursor-pointer bg-transparent"
              style={{
                border: "1px solid rgba(212,169,77,0.25)",
                color: "#D4A94D",
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}