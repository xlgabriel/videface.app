import { useEffect, useRef, useState } from "react";
import { BackgroundCircles } from "../../../design/Hero";

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smoothstep = (t) => t * t * (3 - 2 * t);

export default function AboutUsHighlight() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const [glowAmount, setGlowAmount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isTextVisible, setIsTextVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (sectionRef.current) observer.unobserve(sectionRef.current);
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    useEffect(() => {
        const textObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsTextVisible(true);
                } else {
                    setIsTextVisible(false); // Reset animation when out of view
                }
            },
            { threshold: 0.15, rootMargin: "-10% 0px" } // Triggers slightly before it fully exits
        );

        if (textRef.current) {
            textObserver.observe(textRef.current);
        }

        return () => {
            if (textRef.current) textObserver.unobserve(textRef.current);
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
                className={`relative overflow-hidden mx-auto w-[92%] max-w-[1300px] rounded-[8px] px-6 py-14 md:px-10 md:py-20 transition-all duration-1000 ease-out transform ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                }`}
                style={{
                    background:
                        "radial-gradient(ellipse 88% 90% at 50% 50%, #0A6CFF 0%, #0A6CFF 26%, #064199 62%, #031A3F 100%)",
                    boxShadow: "0 16px 28px rgba(0,0,0,0.35)",
                }}
            >
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 opacity-35">
                    <BackgroundCircles className="absolute inset-0 rounded-full border border-white/10" />
                </div>

                <h2 ref={titleRef} className="relative z-10 text-center text-3xl md:text-[42px] font-normal leading-tight mx-auto max-w-[1100px]">
                    <span
                        style={{
                            display: "inline-block",
                            WebkitTextFillColor: `rgba(255,255,255,${glowAmount > 0.3 ? glowAmount : 0.3})`,
                            color: `rgba(255,255,255,${glowAmount > 0.3 ? glowAmount : 0.3})`,
                            transition: "WebkitTextFillColor 280ms ease, color 280ms ease, filter 280ms ease",
                            filter:
                                glowAmount > 0
                                    ? `drop-shadow(0 0 ${15 * glowAmount}px rgba(255,255,255,${Math.min(0.8, glowAmount)})) brightness(${1 + 0.15 * glowAmount})`
                                    : "none",
                        }}
                    >
                        We are a team of <strong className="font-bold">young entrepreneurs with over 10 years of experience</strong> in state-of-the-art software development. Our mission is to deliver high-quality solutions that empower our clients to <strong className="font-bold">optimize and automate their critical IT objectives.</strong>
                    </span>
                </h2>
            </div>

            <div 
                ref={textRef}
                className={`relative z-10 mx-auto mt-20 max-w-[1000px] px-6 text-center text-black text-2xl md:text-[34px] leading-[1.4] font-normal tracking-wide transition-all duration-700 ease-out transform ${
                isTextVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}>
                <h3>
                    In this way, we assist organizations in navigating the digital age, creating <strong className="font-bold">new products and services</strong>, discovering innovative ways to interact with their customers, and refining their <strong className="font-bold">business vision</strong>.
                </h3>
            </div>
        </section>
    );
}
