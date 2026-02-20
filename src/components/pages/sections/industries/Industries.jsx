import { useEffect, useRef, useState } from "react";
import Hotels from "../../../../assets/webp/Hotels.webp";
import Logistic from "../../../../assets/webp/Logistic.webp";
import AirBnb from "../../../../assets/webp/Air-Bnb.webp";
import CarRental from "../../../../assets/webp/Car-rental.webp";
import "../sections.css";

const DEFAULT_ITEMS = [
    {
        title: "Hotels",
        description: (
            <>
                <strong>Intelligent self-service</strong> with chatbots
            </>
        ),
        image: Hotels,
    },
    {
        title: "Facilities\nand logistic",
        description: (
            <>
                <strong>Automated assistance</strong> and efficient query management
            </>
        ),
        image: Logistic,
    },
    {
        title: "Air - bnb",
        description: (
            <>
                <strong>Proactive support</strong> with predictive analytics
            </>
        ),
        image: AirBnb,
    },
    {
        title: "Car Rental",
        description: (
            <>
                <strong>Security</strong> and speed support with Freshchat
            </>
        ),
        image: CarRental,
    },
];

const Industries = ({
    items = DEFAULT_ITEMS,
    headingTop = "A Smart Locker Solution that adapts to",
    headingHighlight = "Any Industry",
    className = "",
}) => {
    const sectionRef = useRef(null);
    const [inView, setInView] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const leavingTimeoutRef = useRef(null);
    const prevInRef = useRef(false);

    /* ── Intersection Observer (same pattern as metrics in Services) ── */
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        // entering: cancel any pending leave
                        if (leavingTimeoutRef.current) {
                            clearTimeout(leavingTimeoutRef.current);
                            leavingTimeoutRef.current = null;
                        }
                        prevInRef.current = true;
                        setLeaving(false);
                        setInView(true);
                    } else {
                        // exiting: if we were previously in view, play leave animation
                        if (prevInRef.current) {
                            setInView(false);
                            setLeaving(true);
                            // duration matches metrics-bubble-in (860ms)
                            leavingTimeoutRef.current = setTimeout(() => {
                                setLeaving(false);
                                prevInRef.current = false;
                                leavingTimeoutRef.current = null;
                            }, 860);
                        }
                    }
                }
            },
            { threshold: 0.35 }
        );

        io.observe(el);
        return () => {
            io.disconnect();
            if (leavingTimeoutRef.current) {
                clearTimeout(leavingTimeoutRef.current);
                leavingTimeoutRef.current = null;
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className={`relative w-full py-0 ${className}`}> 
            <div className="container relative">
                {/* ── Heading — same style as "Unlock Real Impact / Self-Service Kiosk" ── */}
                <div className="text-center mb-8">
                    <h2 className="text-black text-4xl md:text-5xl font-medium leading-tight">
                        {headingTop} <br />
                        <span
                            className="font-bold text-5xl md:text-7xl pb-4"
                            style={{
                                background: "linear-gradient(90deg, #00438B 0%, #007FFF 57%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                color: "transparent",
                                display: "inline-block",
                            }}
                        >
                            {headingHighlight}
                        </span>
                    </h2>
                </div>

                {/* ── Grid — 4 columns (2 on mobile, same responsive as metrics) ── */}
                <div className="grid w-full max-w-[1280px] mx-auto grid-cols-2 justify-items-center gap-y-0 gap-x-10 sm:gap-x-14 md:grid-cols-4 md:gap-x-16 lg:gap-x-20">
                    {items.map((it, i) => (
                        <div key={i} className="flex flex-col items-center">
                            {/* Title above circle */}
                            <div className="h-[64px] sm:h-[72px] md:h-[84px] flex items-end justify-center mb-4">
                                <h3 className="text-lg sm:text-3xl md:text-4xl font-bold leading-tight whitespace-pre-line text-center text-[#0644A0]">
                                    {it.title}
                                </h3>
                            </div>

                            {/* Circle with white ring — same metrics-bubble as Services */}
                            <div
                                className={`metrics-bubble ${inView ? "metrics-bubble--enter" : leaving ? "metrics-bubble--leave" : ""} relative w-[160px] h-[160px] sm:w-[210px] sm:h-[210px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] transform-gpu`}
                                style={{ animationDelay: `${i * 140}ms` }}
                            >
                                <div
                                    className="metrics-bubble__inner absolute inset-0 rounded-full shadow-[10px_14px_28px_-10px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35)]"
                                    style={{
                                        background:
                                            "linear-gradient(45deg, #0A6CFF 0%, #064199 58%, #031A3F 100%)",
                                    }}
                                >
                                    <div className="absolute inset-[14px] rounded-full overflow-hidden">
                                        <img
                                            src={it.image}
                                            alt={typeof it.title === "string" ? it.title : "Industry"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Description below circle */}
                            <h3 className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-black leading-snug text-center max-w-[220px]">
                                {it.description}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Industries;
