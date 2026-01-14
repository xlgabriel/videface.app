import React, { useEffect, useRef, useState } from "react";
import MessageCarousel from "./MessageCarousel";

const sampleItems = [
    {
        name: "Carlos Urrutia",
        role: "Gerente General",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim non arcu non lobortis. Proin tristique eros in mollis viverra. Aenean mollis ligula nisi. Donec vulputate.",
    },
    {
        name: "María González",
        role: "Operaciones",
        text:
            "VideFace nos permitió automatizar la recepción y entrega de llaves, reduciendo tiempos y mejorando la experiencia del cliente.",
    },
    {
        name: "Jorge Pérez",
        role: "Atención al Cliente",
        text:
            "Las videollamadas con traducción en vivo hicieron posible atender turistas sin barreras de idioma. Súper recomendable.",
    },
];

export default function Testimonials({ items = sampleItems }) {
    const sectionRef = useRef(null);
    const [phase, setPhase] = useState("hidden");

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                // Only consider "active" when overlapping the middle band.
                // Enter: transition in from sides. Exit: fade out, then reset to hidden.
                if (entry.isIntersecting) {
                    setPhase("shown");
                } else {
                    setPhase((p) => (p === "hidden" ? "hidden" : "exit"));
                }
            },
            {
                threshold: 0.01,
                rootMargin: "-35% 0px -35% 0px",
            }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (phase === "exit") {
            const id = window.setTimeout(() => setPhase("hidden"), 520);
            return () => window.clearTimeout(id);
        }
    }, [phase]);

    const titleClass =
        phase === "hidden"
            ? "z-2 max-w-[560px] tst-hidden-left"
            : phase === "shown"
                ? "z-2 max-w-[560px] tst-shown"
                : "z-2 max-w-[560px] tst-exit";

    const carouselClass =
        phase === "hidden"
            ? "flex justify-center lg:justify-end tst-hidden-right"
            : phase === "shown"
                ? "flex justify-center lg:justify-end tst-shown"
                : "flex justify-center lg:justify-end tst-exit";

    return (
        <section ref={sectionRef} className="py-24" id="testimonials">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
                    {/* Title */}
                    <div className={titleClass}>
                        <h3 className="text-[3rem] leading-tight md:text-6xl font-medium text-gray-900">
                            What our
                        </h3>
                        <div className="mt-2">
                            <span className="text-[3rem] leading-tight md:text-6xl font-bold" style={{
                                background: 'linear-gradient(90deg, #00438B 0%, #007FFF 57%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent',
                                display: 'inline-block',
                            }}>
                                #VideFaceLovers
                            </span>
                            <h3 className="text-[3rem] leading-tight md:text-6xl font-medium text-gray-900">say</h3>
                        </div>
                    </div>

                    {/* Carousel */}
                    <div
                        className={carouselClass}
                        style={phase === "shown" ? { transitionDelay: "180ms" } : undefined}
                    >
                        <MessageCarousel items={items} />
                    </div>

                </div>
            </div>

            <style>{`
                .tst-hidden-left,
                .tst-hidden-right {
                    opacity: 0;
                    will-change: transform, opacity;
                }

                .tst-hidden-left {
                    transform: translate3d(-56px, 0, 0);
                }

                .tst-hidden-right {
                    transform: translate3d(56px, 0, 0);
                }

                .tst-shown {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                    transition: opacity 820ms cubic-bezier(0.22, 1, 0.36, 1),
                        transform 820ms cubic-bezier(0.22, 1, 0.36, 1);
                }

                /* Exit is fade-only (no translation) */
                .tst-exit {
                    opacity: 0;
                    transform: translate3d(0, 0, 0);
                    transition: opacity 520ms cubic-bezier(0.22, 1, 0.36, 1);
                    will-change: opacity;
                }

                @media (prefers-reduced-motion: reduce) {
                    .tst-hidden-left,
                    .tst-hidden-right,
                    .tst-exit,
                    .tst-shown {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                        transition: none !important;
                    }
                }
            `}</style>
        </section>
    );
}
