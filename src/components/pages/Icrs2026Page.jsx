import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Section from "../Section";
import Seo from "../Seo";
import { BackgroundCircles } from "../design/Hero";

const BACKEND_URL = "https://videface-backend-166917106706.us-east1.run.app/api/v1";
// const BACKEND_URL = "http://localhost:3010/api/v1"; // Localhost backend URL
const POLL_INTERVAL_MS = 3000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PAGE_BG = "radial-gradient(ellipse 80% 80% at 50% 50%, #0A6CFF 0%, #0A6CFF 22%, #064199 58%, #031A3F 100%)";

export default function Icrs2026Page() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const companyId = searchParams.get("c") ?? "rac4less";

    const [status, setStatus] = useState("loading");
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [wasQueued, setWasQueued] = useState(false);
    const [sendError, setSendError] = useState(null);

    const isEmailValid = EMAIL_PATTERN.test(email.trim().toLowerCase());

    useEffect(() => {
        if (!token || !companyId) {
            setStatus("walk_in");
            return;
        }

        let cancelled = false;
        let timer = null;

        const poll = async () => {
            try {
                const res = await fetch(
                    `${BACKEND_URL}/polaroid/sessions/${encodeURIComponent(companyId)}/${encodeURIComponent(token)}/status`,
                );
                if (!res.ok) {
                    if (!cancelled) setStatus("not_found");
                    return;
                }
                const { status: sessionStatus } = await res.json();
                if (!cancelled) setStatus(sessionStatus);
                if (sessionStatus === "pending" && !cancelled) {
                    timer = setTimeout(poll, POLL_INTERVAL_MS);
                }
            } catch {
                if (!cancelled) setStatus("error");
            }
        };

        poll();

        return () => {
            cancelled = true;
            if (timer) clearTimeout(timer);
        };
    }, [token, companyId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !isEmailValid || sending || sent) return;

        setSending(true);
        setSendError(null);
        const statusAtSubmit = status;

        try {
            const res = await fetch(`${BACKEND_URL}/polaroid/emails/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: token || undefined,
                    companyId,
                    email: email.trim().toLowerCase(),
                    name: name.trim() || undefined,
                    company: company.trim() || undefined,
                    qrUrl: window.location.href,
                }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body?.message ?? `Error ${res.status}`);
            }

            if (statusAtSubmit === "pending") setWasQueued(true);
            setSent(true);
        } catch (err) {
            setSendError(err.message);
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <Seo
                title="Your Photos · #ICRS2026 | VideFace"
                description="Receive your ICRS2026 photo booth photos by email."
                robots="noindex, nofollow"
            />

            <div className="overflow-hidden min-h-screen" style={{ background: PAGE_BG }}>
                <Header />

                <Section customPaddings="py-0">
                    <section className="relative min-h-screen overflow-hidden">
                        <div className="pointer-events-none absolute inset-0 z-0" style={{ background: PAGE_BG }} />

                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-30 z-10">
                            <BackgroundCircles className="absolute inset-0 rounded-full border border-white/10" />
                        </div>

                        <div className="relative z-20 flex min-h-screen flex-col">
                            <div className="flex flex-1 flex-col items-center justify-start md:justify-center px-4 pb-16 pt-36 md:pt-[5.5rem]">
                                {status === "loading" && <LoadingState />}
                                {(status === "not_found" || status === "error") && <NotFoundState />}
                                {status === "expired" && <ExpiredState />}

                                {(status === "ready" || status === "pending" || status === "walk_in") && (
                                    <div className="w-full max-w-[440px]">
                                        {/* Event title */}
                                        <div className="text-center mb-8 px-2">
                                            <p className="text-white font-bold tracking-[0.15em] sm:tracking-[0.25em] text-3xl sm:text-4xl">
                                                ✦ #ICRS2026 ✦
                                            </p>
                                            <p className="text-white/50 text-xs sm:text-sm mt-1 tracking-widest uppercase">
                                                {status === "walk_in" ? "Register · Stay Connected" : "Photo · Email"}
                                            </p>
                                        </div>

                                        {/* Pending banner */}
                                        {status === "pending" && (
                                            <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-5 border border-white/20 bg-white/10">
                                                <span
                                                    className="inline-block w-4 h-4 rounded-full animate-spin shrink-0"
                                                    style={{
                                                        border: "2px solid rgba(255,255,255,0.3)",
                                                        borderTopColor: "#fff",
                                                    }}
                                                />
                                                <p className="text-white/80 text-sm leading-snug">
                                                    Preparing your photos… this takes less than 30 seconds.
                                                </p>
                                            </div>
                                        )}

                                        {/* Form card */}
                                        <div className="rounded-2xl border border-white/20 bg-blue-200/20 shadow-black/30 shadow-xl">
                                            <div className="p-5 sm:p-7 md:p-8">
                                                {!sent ? (
                                                    <form onSubmit={handleSubmit} noValidate>
                                                        <p className="text-white/70 text-sm mb-5">
                                                            {status === "walk_in"
                                                                ? "Enter your details to stay connected."
                                                                : "Enter your details to receive the photos by email."}
                                                        </p>

                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="icrs-name"
                                                                className="block text-white/90 font-semibold text-sm mb-1.5"
                                                            >
                                                                Name
                                                            </label>
                                                            <input
                                                                id="icrs-name"
                                                                type="text"
                                                                placeholder="Your name"
                                                                className="w-full h-11 rounded-md bg-white px-3 text-sm text-slate-900 outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-white/70"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="icrs-company"
                                                                className="block text-white/90 font-semibold text-sm mb-1.5"
                                                            >
                                                                Company
                                                            </label>
                                                            <input
                                                                id="icrs-company"
                                                                type="text"
                                                                placeholder="Company name"
                                                                className="w-full h-11 rounded-md bg-white px-3 text-sm text-slate-900 outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-white/70"
                                                                value={company}
                                                                onChange={(e) => setCompany(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="mb-5">
                                                            <label
                                                                htmlFor="icrs-email"
                                                                className="block text-white/90 font-semibold text-sm mb-1.5"
                                                            >
                                                                Email address{" "}
                                                                <span className="text-white/50 font-normal">
                                                                    (required)
                                                                </span>
                                                            </label>
                                                            <input
                                                                id="icrs-email"
                                                                type="email"
                                                                placeholder="name@email.com"
                                                                required
                                                                className="w-full h-11 rounded-md bg-white px-3 text-sm text-slate-900 outline-none ring-1 ring-white/40 focus:ring-2 focus:ring-white/70"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                        </div>

                                                        {sendError && (
                                                            <p
                                                                className="text-red-200 text-sm mb-4"
                                                                role="alert"
                                                                aria-live="polite"
                                                            >
                                                                {sendError}
                                                            </p>
                                                        )}

                                                        <button
                                                            type="submit"
                                                            disabled={!email || !isEmailValid || sending}
                                                            className="w-full h-11 rounded-md border border-white/40 text-white font-semibold tracking-wide uppercase text-sm transition-colors hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
                                                        >
                                                            {sending ? "Sending..." : "Send"}
                                                        </button>
                                                    </form>
                                                ) : (
                                                    <SuccessState
                                                        email={email}
                                                        wasQueued={wasQueued}
                                                        isWalkIn={status === "walk_in"}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Footer />
                        </div>
                    </section>
                </Section>
            </div>
        </>
    );
}

// ── State sub-components ───────────────────────────────────────────────────────

function LoadingState() {
    return (
        <div className="flex flex-col items-center gap-4">
            <span
                className="inline-block w-10 h-10 rounded-full animate-spin"
                style={{ border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "#fff" }}
            />
            <p className="text-white/50 text-sm">Loading your photos…</p>
        </div>
    );
}

function NotFoundState() {
    return (
        <div className="text-center max-w-xs">
            <p className="text-5xl mb-4">📷</p>
            <h2 className="text-white text-2xl font-bold mb-2">Session Not Found</h2>
            <p className="text-white/50 text-sm leading-relaxed">
                This link is invalid or the session no longer exists.
            </p>
        </div>
    );
}

function ExpiredState() {
    return (
        <div className="text-center max-w-xs">
            <p className="text-5xl mb-4">⏱</p>
            <h2 className="text-white text-2xl font-bold mb-2">Link Expired</h2>
            <p className="text-white/50 text-sm leading-relaxed">This photo session link has expired.</p>
        </div>
    );
}

function SuccessState({ email, wasQueued, isWalkIn }) {
    return (
        <div className="flex flex-col items-center gap-4 py-2 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M5 13l4 4L19 7"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <p className="text-white text-xl font-semibold">{isWalkIn ? "Registered!" : "Email sent!"}</p>
            {isWalkIn ? (
                <p className="text-white/60 text-sm leading-relaxed max-w-[280px]">
                    Thanks for registering at <span className="text-white/80">#ICRS2026</span>. We&apos;ll be in touch!
                </p>
            ) : wasQueued ? (
                <p className="text-white/60 text-sm leading-relaxed max-w-[280px]">
                    We'll send your photos to <span className="text-white/80">{email}</span> as soon as they're ready.
                </p>
            ) : (
                <p className="text-white/60 text-sm leading-relaxed max-w-[280px]">
                    Check your inbox at <span className="text-white/80">{email}</span>
                </p>
            )}
        </div>
    );
}
