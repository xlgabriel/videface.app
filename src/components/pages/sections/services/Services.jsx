import { useEffect, useRef, useState } from "react";
import Button from "../../../Button";
import "../sections.css";

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smoothstep = (t) => t * t * (3 - 2 * t);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const Services = ({
    title,
    items = [],
    ctaText = "GET A DEMO",
}) => {
    const titleRef = useRef(null);
    const sectionRef = useRef(null);

    const [glowAmount, setGlowAmount] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeServiceIndex, setActiveServiceIndex] = useState(-1);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let rafId = 0;

        const update = () => {
            rafId = 0;
            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;

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

    const bgEnter = easeOutCubic(clamp01(scrollProgress / 0.18));
    const titleProgress = easeOutCubic(clamp01((scrollProgress - 0.6) / 0.34));

    const bgStyle = {
        background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, #0A6CFF 0%, #0A6CFF 22%, #064199 58%, #031A3F 100%)",
        opacity: bgEnter,
        transform: `translateY(${(1 - bgEnter) * 140}px)`,
        transition: "transform 260ms ease-out, opacity 260ms ease-out",
        willChange: "transform, opacity",
        boxShadow: "10px 18px 15px rgba(0,0,0,0.6)",
    };

    const titleContainerStyle = {
        opacity: titleProgress,
        transform: `translateY(${(1 - titleProgress) * 40}px)`,
        transition: "transform 180ms ease-out, opacity 180ms ease-out",
    };

    const getDepthLevel = (index) => {
        if (activeServiceIndex < 0) return { opacity: 1, scale: 1, saturation: 1 };

        const distance = Math.abs(index - activeServiceIndex);
        if (distance === 0) return { opacity: 1, scale: 1.08, saturation: 1.15 };
        if (distance === 1) return { opacity: 0.8, scale: 0.96, saturation: 0.95 };
        return { opacity: 0.6, scale: 0.9, saturation: 0.8 };
    };

    const isFourItems = items.length === 4;

    return (
            <section ref={sectionRef} className="relative w-full overflow-visible pb-10">
                <div className="pointer-events-none absolute left-0 top-0 h-full w-[100vw] z-10" style={bgStyle} />

                <div className="relative pt-28 z-30">
                    <div className="container">
                        <div style={titleContainerStyle} className="mb-20">
                            <h2 ref={titleRef} className="experience-title text-center text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
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
                                            ? `drop-shadow(0 0 ${18 * glowAmount}px rgba(255,255,255,${Math.min(0.9, glowAmount)})) brightness(${1 + 0.15 * glowAmount})`
                                            : "none",
                                }}
                            >
                                {title}
                            </span>
                        </h2>
                        </div>
                    </div>

                    <div className={`mx-auto mt-12 sm:mt-20 md:mt-24 lg:mt-28 mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-5 md:px-10 lg:px-12 ${isFourItems ? "max-w-[100rem]" : "max-w-[80rem]"}`}>
                        <div
                            className={`grid w-full grid-cols-2 gap-6 sm:grid-cols-2 sm:gap-8 ${isFourItems ? "lg:grid-cols-4" : "lg:grid-cols-3"} lg:gap-10`}
                            style={{ perspective: "1000px" }}
                        >
                            {items.map((item, index) => {
                                const baseStart = 0.82;
                                const delay = 0.04;
                                const duration = 0.12;
                                const localStart = baseStart + index * delay;

                                const cardProgress = easeOutCubic(clamp01((scrollProgress - localStart) / duration));
                                const depth = getDepthLevel(index);
                                const isLastOddItem = items.length % 2 === 1 && index === items.length - 1;

                                const cardStyle = {
                                    opacity: cardProgress * depth.opacity,
                                    transform: `translateY(${(1 - cardProgress) * 40}px) rotateY(${(1 - cardProgress) * 75}deg) scale(${depth.scale})`,
                                    transformOrigin: "center center",
                                    transformStyle: "preserve-3d",
                                    transition: "transform 360ms cubic-bezier(.2,.9,.2,1), opacity 320ms ease-out, filter 320ms ease-out",
                                    willChange: "transform, opacity",
                                    filter: `saturate(${depth.saturation})`,
                                };

                                const titleStyle = {
                                    opacity: depth.opacity,
                                    transition: "opacity 320ms ease-out",
                                };

                                return (
                                    <div
                                        key={item.title}
                                        className={`w-full transform-gpu transition-transform duration-300 ease-out group ${isLastOddItem ? "col-span-2 lg:col-span-1 flex justify-center" : ""}`}
                                        onMouseEnter={() => setActiveServiceIndex(index)}
                                        onMouseLeave={() => setActiveServiceIndex(-1)}
                                        onFocus={() => setActiveServiceIndex(index)}
                                        onBlur={() => setActiveServiceIndex(-1)}
                                        onTouchStart={() => setActiveServiceIndex(index)}
                                    >
                                        <div
                                            className="w-full"
                                            style={cardStyle}
                                        >
                                            <div
                                                className="relative w-full rounded-[22px] overflow-hidden shadow-[10px_14px_20px_0px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35)] group-hover:shadow-[10px_14px_20px_0px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35),0_0_48px_rgba(255,255,255,0.55)]"
                                                style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.alt}
                                                    className="w-full h-[clamp(240px,52vw,440px)] object-cover block transform transition-transform duration-400 ease-out group-hover:scale-105"
                                                    style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
                                                />

                                                {item.description ? (
                                                    <div className="pointer-events-none absolute inset-x-3 bottom-3 rounded-2xl border border-white/30 bg-black/20 backdrop-blur-md px-4 py-3 shadow-[0_10px_28px_rgba(0,0,0,0.35)] opacity-0 translate-y-3 scale-[0.98] transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100">
                                                        <p className="text-xs sm:text-sm md:text-base font-medium text-white/95 leading-snug">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                ) : null}
                                            </div>

                                            <div className="mt-4 sm:mt-7 md:mt-8 flex items-start justify-center" style={titleStyle}>
                                                <h3 className="text-center sm:text-2xl md:text-3xl font-semibold text-white whitespace-pre-line leading-snug transition-filter duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="container">
                        <div className="flex justify-center mt-10">
                            <Button color="bg-white" textColor="text-[#0A6CFF]" size="lg" className="hero-cta-btn">
                                {ctaText}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

    );
};

export default Services;
export { Services };
