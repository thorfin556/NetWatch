import React from "react"
import { useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import { Navigate, useNavigate } from "react-router-dom";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {register} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError(null);
        try {
            setIsLoading(true);
            await register(name,email,password);
            navigate('/login');
        } catch(err){
            const message = err.response?.data?.message || 'Something went wrong';
            setError(message); 
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen bg-[#18110C] text-white overflow-hidden relative flex flex-col">

            {/* SUBTLE GRID BACKGROUND */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(212,169,77,0.07) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(212,169,77,0.07) 1px, transparent 1px)`,
                    backgroundSize: "72px 72px",
                }}
            />

            {/* GOLD GLOW BLOBS */}
            <div className="absolute bottom-[-5%] left-[-5%] w-140 h-140 rounded-full bg-[#D4A94D]/8 blur-[160px] pointer-events-none z-0" />
            <div className="absolute top-[-10%] right-[25%] w-[320px] h-80 rounded-full bg-[#D4A94D]/5 blur-[120px] pointer-events-none z-0" />

            {/* NAVBAR — identical to LoginPage */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-5 lg:px-16 border-b border-white/5">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <svg width="34" height="28" viewBox="0 0 34 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline
                            points="0,14 4,14 7,4 10,24 13,10 16,18 19,6 22,22 25,12 28,16 31,14 34,14"
                            fill="none"
                            stroke="#D4A94D"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div>
                        <h1 className="text-[17px] font-bold tracking-tight text-white leading-none">
                            Net<span className="text-[#D4A94D]">Watch</span>
                        </h1>
                        <p className="text-[9px] text-[#8C7B69] leading-none mt-0.5 tracking-[0.2em] uppercase">
                            Monitor
                        </p>
                    </div>
                </div>

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-9 text-[#f3c18c] text-sm ml-auto mr-8">
                    <button
                        onClick={() => navigate("/features")}
                        className="hover:text-white transition-colors duration-150 bg-transparent border-none cursor-pointer"
                    >
                        Features
                    </button>
                    <button
                        onClick={() => navigate("/about-me")}
                        className="hover:text-[#F5F1EA] transition-colors duration-150 bg-transparent border-none cursor-pointer"
                    >
                        About Myself
                    </button>
                </div>

                {/* Sign In button */}
                <button
                    onClick={() => navigate("/login")}
                    className="border border-[#D4A94D]/50 px-5 py-1.5 text-sm text-[#D4A94D] hover:bg-[#D4A94D]/8 hover:border-[#D4A94D]/80 transition-all duration-150 rounded-[3px] font-medium bg-transparent cursor-pointer"
                >
                    Sign In
                </button>
            </nav>

            {/* MAIN */}
            <div className="relative z-10 flex-1 flex items-center py-10">
                <div className="w-full max-w-350 mx-auto px-8 lg:px-16">
                    <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">

                        {/* LEFT HERO */}
                        <div className="flex-1 space-y-7 lg:pr-4">

                            {/* Status badge */}
                            <div className="inline-flex items-center gap-2.5 border border-green-500/25 bg-green-500/[0.07] px-4 py-2 text-xs text-green-400 font-mono rounded-full">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                                </span>
                                All systems operational · 99.97% uptime
                            </div>

                            {/* Big headline */}
                            <div className="space-y-0">
                                <div className="flex items-end gap-0 leading-none">
                                    <span
                                        className="font-black text-white leading-none select-none"
                                        style={{
                                            fontSize: "clamp(3.8rem, 7.5vw, 6.5rem)",
                                            letterSpacing: "-0.04em",
                                            lineHeight: 0.9,
                                        }}
                                    >
                                        99.97
                                    </span>
                                    <span
                                        className="font-black text-[#D4A94D] leading-none select-none"
                                        style={{
                                            fontSize: "clamp(3rem, 6vw, 5rem)",
                                            letterSpacing: "-0.03em",
                                            lineHeight: 0.9,
                                        }}
                                    >
                                        %
                                    </span>
                                </div>

                                <h1
                                    className="font-black text-white leading-none tracking-tight"
                                    style={{
                                        fontSize: "clamp(3rem, 6vw, 5rem)",
                                        letterSpacing: "-0.04em",
                                        lineHeight: 0.92,
                                    }}
                                >
                                    uptime.
                                </h1>

                                <p
                                    className="text-[#efe4d8] font-light italic leading-none"
                                    style={{
                                        fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)",
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1.05,
                                        marginTop: "0.15em",
                                    }}
                                >
                                    or we page you first.
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-[#B8A999] text-[18px] max-w-md leading-8">
                                NetWatch watches your APIs, sites, and services around the clock.
                                When something breaks, you'll know before your users do.
                            </p>

                            {/* Monitor status cards */}
                            <div className="space-y-1.5 max-w-md">

                                {/* DOWN alert */}
                                <div className="flex items-center gap-3 border border-red-500/20 bg-[#1E0E0A] px-4 py-3 rounded-[5px]">
                                    <div className="flex items-center gap-2 shrink-0">
                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                            <path d="M6.5 1L6.5 9M6.5 12L6.5 11.5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                                            <path d="M2 5L6.5 9.5L11 5" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span className="text-red-400 font-mono text-xs font-semibold tracking-wider">DOWN</span>
                                    </div>
                                    <div className="w-px h-3.5 bg-white/10" />
                                    <span className="text-[#fff5ea] text-xs font-mono flex-1">api.yoursite.com</span>
                                    <span className="text-[#fff6ec] text-xs font-mono">2s ago</span>
                                </div>

                                {/* OK status */}
                                <div className="flex items-center gap-3 border border-white/6 bg-[#1A130D] px-4 py-3 rounded-[5px]">
                                    <div className="flex items-center gap-2 shrink-0">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <circle cx="7" cy="7" r="6" stroke="#22C55E" strokeWidth="1.5"/>
                                            <path d="M4 7L6.2 9.2L10 5" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span className="text-green-400 font-mono text-xs font-semibold tracking-wider">OK</span>
                                    </div>
                                    <div className="w-px h-3.5 bg-white/10" />
                                    <span className="text-[#fff7ed] text-xs font-mono flex-1">dashboard.yoursite.com</span>
                                    <div className="flex items-end gap-0.5 ml-auto">
                                        {[5, 7, 4, 8, 5, 7, 5, 7, 5, 6, 4, 7].map((h, i) => (
                                            <div
                                                key={i}
                                                className="w-0.5 bg-green-400/70 rounded-sm"
                                                style={{ height: `${h}px` }}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[#fcf0e2] text-xs font-mono ml-2">143ms</span>
                                </div>

                                {/* SSL card */}
                                <div className="flex items-center gap-3 border border-white/6 bg-[#1A130D] px-4 py-3 rounded-[5px]">
                                    <div className="flex items-center gap-2 shrink-0">
                                        <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
                                            <path d="M2 6V4.5C2 2.567 4.015 1 6.5 1C8.985 1 11 2.567 11 4.5V6" stroke="#D4A94D" strokeWidth="1.5" strokeLinecap="round"/>
                                            <rect x="1" y="6" width="11" height="7" rx="1.5" stroke="#D4A94D" strokeWidth="1.5"/>
                                            <circle cx="6.5" cy="9.5" r="1" fill="#D4A94D"/>
                                        </svg>
                                        <span className="text-[#D4A94D] font-mono text-xs font-semibold tracking-wider">SSL</span>
                                    </div>
                                    <div className="w-px h-3.5 bg-white/10" />
                                    <span className="text-[#fff9f3] text-xs font-mono flex-1">cert expires in</span>
                                    <span className="text-yellow-400 text-xs font-mono font-bold">47 days</span>
                                </div>

                            </div>
                        </div>

                        {/* REGISTER CARD */}
                        <div className="w-full lg:w-115 shrink-0">
                            <div
                                className="w-full border border-[#D4A94D]/20 bg-[#211811]/90 p-8"
                                style={{
                                    borderRadius: "8px",
                                    backdropFilter: "blur(12px)",
                                    boxShadow: "0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
                                }}
                            >
                                {/* NEW ACCOUNT divider */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-px flex-1 bg-[#D4A94D]/35" />
                                    <span className="font-mono text-[11px] text-[#D4A94D] tracking-[0.25em] uppercase font-semibold">
                                        New Account
                                    </span>
                                    <div className="h-px flex-1 bg-[#D4A94D]/35" />
                                </div>

                                {/* Heading */}
                                <div className="mb-7">
                                    <h2 className="text-[22px] font-bold tracking-tight text-[#F5F1EA]">
                                        Create your account
                                    </h2>
                                    <p className="mt-1 text-sm text-[#8C7B69]">
                                        Start monitoring in under a minute.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">

                                    {/* Full Name */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-[11px] mb-2 text-[#B8A999] font-mono uppercase tracking-[0.15em] font-medium"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Jane Smith"
                                            className="w-full border border-white/8 bg-[#2A1D14] px-4 py-3 text-sm text-[#F5F1EA] placeholder:text-[#5C4E42] focus:outline-none focus:border-[#D4A94D]/50 focus:bg-[#2E2018] transition-all duration-150 font-mono rounded-sm"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-[11px] mb-2 text-[#B8A999] font-mono uppercase tracking-[0.15em] font-medium"
                                        >
                                            Email
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                                                    <rect x="0.75" y="0.75" width="13.5" height="10.5" rx="1.5" stroke="#8C7B69" strokeWidth="1.3"/>
                                                    <path d="M1 2L7.5 7L14 2" stroke="#8C7B69" strokeWidth="1.3" strokeLinecap="round"/>
                                                </svg>
                                            </div>
                                            <input
                                                id="email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="jane@company.com"
                                                className="w-full border border-white/8 bg-[#2A1D14] pl-10 pr-4 py-3 text-sm text-[#F5F1EA] placeholder:text-[#5C4E42] focus:outline-none focus:border-[#D4A94D]/50 focus:bg-[#2E2018] transition-all duration-150 font-mono rounded-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-[11px] mb-2 text-[#B8A999] font-mono uppercase tracking-[0.15em] font-medium"
                                        >
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
                                                    <path d="M2 7V5C2 2.791 4.015 1 6.5 1C8.985 1 11 2.791 11 5V7" stroke="#8C7B69" strokeWidth="1.3" strokeLinecap="round"/>
                                                    <rect x="0.75" y="6.75" width="11.5" height="7.5" rx="1.5" stroke="#8C7B69" strokeWidth="1.3"/>
                                                    <circle cx="6.5" cy="10.5" r="1.2" fill="#8C7B69"/>
                                                </svg>
                                            </div>
                                            <input
                                                id="password"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="min. 6 characters"
                                                className="w-full border border-white/8 bg-[#2A1D14] pl-10 pr-4 py-3 text-sm text-[#F5F1EA] placeholder:text-[#5C4E42] focus:outline-none focus:border-[#D4A94D]/50 focus:bg-[#2E2018] transition-all duration-150 font-mono rounded-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <div className="border border-red-500/25 bg-red-500/[0.07] px-3.5 py-3 text-xs text-red-400 font-mono rounded-sm">
                                            {error}
                                        </div>
                                    )}

                                    {/* Submit button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="group w-full bg-[#D4A94D] hover:bg-[#E6BF6B] active:bg-[#C99D3E] py-3.5 text-sm font-bold tracking-wide text-[#18110C] transition-all duration-150 flex items-center justify-center gap-2.5 mt-1 rounded-sm disabled:opacity-60 disabled:cursor-not-allowed border-none cursor-pointer"
                                    >
                                        {isLoading ? (
                                            <span className="font-mono text-sm">Creating account...</span>
                                        ) : (
                                            <>
                                                <span className="text-[15px]">Create Account</span>
                                                <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-150 text-base">→</span>
                                            </>
                                        )}
                                    </button>

                                    {/* Login link */}
                                    <div className="text-center text-xs text-[#f0decc] font-mono pt-1">
                                        already have an account?{" "}
                                        <span
                                            onClick={() => navigate("/login")}
                                            className="text-[#D4A94D] hover:text-[#E6BF6B] cursor-pointer transition-colors"
                                        >
                                            sign in
                                        </span>
                                    </div>

                                </form>
                            </div>

                            {/* Trust badge */}
                            <div
                                className="mt-3 ml-auto mr-2 w-fit border border-[#D4A94D]/15 bg-[#D4A94D]/3 px-3 py-1.5 flex items-center gap-2 text-[10px] text-[#8C7B69] font-mono rounded-[3px]"
                                style={{ transform: "rotate(0.8deg)" }}
                            >
                                <span className="text-green-400">●</span>
                                SOC 2 Type II · GDPR ready
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default RegisterPage;