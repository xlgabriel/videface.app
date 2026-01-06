import { useEffect, useMemo, useRef, useState } from "react";

function ensureGlitchStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById("industry-stats-glitch")) return;

    const style = document.createElement("style");
    style.id = "industry-stats-glitch";
    style.textContent = `
    @keyframes glitchIn {
      0% { opacity: 0; filter: brightness(.9) contrast(1); }
      55% { opacity: 1; filter: brightness(1.15) contrast(1.1); }
      100% { opacity: 1; filter: brightness(1) contrast(1); }
    }

    @keyframes glitchFlicker {
      0% { opacity: 0; }
      25% { opacity: 1; }
      50% { opacity: 0.4; }
      75% { opacity: 1; }
      100% { opacity: 1; }
    }
  `;
    document.head.appendChild(style);
}

function useInView({ rootMargin = "-10% 0px -15% 0px" } = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { root: null, rootMargin, threshold: 0.15 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [rootMargin]);

    return { ref, inView };
}

function useCountUp({ active, to, durationMs = 1200 }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!active) {
            setValue(0);
            return;
        }

        const start = (typeof performance !== "undefined" ? performance.now() : Date.now());
        const from = 0;
        const target = to;

        let rafId = 0;
        const tick = (now) => {
            const nowTs = typeof now === "number" ? now : (typeof performance !== "undefined" ? performance.now() : Date.now());
            const t = Math.min(1, (nowTs - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3);
            const next = from + (target - from) * eased;
            setValue(next);
            if (t < 1) rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [active, to, durationMs]);

    return value;
}

function GlitchWrap({ active, delayMs = 0, className, children }) {
    return (
        <div
            className={className}
            style={
                active
                    ? {
                        animation:
                            "glitchIn 650ms ease-out both, glitchFlicker 900ms steps(2,end) both",
                        animationDelay: `${delayMs}ms`,
                    }
                    : {}
            }
        >
            {children}
        </div>
    );
}

function StatIconOperational({ active, delayMs = 0 }) {
    return (
        <GlitchWrap
            active={active}
            delayMs={delayMs}
            className={`relative h-40 w-32 transition-all duration-700 ease-out ${active
                ? "opacity-100 translate-y-0 scale-110 drop-shadow-xl"
                : "opacity-0 translate-y-6 scale-75"
                }`}
        >
            <div className="absolute bottom-0 left-0 rounded-lg bg-white/30" style={{ height: '120px', width: '112px' }} />
            <div
                className="absolute bottom-0 left-0 rounded-lg bg-white"
                style={{ height: '120px', width: '112px', clipPath: "polygon(0 40%, 100% 70%, 100% 100%, 0 100%)" }}
            />
        </GlitchWrap>
    );
}

function StatIconBars({ active, variant = 1, delayMs = 0 }) {
    const bars =
        variant === 1
            ? [
                { h: 60, o: 0.25 },
                { h: 90, o: 0.55 },
                { h: 130, o: 1 },
            ]
            : [
                { h: 70, o: 0.25 },
                { h: 105, o: 0.55 },
                { h: 145, o: 1 },
            ];

    return (
        <GlitchWrap
            active={active}
            delayMs={delayMs}
            className={`flex h-40 w-40 items-end justify-center gap-5 transition-all duration-700 ease-out ${active
                ? "opacity-100 translate-y-0 scale-110 drop-shadow-xl"
                : "opacity-0 translate-y-6 scale-75"
                }`}
        >
            {bars.map((bar, idx) => (
                <div
                    key={idx}
                    className="w-8 rounded-md bg-white"
                    style={{ height: `${bar.h}px`, opacity: bar.o }}
                />
            ))}
        </GlitchWrap>
    );
}

export default function IndustryStats() {
    useEffect(() => {
        ensureGlitchStyles();
    }, []);

    const { ref, inView } = useInView();

    const stats = useMemo(
        () => [
            { value: -80, suffix: "%", label: "Operational costs", icon: "oper" },
            { value: 50, prefix: "+", suffix: "%", label: "Faster", icon: "bars1" },
            { value: 30, prefix: "+", suffix: "%", label: "Sales", icon: "bars2" },
        ],
        []
    );

    const v0 = useCountUp({ active: inView, to: stats[0].value });
    const v1 = useCountUp({ active: inView, to: stats[1].value });
    const v2 = useCountUp({ active: inView, to: stats[2].value });
    const values = [v0, v1, v2];

    return (
        <section
            ref={ref}
            className="w-screen shadow-black/50 shadow-xl"
            style={{ background: "linear-gradient(180deg, #0A6CFF 0%, #064199 100%)" }}
        >
            <div className="mx-auto w-full max-w-[1800px] px-4 py-32">
                <div className="grid grid-cols-1 gap-24 md:grid-cols-3 md:gap-16">
                    {stats.map((stat, idx) => {
                        const raw = values[idx];
                        const abs = Math.round(Math.abs(raw));
                        const prefix = stat.prefix ?? (stat.value < 0 ? "-" : "");

                        return (
                            <div key={stat.label} className="flex flex-col items-center text-center">
                                <div
                                    className={`text-7xl font-extrabold leading-none text-white transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                                        }`}
                                >
                                    {prefix}
                                    {abs}
                                    {stat.suffix}
                                </div>

                                <div
                                    className={`mt-4 text-3xl font-light text-white/90 transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                                        }`}
                                >
                                    {stat.label}
                                </div>

                                <div className="mt-4">
                                    {stat.icon === "oper" ? (
                                        <StatIconOperational active={inView} delayMs={idx * 80} />
                                    ) : stat.icon === "bars1" ? (
                                        <StatIconBars active={inView} variant={1} delayMs={idx * 80} />
                                    ) : (
                                        <StatIconBars active={inView} variant={2} delayMs={idx * 80} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
