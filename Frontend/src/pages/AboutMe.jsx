import { useNavigate } from "react-router-dom";

const projects = [
  {
    title: "NetWatch",
    badge: "Flagship Project",
    tags: ["React", "Node.js", "MongoDB", "JWT", "Cron Jobs", "Recharts"],
    desc: "Real-time website monitoring platform with scheduled health checks, response-time analytics, monitor management, authentication, and detailed monitoring history.",
    link: "#",
  },
  {
    title: "Phishing Detection Chrome Extension",
    badge: null,
    tags: ["Machine Learning", "XGBoost", "Chrome Extension"],
    desc: "Browser extension that detects phishing websites using a machine learning model trained on real-world URL datasets.",
    link: "https://github.com/thorfin556",
  },
  {
    title: "HTTP Security Header Analyzer",
    badge: null,
    tags: ["Security", "MERN", "HTTP Headers"],
    desc: "Security analysis tool that inspects website headers and evaluates security configurations including HSTS, CSP, X-Frame-Options, and other best practices.",
    link: null,
  },
];

const stack = [
  {
    title: "Frontend",
    items: ["React", "JavaScript", "Tailwind CSS", "React Router", "Context API", "Vite"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "bcrypt", "node-cron"],
  },
  {
    title: "Database",
    items: ["MongoDB", "Mongoose", "Schema Design", "Data Modeling"],
  },
  {
    title: "Security & Tools",
    items: ["Git", "GitHub", "OWASP Basics", "Chrome Extensions", "XGBoost", "Python"],
  },
];

export default function AboutMePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen font-sans" style={{ background: "#18110C", color: "#F5F1EA" }}>

      {/* Nav */}
      <nav
        className="flex items-center justify-between px-12 py-5"
        style={{ borderBottom: "1px solid rgba(212,169,77,0.15)" }}
      >
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-xl font-bold" style={{ color: "#D4A94D" }}>NetWatch</span>
          <span className="text-xs tracking-widest" style={{ color: "#6b5a44" }}>MONITOR</span>
        </div>
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate("/features")}
            className="text-sm transition-colors duration-150 bg-transparent border-none cursor-pointer"
            style={{ color: "#B8A999" }}
          >
            Features
          </button>
          <button
            onClick={() => navigate("/about-me")}
            className="text-sm transition-colors duration-150 bg-transparent border-none cursor-pointer"
            style={{ color: "#D4A94D" }}
          >
            About Myself
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-sm px-5 py-2 rounded-md transition-colors duration-150 bg-transparent cursor-pointer"
            style={{ border: "1px solid #D4A94D", color: "#D4A94D" }}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* SECTION 1 — Hero */}
      <section
        style={{
          background:
            "radial-gradient(ellipse at 60% 0%, rgba(212,169,77,0.07) 0%, transparent 60%), #18110C",
        }}
      >
        <div className="max-w-4xl mx-auto px-12 py-32 text-center">
          <div
            className="inline-flex items-center gap-2 text-xs tracking-widest px-4 py-2 rounded-full mb-10"
            style={{
              border: "1px solid rgba(212,169,77,0.3)",
              color: "#D4A94D",
              background: "rgba(212,169,77,0.06)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#D4A94D" }}
            />
            AVAILABLE FOR SOFTWARE ENGINEERING ROLES
          </div>

          <h1
            className="font-black mb-4 leading-none"
            style={{ fontSize: "clamp(48px, 8vw, 88px)", color: "#F5F1EA" }}
          >
            Mohd Asim.
          </h1>

          <p
            className="font-semibold mb-8 leading-tight"
            style={{ fontSize: "clamp(18px, 3vw, 26px)", color: "#B8A999" }}
          >
            Full Stack Developer.{" "}
            <span style={{ color: "#D4A94D" }}>Cybersecurity & Monitoring Systems.</span>
          </p>

          <p
            className="mx-auto mb-4 leading-relaxed"
            style={{ maxWidth: 580, fontSize: 16, color: "#B8A999" }}
          >
            B.Tech Computer Science graduate focused on building full stack applications,
            monitoring systems, and security-focused tools.
          </p>
          <p
            className="mx-auto mb-14 leading-relaxed"
            style={{ maxWidth: 560, fontSize: 16, color: "#7a6a52" }}
          >
            I enjoy building complete products from scratch — from database design and
            authentication to dashboards and deployment-ready systems.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://github.com/thorfin556"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-opacity duration-200 hover:opacity-90 no-underline"
              style={{ background: "#D4A94D", color: "#18110C" }}
            >
              ↗ GitHub
            </a>
            <a
              href="mailto:mohd.asim.dev@gmail.com"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold no-underline"
              style={{
                border: "1px solid rgba(212,169,77,0.3)",
                color: "#D4A94D",
                background: "rgba(212,169,77,0.05)",
              }}
            >
              ✉ Email
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold no-underline"
              style={{
                border: "1px solid rgba(245,241,234,0.1)",
                color: "#B8A999",
                background: "rgba(245,241,234,0.03)",
              }}
            >
              ↓ Resume
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Featured Projects */}
      <section style={{ background: "#F5F1EA" }}>
        <div className="max-w-5xl mx-auto px-12 py-24">
          <div className="mb-14">
            <p className="text-xs tracking-widest mb-4" style={{ color: "#D4A94D" }}>
              WORK
            </p>
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#18110C" }}>
              Featured Projects
            </h2>
            <p className="text-base" style={{ color: "#6b5a44", maxWidth: 520 }}>
              Projects that demonstrate real-world backend architecture, monitoring,
              security, and full stack development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div
                key={i}
                className="group relative flex flex-col rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(212,169,77,0.2)",
                  boxShadow: "0 2px 24px rgba(24,17,12,0.07)",
                }}
              >
                {p.badge && (
                  <div
                    className="absolute top-5 right-5 text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ background: "#D4A94D", color: "#18110C" }}
                  >
                    {p.badge}
                  </div>
                )}

                <h3 className="text-lg font-bold mb-3 leading-snug" style={{ color: "#18110C" }}>
                  {p.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(212,169,77,0.1)",
                        color: "#8a6a2a",
                        border: "1px solid rgba(212,169,77,0.2)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-sm leading-relaxed flex-1" style={{ color: "#6b5a44" }}>
                  {p.desc}
                </p>

                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold no-underline"
                    style={{ color: "#D4A94D" }}
                  >
                    View project ↗
                  </a>
                ) : (
                  <span className="mt-6 inline-flex items-center text-xs" style={{ color: "#B8A999" }}>
                    In progress
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Philosophy */}
      {/* <section
        style={{
          background:
            "radial-gradient(ellipse at 40% 100%, rgba(212,169,77,0.06) 0%, transparent 60%), #18110C",
        }}
      >
        <div className="max-w-3xl mx-auto px-12 py-28 text-center">
          <p className="text-xs tracking-widest mb-6" style={{ color: "#D4A94D" }}>
            PHILOSOPHY
          </p>
          <h2 className="text-4xl font-bold mb-16 leading-tight" style={{ color: "#F5F1EA" }}>
            How I Build Software
          </h2>

          <div className="text-left space-y-0">
            {[
              "I prefer building complete systems instead of tutorial projects.",
              "Every backend project I build includes authentication, database design, validation, protected routes, API architecture, and real-world functionality.",
              "My focus is solving practical problems through monitoring tools, security-focused applications, and scalable full stack systems.",
              "I believe understanding the entire system is more important than quickly assembling features without understanding how they work.",
            ].map((text, i) => (
              <div
                key={i}
                className="flex gap-6 items-start py-7"
                style={{ borderBottom: "1px solid rgba(212,169,77,0.07)" }}
              >
                <span
                  className="text-xs font-mono mt-1 shrink-0"
                  style={{ color: "#4a3a28" }}
                >
                  0{i + 1}
                </span>
                <p className="text-lg leading-relaxed" style={{ color: "#B8A999" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* SECTION 4 — Tech Stack */}
      <section style={{ background: "#3d2c20" }}>
        <div className="max-w-5xl mx-auto px-12 py-24">
          <div className="mb-14">
            <p className="text-xs tracking-widest mb-4" style={{ color: "#D4A94D" }}>
              TOOLS
            </p>
            <h2 className="text-4xl font-bold" style={{ color: "#18110C" }}>
              Tech Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {stack.map((s) => (
              <div
                key={s.title}
                className="flex flex-col rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(212,169,77,0.15)",
                  boxShadow: "0 2px 16px rgba(24,17,12,0.05)",
                }}
              >
                <div
                  className="text-xs font-bold tracking-wider mb-5 pb-3"
                  style={{
                    color: "#D4A94D",
                    borderBottom: "1px solid rgba(212,169,77,0.2)",
                  }}
                >
                  {s.title.toUpperCase()}
                </div>
                <ul className="flex flex-col gap-3 flex-1 list-none p-0 m-0">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "#4a3a28" }}>
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "#D4A94D" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Contact CTA */}
      <section
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212,169,77,0.08) 0%, transparent 70%), #18110C",
        }}
      >
        <div className="max-w-4xl mx-auto px-12 py-32 text-center">
          <p className="text-xs tracking-widest mb-6" style={{ color: "#D4A94D" }}>
            CONTACT
          </p>
          <h2
            className="font-black mb-6 leading-tight"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "#F5F1EA" }}
          >
            Let's Build Something Meaningful
          </h2>
          <p
            className="leading-relaxed mb-14"
            style={{ fontSize: 17, color: "#7a6a52", maxWidth: 480, margin: "0 auto 56px" }}
          >
            Open to software engineering opportunities, collaboration, and challenging projects.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://github.com/thorfin556"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-7 py-4 rounded-lg text-sm font-bold no-underline transition-opacity duration-200 hover:opacity-90"
              style={{ background: "#D4A94D", color: "#18110C" }}
            >
              ↗ GitHub
            </a>
            <a
              href="mailto:mohd.asim.dev@gmail.com"
              className="flex items-center gap-2 px-7 py-4 rounded-lg text-sm font-bold no-underline"
              style={{
                border: "1px solid rgba(212,169,77,0.3)",
                color: "#D4A94D",
                background: "rgba(212,169,77,0.05)",
              }}
            >
              ✉ Email
            </a>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-7 py-4 rounded-lg text-sm font-bold bg-transparent cursor-pointer"
              style={{
                border: "1px solid rgba(245,241,234,0.1)",
                color: "#B8A999",
              }}
            >
              ← Back to NetWatch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}