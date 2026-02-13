import React, { useEffect, useId, useMemo, useRef, useState } from "react";

const BORDER_GRADIENT = {
    from: "#1486FF",
    to: "#0C5099",
};

const faqItems = [
    {
        id: 1,
        title: 'Question 1?',
        description:
            'Videface converts text or audio prompts into short personalized videos using AI models trained on professional presentations. You provide a script, choose a style, and our engine renders a talking-head video with synchronized audio and lip movement.',
        collapsedDescription: 'Videface converts text or audio prompts into short personalized videos using AI models trained on professional presentations. You provide a script, choose a style, and our engine renders a talking-head video with synchronized audio and lip movement.',
        price: null,
        features: [],
    },
    {
        id: 2,
        title: 'Question 2?',
        description:
            'Yes. Videface allows you to upload logos, background images, and brand colors. We provide templates so your videos always look on-brand. Advanced plans include custom fonts and enterprise-branding support.',
        collapsedDescription: 'Yes. Videface allows you to upload logos, background images, and brand colors. We provide templates so your videos always look on-brand.',
        price: null,
        features: [],
    },
    {
        id: 3,
        title: 'Question 3?',
        description:
            'Output formats include MP4, GIF, and web-optimized H.264. You can select resolution presets including 720p, 1080p, and custom sizes for social previews or kiosks.',
        collapsedDescription: 'Output formats include MP4, GIF, and web-optimized H.264. You can select resolution presets including 720p, 1080p, and custom sizes for social previews or kiosks.',
        price: null,
        features: [],
    },
    {
        id: 4,
        title: 'Question 4?',
        description:
            'We store media and scripts encrypted at rest and in transit. Access controls, per-team workspaces, and enterprise SSO are available. We also offer data residency on enterprise plans.',
        collapsedDescription: 'We store media and scripts encrypted at rest and in transit. Access controls, per-team workspaces, and enterprise SSO are available.',
        price: null,
        features: [],
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

function QuestionCard({
    title,
    showMedal,
    collapsedDescription,
    button,
    features,
    expanded,
    pinned,
    onClick,
    badge,
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
                "pricing-card rounded-2xl p-[3px] cursor-pointer select-none transition-[box-shadow,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] w-[92vw] max-w-[720px] sm:w-[88vw] md:w-[20rem] lg:w-[28rem] xl:w-[20rem] 2xl:w-[20rem] relative transform-gpu " +
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
                    (expanded ? "h-[25rem] lg:h-[25rem]" : "h-[6rem] lg:h-[6rem]")
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
                                        ? "text-white text-3xl"
                                        : "text-[#1486FF] text-2xl")
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
                            {badge && expanded && (
                                <div className="absolute -top-5 left-3 bg-black text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">{badge}</div>
                            )}
                        </div>

                        <div
                            className={
                                "flex flex-col items-center justify-start " +
                                (expanded ? "min-h-[7.5rem]" : "min-h-0")
                            }
                        >
                            <h3
                                className={
                                    "whitespace-pre-line text-[1.05rem] leading-snug text-center " +
                                    (expanded ? "text-white pt-6 pb-4 block" : "hidden")
                                }
                            >
                                {expanded
                                    ? collapsedDescription
                                    : (collapsedDescription.length > 140
                                        ? `${collapsedDescription.slice(0, 140)}…`
                                        : collapsedDescription)}
                            </h3>
                        </div>

                        {!expanded && (
                            <div className="flex justify-center -mt-10 pb-0">
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
                                {expanded ? (
                                    <div>
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
                                ) : null}
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

function QuestionCards() {
    const [pinnedOpen, setPinnedOpen] = useState(() => new Set());
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
            {faqItems.map((opt, idx) => (
                <div
                    key={opt.title}
                    className={hasRevealed ? "pricing-reveal" : "pricing-reveal pricing-reveal--hidden"}
                    style={{ animationDelay: `${idx * 160}ms` }}
                    data-pricing-reveal
                >
                    <QuestionCard
                        title={opt.title}
                        showMedal={opt.showMedal}
                        collapsedDescription={opt.collapsedDescription}
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

const Questions = () => {
    return (
        <section className="overflow-visible pt-36 pb-28" id="pricing">
            <div className="container">
                <h2 className="font-medium text-4xl md:text-5xl pb-2 text-center">
                    You have questions? <br />
                    <span
                        className="block md:inline pl-0 md:pl-4 text-5xl md:text-7xl font-bold text-center"
                        style={{
                            background: 'linear-gradient(90deg, #00438B 0%, #007FFF 57%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: 'transparent',
                            display: 'inline-block',
                        }}
                    >
                        We have answers
                    </span>
                </h2>
                <div className="mt-20">
                    <QuestionCards />
                </div>
            </div>
        </section>
    );
};

export default Questions;
