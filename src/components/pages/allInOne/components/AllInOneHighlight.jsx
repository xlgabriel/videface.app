import { useEffect, useRef, useState } from "react";
import { BackgroundCircles } from "../../../design/Hero";

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smoothstep = (t) => t * t * (3 - 2 * t);

function ensureHighlightStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById("allinone-highlight-neon-styles")) return;

    const style = document.createElement("style");
    style.id = "allinone-highlight-neon-styles";
    style.textContent = `
      @keyframes allInOneNeonPulse {
        0% {
          opacity: 0.72;
          text-shadow: 0 0 5px rgba(255,255,255,0.28), 0 0 10px rgba(255,255,255,0.2);
        }
        50% {
          opacity: 1;
          text-shadow: 0 0 10px rgba(255,255,255,0.6), 0 0 22px rgba(255,255,255,0.42);
        }
        100% {
          opacity: 0.78;
          text-shadow: 0 0 6px rgba(255,255,255,0.3), 0 0 12px rgba(255,255,255,0.24);
        }
      }
    `;
    document.head.appendChild(style);
}

export default function AllInOneHighlight() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const [glowAmount, setGlowAmount] = useState(0);

    useEffect(() => {
        ensureHighlightStyles();
    }, []);

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

            const near = 140;
            const far = 280;
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
            if (rafId) window.cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative py-20 overflow-hidden">
            <div
                className="relative overflow-hidden mx-auto w-[92%] max-w-[1300px] rounded-[8px] border border-white/15 px-6 py-14 md:px-10 md:py-16"
                style={{
                    background:
                        "radial-gradient(ellipse 88% 90% at 50% 50%, #0A6CFF 0%, #0A6CFF 26%, #064199 62%, #031A3F 100%)",
                    boxShadow: "0 16px 28px rgba(0,0,0,0.35)",
                }}
            >
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 opacity-35">
                    <BackgroundCircles className="absolute inset-0 rounded-full border border-white/10" />
                </div>

                <h2 ref={titleRef} className="relative z-10 text-center text-4xl md:text-6xl font-semibold leading-tight">
                    <span
                        style={{
                            background: "linear-gradient(90deg, #FFFFFF 66%, #007FFF 90%)",
                            WebkitBackgroundClip: "text",
                            display: "inline-block",
                            WebkitTextFillColor: `rgba(255,255,255,${glowAmount})`,
                            color: glowAmount > 0 ? `rgba(255,255,255,${glowAmount})` : "transparent",
                            transition: "WebkitTextFillColor 280ms ease, color 280ms ease, filter 280ms ease",
                            filter:
                                glowAmount > 0
                                    ? `drop-shadow(0 0 ${18 * glowAmount}px rgba(255,255,255,${Math.min(0.9, glowAmount)})) brightness(${1 + 0.15 * glowAmount})`
                                    : "none",
                        }}
                    >
                        VideFace combines automation with human-powered virtual assistance,
                    </span>
                </h2>

                <div className="relative z-10 mt-8 md:mt-10 text-center text-white text-2xl md:text-5xl leading-[1.3] font-light tracking-wide">
                    <h3 style={{ animation: "allInOneNeonPulse 3.6s ease-in-out infinite" }}>Reduce operational risk</h3>
                    <h3 style={{ animation: "allInOneNeonPulse 3.6s ease-in-out infinite", animationDelay: "240ms" }}>Lower staffing costs</h3>
                    <h3 style={{ animation: "allInOneNeonPulse 3.6s ease-in-out infinite", animationDelay: "420ms" }}>Prevent chargebacks</h3>
                    <h3 style={{ animation: "allInOneNeonPulse 3.6s ease-in-out infinite", animationDelay: "620ms" }}>Improve customer experience</h3>
                </div>
            </div>
        </section>
    );
}
