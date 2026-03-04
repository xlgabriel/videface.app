import React, { useEffect, useRef, useState } from "react";
import MessageCarousel from "../homeComponents/MessageCarousel";

const sampleItems = [
    {
        name: "Ebrima Jallow",
        role: "Cargreen Rentals, Minneapolis, MN",
        text: "The system has been great! My customers love it. I recommend it 100%. It has made our operations smoother and more efficient. We’ve seen a real improvement in how we serve our clients every day.",
    },
    {
        name: "Eddie",
        role: "Carwiz, Orlando, FL",
        text: `At first, I was skeptical about using a screen-based system for renter check-ins. However, now that we’re going into our third week of using the VideFace remote check-in system, I can confidently say it has exceeded my expectations.
The system has proven to be extremely reliable, and we’ve noticed a clear increase in customer traffic. Renters find it both interesting and reassuring to be able to speak with a real person remotely — amazing feedback from customers. It also presents our brand in a highly professional way. Having the check-in process available at the touch of a screen is far more convenient than waiting for staff to align with scheduled hours.
We did experience a few minor technical glitches in the beginning, which is completely normal when implementing a new system. However, VideFace’s technical support team was there exactly when we needed them and resolved every issue remotely within minutes.
I would definitely recommend this system and plan to add another screen as our fleet continues to grow. Thank you for helping in this new and exciting phase for Carwiz in Orlando.`,
    },
];

export default function Testimonials({ items = sampleItems }) {
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            },
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
    const PREVIEW_CHAR_LIMIT = 200;

    const getPreview = (text) => {
        const safeText = typeof text === "string" ? text : "";
        const isTruncated = safeText.length > PREVIEW_CHAR_LIMIT;
        const previewText = isTruncated ? `${safeText.slice(0, PREVIEW_CHAR_LIMIT).trimEnd()}...` : safeText;
        return { previewText, isTruncated };
    };

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
    const currentMiniItem = showMiniCarousel ? items[twoIndex] : null;
    const miniPreview = currentMiniItem ? getPreview(currentMiniItem.text) : null;

    useEffect(() => {
        if (!showMiniCarousel) return;
        const id = setInterval(() => {
            // trigger fade then advance index
            setFade(true);
            setTwoIndex((prev) => {
                const next = (prev + 1) % 2;
                setTimeout(() => setFade(false), 220);
                return next;
            });
        }, 15000);
        return () => clearInterval(id);
    }, [showMiniCarousel]);

    useEffect(() => {
        if (selectedTestimonial) {
            // open modal with animation
            // small timeout to ensure classes apply on mount
            requestAnimationFrame(() => setIsModalOpen(true));
        }
    }, [selectedTestimonial]);

    const closeModal = () => {
        setIsModalOpen(false);
        // wait for animation to finish then unmount
        window.setTimeout(() => setSelectedTestimonial(null), 300);
    };

    return (
        <section ref={sectionRef} className="py-24" id="testimonials">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
                    {/* Title */}
                    <div className={titleClass}>
                        <h2 className="text-[2.3rem] leading-tight md:text-6xl font-medium text-gray-900">
                            What our&nbsp;
                            <div className="mt-2">
                                <span
                                    className="text-[2.3rem] leading-tight md:text-6xl font-bold"
                                    style={{
                                        background: "linear-gradient(90deg, #00438B 0%, #007FFF 57%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        color: "transparent",
                                        display: "inline-block",
                                    }}
                                >
                                    #VideFaceLovers&nbsp;
                                </span>
                                <span className="text-[2.3rem] leading-tight md:text-6xl font-medium text-gray-900">
                                    say
                                </span>
                            </div>
                        </h2>
                    </div>

                    {/* Carousel o mini-carrusel */}
                    <div className={carouselClass} style={phase === "shown" ? { transitionDelay: "180ms" } : undefined}>
                        {useCarousel ? (
                            <MessageCarousel items={items} onItemClick={(it) => setSelectedTestimonial(it)} />
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
                                        className={`bg-white rounded-md border border-gray-100 relative overflow-hidden px-10 py-7 transition-opacity duration-200 ${fade ? "opacity-0" : "opacity-100"} min-h-[280px] md:min-h-[300px]`}
                                        style={{ boxShadow: "8px 12px 0 0 rgba(59,130,246,0.40)" }}
                                        onClick={() => setSelectedTestimonial(items[twoIndex])}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <div className="absolute top-4 right-4">
                                            <span className="iconBase icon-user w-12 h-12 text-[#007FFF] block" />
                                        </div>
                                        <p className="text-[#1486FF] font-bold text-2xl pr-16">
                                            {items[twoIndex].name}
                                        </p>
                                        <p className="text-base font-semibold text-gray-800 pr-16">
                                            {items[twoIndex].role}
                                        </p>
                                        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                                            {miniPreview?.previewText}
                                        </p>
                                        {miniPreview?.isTruncated && (
                                            <div className="mt-4">
                                                <span className="text-sm font-semibold text-[#007FFF]">See full</span>
                                            </div>
                                        )}
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
                                    {items.map((item, i) => {
                                        const preview = getPreview(item.text);
                                        return (
                                            <div key={i} className="w-[92vw] max-w-[560px] md:w-full">
                                                <div
                                                    className="bg-white rounded-md border border-gray-100 relative overflow-hidden px-10 py-7 min-h-[280px] md:min-h-[300px]"
                                                    style={{ boxShadow: "8px 12px 0 0 rgba(59,130,246,0.40)" }}
                                                    onClick={() => setSelectedTestimonial(item)}
                                                    role="button"
                                                    tabIndex={0}
                                                >
                                                    <div className="absolute top-4 right-4">
                                                        <span className="iconBase icon-user w-12 h-12 text-[#007FFF] block" />
                                                    </div>
                                                    <p className="text-[#1486FF] font-bold text-2xl pr-16">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-base font-semibold text-gray-800 pr-16">
                                                        {item.role}
                                                    </p>
                                                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                                                        {preview.previewText}
                                                    </p>
                                                    {preview.isTruncated && (
                                                        <div className="mt-4">
                                                            <span className="text-sm font-semibold text-[#007FFF]">
                                                                See full
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Testimonial modal */}
                {selectedTestimonial && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div
                            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                            onClick={() => closeModal()}
                        />
                        <div
                            key={`${selectedTestimonial.name}-${selectedTestimonial.role}`}
                            className={`relative bg-white max-w-3xl w-[92vw] mx-auto p-5 md:p-8 rounded-lg z-60 max-h-[62vh] md:max-h-[82vh] overflow-hidden testimonial-modal ${isModalOpen ? "open" : "closed"}`}
                            role="dialog"
                            aria-modal="true"
                        >
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-xl"
                                onClick={() => closeModal()}
                                aria-label="Cerrar"
                            >
                                ✕
                            </button>
                            <div className="mb-4">
                                <p className="text-[#1486FF] font-bold text-2xl">{selectedTestimonial.name}</p>
                                <p className="text-base font-semibold text-gray-800">{selectedTestimonial.role}</p>
                            </div>
                            <div className="text-gray-700 leading-relaxed text-lg max-h-[calc(62vh-6.5rem)] md:max-h-[calc(82vh-7.5rem)] overflow-y-auto pr-1">
                                {selectedTestimonial.fullText || selectedTestimonial.text}
                            </div>
                        </div>
                    </div>
                )}
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
                    .testimonial-modal,
                    .testimonial-modal.open,
                    .testimonial-modal.closed {
                        transition: none !important;
                        transform: none !important;
                        opacity: 1 !important;
                    }
                }

                /* Modal enter/exit: bubble effect centered */
                .testimonial-modal {
                    transform-origin: center center;
                    transform: scale(.86) translateY(0);
                    opacity: 0;
                    transition: transform 300ms cubic-bezier(.2,.8,.2,1), opacity 240ms ease;
                    will-change: transform, opacity;
                }

                .testimonial-modal.open {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }

                .testimonial-modal.closed {
                    transform: scale(.94) translateY(-6px);
                    opacity: 0;
                }
            `}</style>
        </section>
    );
}
