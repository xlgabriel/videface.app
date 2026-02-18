import { useEffect, useRef, useState } from "react";
import "../kiosk.css";

import VideFaceKeydrop from "../../../../assets/webp/VideFace-Keydrop.webp";
import VideFaceSmartLocker from "../../../../assets/webp/VideFace-Smart-Locker.webp";
import AllInOne from "../../../../assets/webp/All-in-one-edit.webp";

const SOLUTIONS = [
    {
        title: "KeyDrop",
        image: VideFaceKeydrop,
        alt: "VideFace KeyDrop kiosk",
        imgClassName: "kiosk-solution__img--keydrop",
    },
    {
        title: "Smart Locker",
        image: VideFaceSmartLocker,
        alt: "VideFace Smart Locker key management",
        imgClassName: "kiosk-solution__img--locker",
    },
    {
        title: "All in One",
        image: AllInOne,
        alt: "VideFace all-in-one kiosk",
        imgClassName: "kiosk-solution__img--allinone",
    },
];

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smoothstep = (t) => t * t * (3 - 2 * t);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function KioskSolutions() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [glowAmount, setGlowAmount] = useState(0);
    const [inView, setInView] = useState(false);

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
            rafId && window.cancelAnimationFrame(rafId);
        };
    }, []);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setInView(true);
                    else setInView(false);
                }
            },
            { threshold: 0.35 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    const bgMotion = easeOutCubic(clamp01(scrollProgress / 0.45));
    const titleProgress = easeOutCubic(clamp01((scrollProgress - 0.18) / 0.42));

    const bgStyle = {
        background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, #0A6CFF 0%, #0A6CFF 22%, #064199 58%, #031A3F 100%)",
        opacity: 0.25 + 0.75 * bgMotion,
        transform: `translateY(${(1 - bgMotion) * 80}px)`,
        transition: "transform 180ms ease-out, opacity 220ms ease-out",
        boxShadow: "10px 18px 15px rgba(0,0,0,0.6)",
    };

    const titleContainerStyle = {
        opacity: titleProgress,
        transform: `translateY(${(1 - titleProgress) * 24}px)`,
        transition: "transform 220ms ease-out, opacity 220ms ease-out",
        willChange: "transform, opacity",
    };

    return (
        <section ref={sectionRef} className="relative w-full overflow-visible py-28">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-[100vw] z-10" style={bgStyle} />

            <div className="container relative z-30">
                <div className="text-center" style={titleContainerStyle}>
                    <h2
                        ref={titleRef}
                        className="experience-title text-center text-4xl font-medium leading-tight md:text-4xl lg:text-6xl"
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
                            Combine Your <span className="font-bold">Kiosk</span> with More Virtual <br />
                            Assistance <span className="font-bold">Solutions</span>
                        </span>
                    </h2>
                </div>

                <div className="mt-14 sm:mt-20">
                    <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3">
                        {SOLUTIONS.map((item, index) => {
                            const localDelay = 140 * index;
                            const isEntered = inView;

                            const cardStyle = {
                                opacity: isEntered ? 1 : 0,
                                transform: isEntered
                                    ? "translateY(0px)"
                                    : "translateY(26px)",
                                transition:
                                    "transform 720ms cubic-bezier(.2,.9,.2,1), opacity 620ms ease",
                                transitionDelay: `${isEntered ? localDelay : 0}ms`,
                                willChange: "transform, opacity",
                            };

                            const circleStyle = {
                                opacity: isEntered ? 1 : 0,
                                transform: isEntered
                                    ? "translate(-50%, -50%) scale(1)"
                                    : "translate(-50%, -50%) scale(0.82)",
                                transition:
                                    "transform 720ms cubic-bezier(.2,.9,.2,1), opacity 620ms ease",
                                transitionDelay: `${isEntered ? 120 + localDelay : 0}ms`,
                                willChange: "transform, opacity",
                            };

                            const imgStyle = {
                                opacity: isEntered ? 1 : 0,
                                transform: isEntered ? "scale(1)" : "scale(0.92)",
                                transition:
                                    "transform 760ms cubic-bezier(.2,.9,.2,1), opacity 620ms ease",
                                transitionDelay: `${isEntered ? 200 + localDelay : 0}ms`,
                                willChange: "transform, opacity",
                            };

                            return (
                                <div
                                    key={item.title}
                                    className={`kiosk-solution flex flex-col items-center ${index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                                    style={cardStyle}
                                >
                                    <div className="kiosk-solution__visual relative w-full flex justify-center items-end">
                                        <div
                                            className="kiosk-solution__circle absolute left-1/2 top-[56%] rounded-full bg-white"
                                            style={circleStyle}
                                        />

                                        <img
                                            src={item.image}
                                            alt={item.alt}
                                            className={`kiosk-solution__img relative z-10 ${item.imgClassName}`}
                                            style={imgStyle}
                                        />
                                    </div>

                                    <h3 className="kiosk-solution__name mt-8 text-center text-3xl md:text-4xl font-semibold text-white whitespace-pre-line leading-tight">
                                        {item.title}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
