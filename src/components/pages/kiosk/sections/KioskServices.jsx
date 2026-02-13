import { useEffect, useRef, useState } from "react";
import Button from "../../../Button";
import ReallTimeTranslation from "../../../../assets/webp/Reall-time-translation.webp";
import DocumentCameraScanner from "../../../../assets/webp/Document-camera-scanner.webp";
import AllInteractionsRecorded from "../../../../assets/webp/All-interactions-recorded.webp";
import "../kiosk.css";

const SERVICES = [
    {
        title: "Real time translation\nto any language",
        image: ReallTimeTranslation,
    },
    {
        title: "Document\ncamera/scanner",
        image: DocumentCameraScanner,
    },
    {
        title: "All interactions\nrecorded",
        image: AllInteractionsRecorded,
    },
];

const METRICS = [
    { value: 80, suffix: "% -", label: "Operational\ncosts" },
    { value: 50, suffix: "% +", label: "Faster" },
    { value: 30, suffix: "% +", label: "Sales" },
];

// Utility functions
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smoothstep = (t) => t * t * (3 - 2 * t);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const KioskServices = () => {
    const titleRef = useRef(null);
    const sectionRef = useRef(null);
    const metricsRef = useRef(null);

    const [glowAmount, setGlowAmount] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [metricsInView, setMetricsInView] = useState(false);
    const [metricCounts, setMetricCounts] = useState(() => METRICS.map(() => 0));

    // Main scroll progress tracker for the section
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let rafId = 0;

        const update = () => {
            rafId = 0;
            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;

            // Progress: 0 when section top hits bottom of viewport, 1 when section top is at 30% from top
            const start = vh;
            const end = vh * 0.3;
            const progress = clamp01((start - rect.top) / (start - end));

            setScrollProgress(progress);
        };

        const onScrollOrResize = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);
        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            rafId && window.cancelAnimationFrame(rafId);
        };
    }, []);

    // Title glow effect (existing logic)
    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;

        let rafId = 0;

        const update = () => {
            rafId = 0;
            const rect = el.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const titleCenter = rect.top + rect.height / 2;
            const distance = Math.abs(titleCenter - viewportCenter);

            // Near = strongly glowing, Far = fully gradient
            const near = 130;
            const far = 260;
            const t = clamp01(1 - (distance - near) / (far - near));
            setGlowAmount(smoothstep(t));
        };

        const onScrollOrResize = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);
        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            rafId && window.cancelAnimationFrame(rafId);
        };
    }, []);

    // Trigger metrics entrance when user reaches that section
    // and reset when they leave so the bubbles/count-up can re-run.
    useEffect(() => {
        const el = metricsRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setMetricsInView(true);
                    } else {
                        setMetricsInView(false);
                        setMetricCounts(METRICS.map(() => 0));
                    }
                }
            },
            { threshold: 0.35 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Count-up numbers after bubbles appear
    useEffect(() => {
        if (!metricsInView) return;

        let rafId = 0;
        const startTime = performance.now();
        const baseDelayMs = 380;
        const staggerDelayMs = 140;
        const durationMs = 900;

        const tick = (now) => {
            const next = METRICS.map((m, i) => {
                const localStart = startTime + baseDelayMs + i * staggerDelayMs;
                const t = clamp01((now - localStart) / durationMs);
                const eased = easeOutCubic(t);
                return Math.round(m.value * eased);
            });

            setMetricCounts(next);

            const lastStart = startTime + baseDelayMs + (METRICS.length - 1) * staggerDelayMs;
            if (now < lastStart + durationMs) {
                rafId = window.requestAnimationFrame(tick);
            }
        };

        rafId = window.requestAnimationFrame(tick);
        return () => rafId && window.cancelAnimationFrame(rafId);
    }, [metricsInView]);

    const bgMotion = easeOutCubic(clamp01(scrollProgress / 0.38));
    const bgEnter = easeOutCubic(clamp01(scrollProgress / 0.18));
    const titleProgress = easeOutCubic(clamp01((scrollProgress - 0.60) / 0.34));

    // Fully rectangular background
    const bgStyle = {
        background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, #0A6CFF 0%, #0A6CFF 22%, #064199 58%, #031A3F 100%)",
        opacity: bgEnter,
        transform: `translateY(${(1 - bgEnter) * 140}px)`,
        transition: "transform 260ms ease-out, opacity 260ms ease-out",
        willChange: "transform, opacity",
        boxShadow: "10px 18px 15px rgba(0,0,0,0.6)",
    };

    // Title container styles
    const titleContainerStyle = {
        opacity: titleProgress,
        transform: `translateY(${(1 - titleProgress) * 40}px)`,
        transition: "transform 180ms ease-out, opacity 180ms ease-out",
    };

    return (
        <>
            <section ref={sectionRef} className="relative w-full overflow-visible pb-10">
                <div
                    className="pointer-events-none absolute left-0 top-0 h-full w-[100vw] z-10"
                    style={bgStyle}
                />

                <div className="container relative pt-28 z-30">
                    <div style={titleContainerStyle} className="mb-20">
                        <h2
                            ref={titleRef}
                            className="experience-title text-center text-4xl font-medium leading-tight md:text-5xl lg:text-6xl"
                        >
                            <span
                                className="relative inline-block"
                                style={{
                                    background: "linear-gradient(90deg, #FFFFFF 66%, #007FFF 90%)",
                                    WebkitBackgroundClip: "text",
                                    display: "inline-block",
                                    WebkitTextFillColor: `rgba(255,255,255,${glowAmount})`,
                                    color: glowAmount > 0 ? `rgba(255,255,255,${glowAmount})` : "transparent",
                                    transition: "WebkitTextFillColor 280ms ease, color 280ms ease, filter 280ms ease",
                                    filter:
                                        glowAmount > 0
                                            ? `drop-shadow(0 0 ${18 * glowAmount}px rgba(255,255,255,${Math.min(
                                                0.9,
                                                glowAmount
                                            )})) brightness(${1 + 0.15 * glowAmount})`
                                            : "none",
                                }}
                            >
                                What Makes the VideFace <br />
                                <span className="font-bold">Self-Service Kiosk</span> Stand Out
                            </span>
                        </h2>
                    </div>

                    <div className="flex justify-center mt-12 sm:mt-20 md:mt-24 lg:mt-28 mb-8 sm:mb-12 md:mb-16 lg:mb-20">
                        <div
                            className="grid w-full max-w-[1100px] grid-cols-2 justify-items-center gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10"
                            style={{ perspective: "1000px" }}
                        >
                            {SERVICES.map((item, index) => {
                                const baseStart = 0.82;
                                const delay = 0.04;
                                const duration = 0.12;
                                const localStart = baseStart + index * delay;

                                const cardProgress = easeOutCubic(
                                    clamp01((scrollProgress - localStart) / duration)
                                );

                                const cardStyle = {
                                    opacity: cardProgress,
                                    transform: `translateY(${(1 - cardProgress) * 40}px) rotateY(${(1 - cardProgress) * 75}deg)`,
                                    transformOrigin: "center center",
                                    transformStyle: "preserve-3d",
                                    transition: "transform 420ms cubic-bezier(.2,.9,.2,1), opacity 420ms ease-out",
                                    willChange: "transform, opacity",
                                };

                                return (
                                    <div
                                        key={item.title}
                                        className={`w-full transform-gpu transition-transform duration-300 ease-out group ${index === 2 ? "col-span-2 lg:col-span-1 flex justify-center" : ""}`}
                                    >
                                        <div
                                            className={`w-full max-w-[320px] sm:w-full sm:max-w-[320px] md:max-w-[340px] lg:max-w-[360px] ${index === 2 ? "max-w-[calc((100%-1.5rem)/2)] sm:max-w-[calc((100%-2rem)/2)] lg:max-w-[360px]" : ""}`}
                                            style={cardStyle}
                                        >
                                            <div
                                                className="w-full rounded-[22px] overflow-hidden shadow-[10px_14px_20px_0px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35)] group-hover:shadow-[10px_14px_20px_0px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35),0_0_48px_rgba(255,255,255,0.55)]"
                                                style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.title.replace(/\n/g, " ")}
                                                    className="w-full h-[clamp(240px,52vw,440px)] object-cover block transform transition-transform duration-400 ease-out group-hover:scale-105"
                                                    style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
                                                />
                                            </div>

                                            <h3 className="mt-4 sm:mt-7 md:mt-8 text-center sm:text-2xl md:text-3xl font-semibold text-white whitespace-pre-line leading-snug transition-filter duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section ref={metricsRef} className="relative w-full py-16">
                <div className="container relative py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-black text-4xl md:text-5xl font-medium leading-tight">
                            Unlock Real Impact With Our <br />
                            <span
                                className="font-bold text-5xl md:text-7xl"
                                style={{
                                    background: 'linear-gradient(90deg, #00438B 0%, #007FFF 57%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    color: 'transparent',
                                    display: 'inline-block',
                                }}
                            >
                                Self-Service Kiosk
                            </span>
                        </h2>
                    </div>

                    <div className="grid w-full max-w-[920px] mx-auto grid-cols-2 justify-items-center gap-6 sm:gap-8 md:grid-cols-3 md:gap-10">
                        {METRICS.map((m, i) => (
                            <div key={m.label} className={`flex flex-col items-center ${i === 2 ? "col-span-2 md:col-span-1" : ""}`}>
                                <div
                                    className={`metrics-bubble ${metricsInView ? "metrics-bubble--enter" : ""} relative w-[160px] h-[160px] sm:w-[210px] sm:h-[210px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] transform-gpu`}
                                    style={{
                                        animationDelay: `${i * 140}ms`,
                                    }}
                                >
                                    <div
                                        className="metrics-bubble__inner absolute inset-0 rounded-full flex items-center justify-center text-white shadow-[10px_14px_28px_-10px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35)]"
                                        style={{
                                            background:
                                                "radial-gradient(ellipse 80% 80% at 50% 50%, #0A6CFF 0%, #0A6CFF 22%, #064199 58%, #031A3F 100%)",
                                        }}
                                    >
                                        <div className="text-center relative z-10">
                                            <div
                                                className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight transition-opacity duration-300 ${
                                                    metricsInView ? "opacity-100" : "opacity-0"
                                                }`}
                                            >
                                                {metricCounts[i]}
                                                {m.suffix}
                                            </div>
                                            <div className="mt-2 sm:mt-3 text-sm sm:text-lg md:text-xl font-semibold whitespace-pre-line">
                                                {m.label}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <h3 className="max-w-[640px] mx-auto text-2xl font-medium md:text-4xl text-black leading-tight">
                            Create frictionless experiences <br />
                            with virtual assistance
                        </h3>

                        <div className="flex justify-center mt-10">
                            <Button href="#contact" color="bg-[#0A6CFF]" textColor="text-white" size="lg" className="hero-cta-btn">
                                GET A DEMO
                            </Button>
                        </div>
                    </div>

                    {/* styles moved to ../kiosk.css */}
                </div>
            </section>
        </>
    );
};

export default KioskServices;
