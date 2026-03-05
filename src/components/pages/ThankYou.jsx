import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Section from "../Section";
import Button from "../Button";
import Seo from "../Seo";
import { BackgroundCircles } from "../design/Hero";

const SOLUTIONS = [
    { label: "Kiosk", url: "/kiosk", icon: "icon-kiosk" },
    { label: "Smart Locker", url: "/key-management", icon: "icon-locker-key" },
    { label: "KeyDrop", url: "/keydrop", icon: "icon-key" },
];

// Module-level flag — survives React StrictMode remounts and any re-render cycle.
// Resets only on a full page reload, which is the correct behavior for conversions.
let conversionFired = false;

export default function ThankYou() {
    const { state } = useLocation();
    const name = state?.name;
    const wantsToSchedule = state?.wantsToSchedule === true;

    useEffect(() => {
        if (conversionFired) return;
        conversionFired = true;

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "conversion",
            send_to: "AW-17972095091/thank_you",
        });
        window.dataLayer.push({
            event: "thank_you_page_view",
            page: "/thank-you",
            page_title: "Thank You",
            customer_name: name || null,
        });
    }, []);

    return (
        <>
            <Seo
                title="Thank You | VideFace"
                description="Thanks for contacting VideFace. We'll be in touch shortly."
                robots="noindex, nofollow"
            />

            <div
                className="overflow-hidden min-h-screen"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, #0A6CFF 0%, #0A6CFF 22%, #064199 58%, #031A3F 100%)",
                }}
            >
                <Header />

                <Section customPaddings="py-0">
                    <section className="relative min-h-screen overflow-hidden">
                        {/* Blue radial background */}
                        <div
                            className="pointer-events-none absolute inset-0 z-0"
                            style={{
                                background:
                                    "radial-gradient(ellipse 80% 80% at 50% 50%, #0A6CFF 0%, #0A6CFF 22%, #064199 58%, #031A3F 100%)",
                            }}
                        />

                        {/* Particles */}
                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-30 z-10">
                            <BackgroundCircles className="absolute inset-0 rounded-full border border-white/10" />
                        </div>

                        <div className="relative z-20 flex min-h-screen flex-col">
                            <div className="flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-[5.25rem] md:pt-[5.5rem]">
                                {/* Confirmation card */}
                                <div className="w-full max-w-[620px] text-center">
                                    {/* Animated checkmark */}
                                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm thankyou-check-enter">
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <path
                                                d="M5 13l4 4L19 7"
                                                stroke="white"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>

                                    <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4 thankyou-fade-enter">
                                        {name ? (
                                            <>Thank you, {name}!</>
                                        ) : (
                                            <>Thank you!</>
                                        )}
                                    </h1>

                                    <p className="text-lg md:text-xl text-white/80 mb-6 thankyou-fade-enter" style={{ animationDelay: "120ms" }}>
                                        {wantsToSchedule
                                            ? "We received your message. Please schedule your demo by clicking the button below to pick a time that works for you."
                                            : <>
                                                We received your message and will be in touch within{" "}
                                                <span className="text-white font-semibold">24 hours</span>.
                                                You can also schedule a demo below to get started sooner.
                                            </>}
                                    </p>

                                    {wantsToSchedule && (
                                        <p className="text-base md:text-lg text-white font-semibold mb-6 thankyou-fade-enter" style={{ animationDelay: "180ms" }}>
                                            Click the button below to schedule your demo
                                        </p>
                                    )}

                                    {/* Main CTA: Schedule a demo */}
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 thankyou-fade-enter" style={{ animationDelay: "220ms" }}>
                                        <Button
                                            size="lg"
                                            className={`hero-cta-btn w-full sm:w-auto ${wantsToSchedule ? "ring-2 ring-white ring-offset-2 ring-offset-transparent" : ""}`}
                                            textColor="text-[#0A6CFF]"
                                            color="bg-white"
                                        >
                                            Schedule a Demo
                                        </Button>
                                        {!wantsToSchedule && (
                                            <Link
                                                to="/"
                                                className="inline-flex items-center justify-center h-14 px-10 text-lg font-semibold text-white border border-white/40 rounded-lg transition-colors hover:bg-white/10 w-full sm:w-auto"
                                            >
                                                Back to Home
                                            </Link>
                                        )}
                                    </div>

                                    {/* Contact shortcuts */}
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/70 mb-8 thankyou-fade-enter" style={{ animationDelay: "320ms" }}>
                                        <a href="mailto:contact@videface.com" className="hover:text-white transition-colors">
                                            contact@videface.com
                                        </a>
                                        <span className="hidden sm:inline text-white/30">|</span>
                                        <a href="tel:+14075586889" className="hover:text-white transition-colors">
                                            +1 (407) 558-6889
                                        </a>
                                    </div>

                                    {/* Explore solutions */}
                                    <div className="thankyou-fade-enter" style={{ animationDelay: "400ms" }}>
                                        <p className="text-white/50 text-sm mb-4">Explore our solutions</p>
                                        <div className="flex flex-wrap items-center justify-center gap-3">
                                            {SOLUTIONS.map((s) => (
                                                <Link
                                                    key={s.url}
                                                    to={s.url}
                                                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm text-white/90 font-medium transition-all hover:bg-white/15 hover:scale-105"
                                                >
                                                    <span aria-hidden="true" className={`${s.icon} w-5 h-5 opacity-80`} />
                                                    {s.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Footer />
                        </div>
                    </section>
                </Section>
            </div>

            <style>{`
                @keyframes thankyouCheckEnter {
                    0% { opacity: 0; transform: scale(0.5); }
                    60% { opacity: 1; transform: scale(1.12); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .thankyou-check-enter {
                    animation: thankyouCheckEnter 0.6s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
                }
                @keyframes thankyouFadeEnter {
                    0% { opacity: 0; transform: translateY(18px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .thankyou-fade-enter {
                    animation: thankyouFadeEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
                    animation-delay: var(--delay, 0ms);
                }
            `}</style>
        </>
    );
}
