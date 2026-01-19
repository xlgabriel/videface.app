import React, { useEffect, useId, useMemo, useRef, useState } from "react";

const BORDER_GRADIENT = {
    from: "#1486FF",
    to: "#0C5099",
};

const pricingOptions = [
    {
        title: "VideFace Calls",
        collapsedDescription:
            "Real time videocalls, unlimited connections between agents and clients and easy management of your kiosks.",
        button: "CONTACT US",
        features: [
            "Live Translation, Subtitles and Recording included",
            "Document, signature and rating features included",
            "Assistance to set up your kiosks and agents",
        ],
    },
    {
        title: "SmartLocker + KeyDrop",
        collapsedDescription:
            "Give and receive the keys smoothly without the need of agents in the office.",
        button: "CONTACT US",
        features: [
            "Record of all key movements",
            "Real-time key delivery for clients",
            "Easy key drop off by carwasher",
        ],
    },
    {
        title: "VideFace Cars",
        collapsedDescription:
            "Manage every car easily. Avoid losing chargebacks with the car inspection and walk around.",
        button: "CONTACT US",
        features: [
            "Full control of your cars, damages, photos and more",
            "Car Inspection, Pickup and Return in real time",
            "No more staff needed, no more misunderstandings",
        ],
    },
    {
        title: "Full VideFace",
        showMedal: true,
        collapsedDescription:
            "Fully virtualize your office by using all our services. Unlock the full potential of VideFace",
        button: "CONTACT US",
        features: [
            "Get first the new features we constantly add to our software",
            "It's easier to manage everything in one place. Definitely worth it!",
            "Priority support and assistance for any needs.",
        ],
    },
];

function GradientArrow({ direction = "down" }) {
    const id = useId();

    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className={direction === "up" ? "rotate-180" : ""}
            aria-hidden="true"
        >
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={BORDER_GRADIENT.to} />
                    <stop offset="100%" stopColor={BORDER_GRADIENT.from} />
                </linearGradient>
            </defs>
            <path
                d="M6 9l6 6 6-6"
                stroke={`url(#${id})`}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function PricingCard({
    title,
    showMedal,
    collapsedDescription,
    button,
    features,
    expanded,
    pinned,
    onClick,
}) {
    const borderStyle = useMemo(
        () => ({
            background: `linear-gradient(180deg, ${BORDER_GRADIENT.from} 0%, ${BORDER_GRADIENT.to} 100%)`,
        }),
        []
    );

    const innerStyle = expanded
        ? {
            background: `linear-gradient(180deg, ${BORDER_GRADIENT.from} 0%, ${BORDER_GRADIENT.to} 100%)`,
        }
        : { background: "#FFFFFF" };

    return (
        <div
            className={
                "pricing-card rounded-2xl p-[3px] cursor-pointer select-none transition-[box-shadow,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] w-full md:w-[20rem] lg:w-[28rem] xl:w-[20rem] 2xl:w-[20rem] relative transform-gpu " +
                (expanded
                    ? "shadow-blue-500 shadow-lg pricing-active"
                    : "shadow-[0_10px_25px_rgba(0,0,0,0.18)] pricing-neon hover:scale-105 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]")
            }
            style={borderStyle}
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <div
                className={
                    "rounded-[1rem] overflow-hidden transition-[height] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] p-2 " +
                    (expanded ? "h-[36rem] lg:h-[38rem]" : "h-[18rem] lg:h-[17rem]")
                }
                style={innerStyle}
            >
                <div
                    className={
                        "h-full rounded-[0.9rem] transition-[border-color,box-shadow] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] px-5 pt-6 pb-5 border-2 " +
                        (expanded
                            ? "border-white shadow-[0_0_0_1px_rgba(255,255,255,0.45)]"
                            : "border-transparent")
                    }
                >
                    <div className="h-full flex flex-col ">
                        <div className="text-center min-h-[4.75rem] flex flex-col items-center justify-start">
                            <h3
                                className={
                                    "font-bold leading-tight whitespace-pre-line " +
                                    (expanded
                                        ? "text-white text-4xl"
                                        : "text-[#1486FF] text-3xl")
                                }
                            >
                                {title}
                            </h3>
                            {showMedal && (
                                <div className="mt-2 flex justify-center">
                                    <span
                                        className={
                                            "iconBase icon-meda " +
                                            (expanded ? "text-white" : "text-[#1486FF]")
                                        }
                                        aria-hidden="true"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="min-h-[7.5rem] flex flex-col items-center mt-3 justify-start">
                            <h3
                                className={
                                    "whitespace-pre-line text-[1.05rem] leading-snug text-center " +
                                    (expanded ? "text-white pt-2 pb-4" : "text-[#1486FF]")
                                }
                            >
                                {collapsedDescription}
                            </h3>
                        </div>

                        {!expanded && (
                            <div className="flex justify-center mt-auto pb-3">
                                <GradientArrow direction="down" />
                            </div>
                        )}

                        <div
                            className={
                                "grid transition-[grid-template-rows,opacity,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[grid-template-rows,opacity,transform] " +
                                (expanded
                                    ? "grid-rows-[1fr] opacity-100 translate-y-0"
                                    : "grid-rows-[0fr] opacity-0 -translate-y-2")
                            }
                        >
                            <div className="min-h-0 overflow-hidden">
                                <div className="flex justify-center sm:mt-3">
                                    <a
                                        href="#contact"
                                        className="bg-white text-[#1486FF] font-bold text-xs tracking-wide px-6 py-3 rounded-lg shadow-lg inline-block hero-cta-btn"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {button}
                                    </a>
                                </div>

                                <ul className="mt-4">
                                    {features.map((text, idx) => (
                                        <li
                                            key={`${title}-${idx}`}
                                            className="flex gap-3 py-4 border-t-2 border-white/70"
                                        >
                                            <span
                                                className="iconBase icon-verified text-white shrink-0"
                                                aria-hidden="true"
                                            />
                                            <h3 className="text-white text-[1.05rem] leading-snug whitespace-pre-line">
                                                {text}
                                            </h3>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>


                    </div>

                    {expanded && (
                        <div className="sr-only">
                            {pinned ? "Pinned open" : "Expanded"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function PricingCards() {
    const [pinnedOpen, setPinnedOpen] = useState(() => new Set([]));
    const [hasRevealed, setHasRevealed] = useState(false);
    const listRef = useRef(null);

    const isExpanded = (idx) => pinnedOpen.has(idx);

    const togglePinned = (idx) => {
        setPinnedOpen((prev) => {
            const next = new Set(prev);
            if (next.has(idx)) next.delete(idx);
            else next.add(idx);
            return next;
        });
    };

    useEffect(() => {
        const el = listRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasRevealed(true);
                    io.disconnect();
                }
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -15% 0px",
            }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={listRef}
            className="flex flex-col gap-6 items-center w-full pb-6 md:grid md:grid-cols-2 md:gap-8 md:items-start md:justify-items-center lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start lg:justify-items-center xl:flex xl:flex-row xl:flex-nowrap xl:justify-center xl:gap-6 xl:overflow-x-visible xl:overflow-y-visible"
        >
            {pricingOptions.map((opt, idx) => (
                <div
                    key={opt.title}
                    className={hasRevealed ? "pricing-reveal" : "pricing-reveal pricing-reveal--hidden"}
                    style={{ animationDelay: `${idx * 160}ms` }}
                    data-pricing-reveal
                >
                    <PricingCard
                        title={opt.title}
                        showMedal={opt.showMedal}
                        collapsedDescription={opt.collapsedDescription}
                        button={opt.button}
                        features={opt.features}
                        expanded={isExpanded(idx)}
                        pinned={pinnedOpen.has(idx)}
                        onClick={() => togglePinned(idx)}
                    />
                </div>
            ))}

            <style>{`
                [data-pricing-reveal] {
                    will-change: transform, opacity;
                }

                .pricing-reveal {
                    opacity: 0;
                    transform: translateX(-18px) translateY(14px);
                    animation: pricing-reveal-in 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
                }

                .pricing-reveal--hidden {
                    animation: none !important;
                    opacity: 0 !important;
                    transform: translateX(-18px) translateY(14px) !important;
                }

                @keyframes pricing-reveal-in {
                    0% {
                        opacity: 0;
                        transform: translateX(-18px) translateY(14px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0) translateY(0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .pricing-reveal,
                    .pricing-reveal--hidden {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </div>
    );
}

const Pricing = () => {
    return (
        <section className="overflow-visible pt-36" id="pricing">
            <div className="container">
                <h2 className="font-medium text-4xl md:text-6xl pb-2 text-center">
                    Pricing Designed to&nbsp;
                    <span
                        className="block md:inline pl-0 md:pl-4 font-bold text-center"
                        style={{
                            background: 'linear-gradient(90deg, #00438B 0%, #007FFF 57%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: 'transparent',
                            display: 'inline-block',
                        }}
                    >
                        Grow With You
                    </span>
                </h2>
                <div className="mt-20">
                    <PricingCards />
                </div>
            </div>
        </section>
    );
};

export default Pricing;
