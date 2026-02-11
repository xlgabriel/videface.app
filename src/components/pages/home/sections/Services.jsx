import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../Heading";
import { service1, service1mobile, service2, service3, check, gradient } from "../../../../assets";
import { brainwaveServices, brainwaveServicesIcons } from "../../../../constants";
import {
    PhotoChatMessage,
    Gradient,
    VideoChatMessage,
} from "../../../design/Services";
import Button from "../../../Button";

import Generating from "../../../Generating";

const Services = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [bubblePhase, setBubblePhase] = useState("exit");
    const [itemsInView, setItemsInView] = useState(false);
    const [itemsEnterNonce, setItemsEnterNonce] = useState(0);
    const [hasCentered, setHasCentered] = useState(false);
    const sectionRef = useRef(null);

    const clamp01 = (value) => Math.max(0, Math.min(1, value));
    const lerp = (from, to, t) => from + (to - from) * t;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        let rafId = null;

        const update = () => {
            rafId = null;
            const el = sectionRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const viewportH = window.innerHeight || 1;
            const viewportCenterY = viewportH / 2;
            const sectionCenterY = rect.top + rect.height / 2;
            const distanceToCenter = Math.abs(sectionCenterY - viewportCenterY);

            // Defines how wide the "center band" is.
            // Smaller => animation reacts sooner when leaving center.
            // Larger => items animate more slowly/smoothly.
            const band = viewportH * 0.35;
            const t = 1 - distanceToCenter / band;

            setScrollProgress(clamp01(t));
        };

        const requestUpdate = () => {
            if (rafId != null) return;
            rafId = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);

        return () => {
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
            if (rafId != null) window.cancelAnimationFrame(rafId);
        };
    }, []);

    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => {
                setBubblePhase(entry.isIntersecting ? "enter" : "exit");
            },
            {
                threshold: 0.01,
                rootMargin: "-40% 0px -40% 0px",
            }
        );

        if (sectionRef.current) io.observe(sectionRef.current);
        return () => io.disconnect();
    }, []);

    // Entry for titles/descriptions/icons: view-based (not scroll-driven).
    // We re-trigger the animation each time the section enters the viewport.
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setItemsInView(true);
                    setHasCentered(false);
                    setItemsEnterNonce((n) => n + 1);
                } else {
                    setItemsInView(false);
                    setHasCentered(false);
                }
            },
            {
                // Only consider the section "in view" when it overlaps the middle band of the viewport.
                // This guarantees we get an exit event when scrolling away, so re-entry can re-trigger.
                threshold: 0.01,
                rootMargin: "-35% 0px -35% 0px",
            }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Once the section reaches the center band (bubblePhase enter), allow scroll-synced exit.
    useEffect(() => {
        if (bubblePhase === "enter") setHasCentered(true);
    }, [bubblePhase]);

    const exitT = easeOutCubic(scrollProgress);
    const shouldApplyExit = bubblePhase === "exit" && hasCentered;

    // Prevent a 1-frame "flash" before the inline <style> animations apply.
    // During entry (in view, not exiting), we force the initial hidden state via inline style.
    const preEnterUpStyle = itemsInView && !shouldApplyExit
        ? { opacity: 0, transform: "translateY(26px)", willChange: "transform, opacity" }
        : undefined;

    const preEnterDownStyle = itemsInView && !shouldApplyExit
        ? { opacity: 0, transform: "translateY(-26px)", willChange: "transform, opacity" }
        : undefined;

    const titleUpStyle = shouldApplyExit
        ? {
            opacity: exitT,
            transform: `translateY(${lerp(30, 0, exitT)}px)`,
            willChange: "transform, opacity",
        }
        : undefined;

    const descUpStyle = shouldApplyExit
        ? {
            opacity: exitT,
            transform: `translateY(${lerp(20, 0, exitT)}px)`,
            willChange: "transform, opacity",
        }
        : undefined;

    const titleDownStyle = shouldApplyExit
        ? {
            opacity: exitT,
            transform: `translateY(${lerp(-30, 0, exitT)}px)`,
            willChange: "transform, opacity",
        }
        : undefined;

    const descDownStyle = shouldApplyExit
        ? {
            opacity: exitT,
            transform: `translateY(${lerp(-20, 0, exitT)}px)`,
            willChange: "transform, opacity",
        }
        : undefined;

    const iconsDownStyle = shouldApplyExit
        ? {
            opacity: exitT,
            transform: `translateY(${lerp(-18, 0, exitT)}px)`,
            willChange: "transform, opacity",
        }
        : undefined;

    return (
        <section id="how-to-use" ref={sectionRef}>
            <div className="container mt-28">
                <div className="relative">

                    <div className="relative z-1 grid gap-5 lg:grid-cols-2">
                        <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden shadow-blue-500 shadow-lg">
                            <div className="absolute inset-0">
                                <img
                                    src={service2}
                                    className="h-full w-full object-cover"
                                    width={630}
                                    height={750}
                                    alt="robot"
                                />
                            </div>

                            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                                <h4
                                    key={`svc-left-title-${itemsEnterNonce}`}
                                    className={`h4 text-6xl mb-4 ${itemsInView ? "svc-enter-up svc-enter-up--title" : "svc-hidden-up"}`}
                                    style={{ ...preEnterUpStyle, ...titleUpStyle }}
                                    data-svc-anim
                                >
                                    Just touch the screen.
                                </h4>
                                <p
                                    key={`svc-left-desc-${itemsEnterNonce}`}
                                    className={`body-2 mb-[3rem] text-n-3 ${itemsInView ? "svc-enter-up svc-enter-up--delay" : "svc-hidden-up"}`}
                                    style={{ ...preEnterUpStyle, ...descUpStyle }}
                                    data-svc-anim
                                >
                                    No matter the age, everyone can use our tools. It's that simple. We work to give the most comfortable experience to our users.
                                </p>
                            </div>

                            <PhotoChatMessage phase={bubblePhase} delayMs={380} />
                        </div>

                        <div className="p-4 z-1 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem] shadow-blue-500 shadow-lg">
                            <div className="py-12 px-4 xl:px-8">
                                <h4
                                    key={`svc-right-title-${itemsEnterNonce}`}
                                    className={`h4 text-6xl mb-4 ${itemsInView ? "svc-enter-down svc-enter-down--title" : "svc-hidden-down"}`}
                                    style={{ ...preEnterDownStyle, ...titleDownStyle }}
                                    data-svc-anim
                                >
                                    Just answer the call.
                                </h4>
                                <p
                                    key={`svc-right-desc-${itemsEnterNonce}`}
                                    className={`body-2 mb-[2rem] text-n-3 ${itemsInView ? "svc-enter-down svc-enter-down--delay" : "svc-hidden-down"}`}
                                    style={{ ...preEnterDownStyle, ...descDownStyle }}
                                    data-svc-anim
                                >
                                    You are one click away from assisting your clients. It's that simple.
                                </p>

                                <ul
                                    key={`svc-right-icons-${itemsEnterNonce}`}
                                    className={`flex items-center justify-between ${itemsInView ? "svc-enter-down svc-enter-down--icons" : "svc-hidden-down"}`}
                                    style={{ ...preEnterDownStyle, ...iconsDownStyle }}
                                    data-svc-anim
                                >
                                    {brainwaveServicesIcons.map((item, index) => (
                                        <li
                                            key={index}
                                            className={`rounded-2xl flex items-center justify-center ${index === 2
                                                ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                                                : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                                                }`}
                                        >
                                            <div
                                                className={
                                                    index === 2
                                                        ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                                                        : ""
                                                }
                                            >
                                                <img src={item} width={28} height={28} alt={item} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative h-[20rem] bg-color-2 rounded-xl overflow-hidden md:h-[25rem]">
                                <img
                                    src={service3}
                                    className="w-full h-full object-cover"
                                    width={520}
                                    height={400}
                                    alt="Scary robot"
                                />

                                <VideoChatMessage phase={bubblePhase} delayMs={1050} />
                            </div>
                        </div>
                    </div>

                    <Gradient />
                </div>
            </div>
            <div className="flex justify-center mt-20 ">
                <Button
                    href="#contact"
                    color="bg-[#0A6CFF]"
                    textColor="text-white"
                    size="lg"
                    className="hero-cta-btn"
                >
                    GET A DEMO
                </Button>
            </div>

            <style>{`
                .svc-bubble {
                    opacity: 0;
                    transform: translateY(28px) scale(0.72);
                    will-change: transform, opacity;
                }

                .svc-bubble--left {
                    transform-origin: bottom left;
                }

                .svc-bubble--right {
                    transform-origin: bottom right;
                }

                .svc-bubble--enter {
                    animation: svc-bubble-in 820ms cubic-bezier(0.22, 1, 0.36, 1) both;
                }

                .svc-bubble--exit {
                    animation: svc-bubble-out 260ms cubic-bezier(0.55, 0.06, 0.68, 0.19) both;
                }

                @keyframes svc-bubble-in {
                    0% {
                        opacity: 0;
                        transform: translateY(28px) scale(0.68);
                    }
                    45% {
                        opacity: 1;
                        transform: translateY(-4px) scale(1.1);
                    }
                    70% {
                        opacity: 1;
                        transform: translateY(0) scale(0.98);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes svc-bubble-out {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(18px) scale(0.62);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    [data-svc-anim],
                    .svc-bubble {
                        transition: none !important;
                        animation: none !important;
                        transform: none !important;
                    }

                    .svc-hidden-up,
                    .svc-hidden-down {
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }

                .svc-enter-up {
                    opacity: 0;
                    transform: translateY(26px);
                    animation: svc-enter-up 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
                }

                .svc-enter-up--title {
                    animation-delay: 140ms;
                }

                .svc-enter-up--delay {
                    animation-delay: 320ms;
                }

                .svc-hidden-up {
                    opacity: 0 !important;
                    transform: translateY(26px) !important;
                    animation: none !important;
                }

                .svc-enter-down {
                    opacity: 0;
                    transform: translateY(-26px);
                    animation: svc-enter-down 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
                }

                .svc-enter-down--title {
                    animation-delay: 140ms;
                }

                .svc-enter-down--delay {
                    animation-delay: 320ms;
                }

                .svc-enter-down--icons {
                    animation-delay: 520ms;
                }

                .svc-hidden-down {
                    opacity: 0 !important;
                    transform: translateY(-26px) !important;
                    animation: none !important;
                }

                @keyframes svc-enter-up {
                    0% {
                        opacity: 0;
                        transform: translateY(26px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes svc-enter-down {
                    0% {
                        opacity: 0;
                        transform: translateY(-26px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default Services;
