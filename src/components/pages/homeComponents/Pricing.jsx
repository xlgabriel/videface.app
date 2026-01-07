import React, { useId, useMemo, useState } from "react";

const BORDER_GRADIENT = {
    from: "#1486FF",
    to: "#0C5099",
};

const pricingOptions = [
    {
        title: "VideFace Calls",
        collapsedDescription:
            "Real time videocalls,\nunlimited connections\nbetween agents and clients\nand easy management of\nyour kiosks.",
        button: "CONTACT US",
        features: [
            "Live Translation,\nSubtitles and\nRecording included",
            "Document, signature and\nrating features included",
            "Assistance to set up\nyour kiosks and\nagents",
        ],
    },
    {
        title: "SmartLocker +\nKeyDrop",
        collapsedDescription:
            "Give and receive the keys\nsmoothly without the need\nof agents in the office.",
        button: "CONTACT US",
        features: [
            "Record of all key\nmovements",
            "Real-time key delivery for\nclients",
            "Easy key drop off by\ncarwasher",
        ],
    },
    {
        title: "VideFace Cars",
        collapsedDescription:
            "Manage every car easily.\nAvoid losing chargebacks\nwith the car inspection\nand walk around.",
        button: "CONTACT US",
        features: [
            "Full control of your cars,\ndamages, photos and\nmore",
            "Car Inspection, Pickup\nand Return in real time",
            "No more staff needed, no\nmore misunderstandings",
        ],
    },
    {
        title: "Full VideFace",
        showMedal: true,
        collapsedDescription:
            "Fully virtualize your office\nby using all our services.\nUnlock the full\npotential of VideFace",
        button: "CONTACT US",
        features: [
            "Get first the new features\nwe constantly add to our\nsoftware",
            "It's easier to manage\neverything in one place.\nDefinitely worth it!",
            "Priority support and\nassistance for any needs.",
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
                "pricing-card rounded-2xl p-[3px] cursor-pointer select-none transition-[box-shadow,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] w-[18rem] md:w-[18rem] relative transform-gpu " +
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
                    (expanded ? "h-[38rem]" : "h-[17rem]")
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
                        </div>

                        <div className="min-h-[7.5rem] flex flex-col items-center justify-start">
                            <p
                                className={
                                    "whitespace-pre-line text-[0.95rem] leading-snug text-center " +
                                    (expanded ? "text-white pt-2 pb-4" : "text-[#1486FF]")
                                }
                            >
                                {collapsedDescription}
                            </p>
                            {!expanded && (
                                <div className="flex justify-center pt-3">
                                    <GradientArrow direction="down" />
                                </div>
                            )}
                        </div>

                        <div
                            className={
                                "grid transition-[grid-template-rows,opacity,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[grid-template-rows,opacity,transform] " +
                                (expanded
                                    ? "grid-rows-[1fr] opacity-100 translate-y-0"
                                    : "grid-rows-[0fr] opacity-0 -translate-y-2")
                            }
                        >
                            <div className="min-h-0 overflow-hidden">
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        className="bg-white text-[#1486FF] font-bold text-xs tracking-wide px-6 py-2 rounded-lg shadow-lg"
                                    >
                                        {button}
                                    </button>
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
                                            <span className="text-white text-[0.95rem] leading-snug whitespace-pre-line">
                                                {text}
                                            </span>
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
    const [pinnedOpen, setPinnedOpen] = useState(() => new Set([0]));

    const isExpanded = (idx) => pinnedOpen.has(idx);

    const togglePinned = (idx) => {
        setPinnedOpen((prev) => {
            const next = new Set(prev);
            if (next.has(idx)) next.delete(idx);
            else next.add(idx);
            return next;
        });
    };

    return (
        <div className="flex gap-6 justify-center items-start flex-nowrap overflow-x-auto overflow-y-visible w-full pb-6 lg:overflow-x-visible lg:justify-between">
            {pricingOptions.map((opt, idx) => (
                <PricingCard
                    key={opt.title}
                    title={opt.title}
                    showMedal={opt.showMedal}
                    collapsedDescription={opt.collapsedDescription}
                    button={opt.button}
                    features={opt.features}
                    expanded={isExpanded(idx)}
                    pinned={pinnedOpen.has(idx)}
                    onClick={() => togglePinned(idx)}
                />
            ))}
        </div>
    );
}

const Pricing = () => {
    return (
        <section className="overflow-visible pt-36" id="pricing">
            <div className="container">
                <h2 className="font-medium text-3xl md:text-6xl pb-2 text-center">
                    Pricing Deisgned to
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
