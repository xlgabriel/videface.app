import React, { useEffect, useRef, useState } from "react";
import MessageCarousel from "./MessageCarousel";

const sampleItems = [

    {
        name: "Mr. Ebrima",
        role: "Cargreen rental car, Minneapolis, MN",
        text:
            "The system has been great! My customers love it. I recommend it 100%. It has made our operations smoother and more efficient. We’ve seen a real improvement in how we serve our clients every day.",
    },
    
    
];

export default function Testimonials({ items = sampleItems }) {
    const sectionRef = useRef(null);
    const [phase, setPhase] = useState("hidden");
    const count = Array.isArray(items) ? items.length : 0;
    const useCarousel = count >= 3;

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

    // Mini-carousel for 2 reviews
    const [twoIndex, setTwoIndex] = useState(0);
    const [fade, setFade] = useState(false);

    // Handles fade animation when changing review
    const handleTwoIndex = (i) => {
        if (i === twoIndex) return;
        setFade(true);
        setTimeout(() => {
            setTwoIndex(i);
            setFade(false);
        }, 220); 
    };
    const showMiniCarousel = count === 2 && !useCarousel;

    return (
        <section ref={sectionRef} className="py-24" id="testimonials">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
                    {/* Title */}
                    <div className={titleClass}>
                        <h2 className="text-[2.3rem] leading-tight md:text-6xl font-medium text-gray-900">
                            What our&nbsp;
                            <div className="mt-2">
                                <span className="text-[2.3rem] leading-tight md:text-6xl font-bold" style={{
                                    background: 'linear-gradient(90deg, #00438B 0%, #007FFF 57%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    color: 'transparent',
                                    display: 'inline-block',
                                }}>
                                    #VideFaceLovers&nbsp;
                                </span>
                                <span className="text-[2.3rem] leading-tight md:text-6xl font-medium text-gray-900">say</span>
                            </div>
                        </h2>
                    </div>

                    {/* Carousel o mini-carrusel */}
                    <div
                        className={carouselClass}
                        style={phase === "shown" ? { transitionDelay: "180ms" } : undefined}
                    >
                        {useCarousel ? (
                            <MessageCarousel items={items} />
                        ) : showMiniCarousel ? (
                            <div className="w-full max-w-[560px] mx-auto py-10 flex flex-col items-center">
                                <div className="w-full relative flex items-center justify-center">
                                    <button
                                        onClick={() => handleTwoIndex((twoIndex + 1) % 2)}
                                        className="absolute left-[-32px] md:left-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-2xl font-bold z-10"
                                        aria-label="Anterior"
                                    >
                                        &#8249;
                                    </button>
                                    <div
                                        className={`bg-white rounded-md border border-gray-100 relative overflow-hidden px-10 py-7 pr-28 transition-opacity duration-200 ${fade ? 'opacity-0' : 'opacity-100'}`}
                                        style={{ boxShadow: "8px 12px 0 0 rgba(59,130,246,0.40)" }}
                                    >
                                        <div className="absolute top-4 right-4">
                                            <span className="iconBase icon-user w-12 h-12 text-[#007FFF] block" />
                                        </div>
                                        <p className="text-[#1486FF] font-bold text-2xl">{items[twoIndex].name}</p>
                                        <p className="text-base font-semibold text-gray-800">{items[twoIndex].role}</p>
                                        <p className="mt-6 text-lg text-gray-700 leading-relaxed">{items[twoIndex].text}</p>
                                    </div>
                                    <button
                                        onClick={() => handleTwoIndex((twoIndex + 1) % 2)}
                                        className="absolute right-[-32px] md:right-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-2xl font-bold z-10"
                                        aria-label="Siguiente"
                                    >
                                        &#8250;
                                    </button>
                                </div>
                                <div className="flex items-center justify-center gap-3 mt-6">
                                    {[0, 1].map((i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleTwoIndex(i)}
                                            className={`h-2 rounded-full transition-all ${i === twoIndex ? "bg-[#1486FF] w-16" : "bg-[#93C5FD] w-10"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full max-w-[980px] mx-auto py-10">
                                <div className="flex justify-center">
                                    {items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="w-[92vw] max-w-[560px] md:w-full"
                                        >
                                            <div
                                                className="bg-white rounded-md border border-gray-100 relative overflow-hidden px-10 py-7 pr-28"
                                                style={{ boxShadow: "8px 12px 0 0 rgba(59,130,246,0.40)" }}
                                            >
                                                <div className="absolute top-4 right-4">
                                                    <span className="iconBase icon-user w-12 h-12 text-[#007FFF] block" />
                                                </div>
                                                <p className="text-[#1486FF] font-bold text-2xl">{item.name}</p>
                                                <p className="text-base font-semibold text-gray-800">{item.role}</p>
                                                <p className="mt-6 text-lg text-gray-700 leading-relaxed">{item.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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
