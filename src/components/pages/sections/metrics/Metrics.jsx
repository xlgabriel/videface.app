import { useEffect, useRef, useState } from "react";
import Button from "../../../Button";
import "../sections.css";

const DEFAULT_METRICS = [
    { value: 80, suffix: "% -", label: "Operational\ncosts" },
    { value: 50, suffix: "% +", label: "Faster" },
    { value: 30, suffix: "% +", label: "Sales" },
];

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const Metrics = ({
    metrics = DEFAULT_METRICS,
    impactTitleTop = "Unlock Real Impact With Our",
    impactTitleHighlight = "Self-Service Kiosk",
    ctaTitle = "Create frictionless experiences",
    ctaSubtitle = "with virtual assistance",
    ctaText = "GET A DEMO",
}) => {
    const metricsRef = useRef(null);
    const [metricsInView, setMetricsInView] = useState(false);
    const [metricCounts, setMetricCounts] = useState(() => metrics.map(() => 0));

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
                        setMetricCounts(metrics.map(() => 0));
                    }
                }
            },
            { threshold: 0.35 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [metrics]);

    useEffect(() => {
        if (!metricsInView) return;

        let rafId = 0;
        const startTime = performance.now();
        const baseDelayMs = 380;
        const staggerDelayMs = 140;
        const durationMs = 900;

        const tick = (now) => {
            const next = metrics.map((m, i) => {
                const localStart = startTime + baseDelayMs + i * staggerDelayMs;
                const t = clamp01((now - localStart) / durationMs);
                const eased = easeOutCubic(t);
                return Math.round(m.value * eased);
            });

            setMetricCounts(next);

            const lastStart = startTime + baseDelayMs + (metrics.length - 1) * staggerDelayMs;
            if (now < lastStart + durationMs) {
                rafId = window.requestAnimationFrame(tick);
            }
        };

        rafId = window.requestAnimationFrame(tick);
        return () => rafId && window.cancelAnimationFrame(rafId);
    }, [metricsInView, metrics]);

    return (
        <section ref={metricsRef} className="relative w-full pt-16 pb-8">
            <div className="container relative py-12">
                <div className="text-center mb-12">
                    <h2 className="text-black text-4xl md:text-5xl font-medium leading-tight">
                        {impactTitleTop} <br />
                        <span
                            className="font-bold text-5xl md:text-7xl"
                            style={{
                                background: "linear-gradient(90deg, #00438B 0%, #007FFF 57%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                color: "transparent",
                                display: "inline-block",
                            }}
                        >
                            {impactTitleHighlight}
                        </span>
                    </h2>
                </div>

                <div className="grid w-full max-w-[920px] mx-auto grid-cols-2 justify-items-center gap-6 sm:gap-8 md:grid-cols-3 md:gap-10">
                    {metrics.map((m, i) => (
                        <div key={m.label} className={`flex flex-col items-center ${i === 2 ? "col-span-2 md:col-span-1" : ""}`}>
                            <div
                                className={`metrics-bubble ${metricsInView ? "metrics-bubble--enter" : ""} relative w-[160px] h-[160px] sm:w-[210px] sm:h-[210px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] transform-gpu`}
                                style={{ animationDelay: `${i * 140}ms` }}
                            >
                                <div
                                    className="metrics-bubble__inner absolute inset-0 rounded-full flex items-center justify-center text-white shadow-[10px_14px_28px_-10px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35)]"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse 80% 80% at 50% 50%, #0A6CFF 0%, #0A6CFF 22%, #064199 58%, #031A3F 100%)",
                                    }}
                                >
                                    <div className="text-center relative z-10">
                                        <div className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight transition-opacity duration-300 ${metricsInView ? "opacity-100" : "opacity-0"}`}>
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
                        {ctaTitle} <br />
                        {ctaSubtitle}
                    </h3>

                    <div className="flex justify-center mt-10">
                        <Button color="bg-[#0A6CFF]" textColor="text-white" size="lg" className="hero-cta-btn">
                            {ctaText}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Metrics;
export { Metrics };
