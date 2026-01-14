import { useMemo, useState, useEffect, useRef } from "react";

import HotelImage from "../../../assets/hero/Hotel.jpg";
import HealthImage from "../../../assets/hero/Health.jpg";
import RentCarImage from "../../../assets/hero/RentCar.jpg";
import RestaurantImage from "../../../assets/hero/Restaurant.jpg";

const DEFAULT_ACTIVE_INDEX = 2;

export default function IndustryCarousel() {
    const items = useMemo(
        () => [
            { title: "HOTEL LOBBIES", image: HotelImage },
            { title: "HOSPITALS", image: HealthImage },
            { title: "CAR RENTALS", image: RentCarImage },
            { title: "RESTAURANTS", image: RestaurantImage },
        ],
        []
    );

    const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    const effectiveIndex = hoverIndex ?? activeIndex;

    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !inView) {
                    setInView(true);
                }
            },
            // Trigger when the carousel is nearer the viewport center
            // (shrinks the observer's root box from top & bottom).
            { threshold: 0.01, rootMargin: "-35% 0px -35% 0px" }
        );
        if (sectionRef.current) io.observe(sectionRef.current);
        return () => io.disconnect();
    }, [inView]);

    // Auto-cycle active image every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % items.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [items.length]);

    return (
        <div className="w-screen">
            <div className="relative mx-auto w-full" ref={sectionRef}>

                <div className={`ic-wrap flex h-[320px] w-full overflow-hidden md:h-[420px] ${inView ? "ic-wrap--show" : ""}`}>
                    {items.map((item, index) => {
                        const isActive = index === effectiveIndex;

                        return (
                            <div
                                key={item.title}
                                className={`ic-item relative h-full overflow-hidden transition-[flex] duration-500 ease-out ${
                                    isActive ? "flex-[2.8]" : "flex-[1]"
                                } ${inView ? "ic-item--reveal" : ""}`}
                                style={{ "--ic-delay": `${index * 120}ms` }}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                            >
                                <button
                                    type="button"
                                    className="group relative h-full w-full text-left"
                                    onFocus={() => setHoverIndex(index)}
                                    onBlur={() => setHoverIndex(null)}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />

                                    <div
                                        className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "active-overlay" : "bg-black/55"
                                            }`}
                                    />

                                    <div className="absolute bottom-5 left-5 z-10 flex items-end gap-3">
                                        <div className="h-6 w-[3px] bg-white" />
                                        <h3 className="text-base font-bold uppercase tracking-wide text-white md:text-lg">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <div
                                        className={`absolute inset-0 z-0 transition-all duration-500 ${isActive ? "" : ""
                                            }`}
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>

                <style>{`
                    .ic-wrap {
                        opacity: 0;
                        transition: opacity 260ms cubic-bezier(0.22, 1, 0.36, 1);
                    }
                    .ic-wrap.ic-wrap--show {
                        opacity: 1;
                    }

                    .ic-item--reveal::after {
                        content: "";
                        position: absolute;
                        inset: 0;
                        pointer-events: none;
                        z-index: 30;
                        /* Solid blue curtain matching the site palette */
                        background: #0A6CFF;
                        opacity: 0;
                        transform: translateX(8%);
                        animation: ic-curtain 900ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--ic-delay) + 120ms) forwards;
                    }

                    .ic-item img {
                        opacity: 0;
                    }
                    .ic-item--reveal img {
                        transform: scale(1.06);
                        filter: blur(10px) brightness(0.9);
                        animation: ic-img 900ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--ic-delay) + 120ms) forwards;
                        will-change: transform, filter;
                    }

                    @keyframes ic-curtain {
                        0% {
                            opacity: 0;
                            transform: translateX(8%);
                        }
                        12% {
                            opacity: 1;
                            transform: translateX(0);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(-112%);
                        }
                    }

                    @keyframes ic-img {
                        0% {
                            opacity: 0;
                            transform: scale(1.06);
                            filter: blur(10px) brightness(0.9);
                        }
                        14% {
                            opacity: 1;
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1);
                            filter: blur(0) brightness(1);
                        }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .ic-item--reveal::after,
                        .ic-item--reveal img {
                            animation: none !important;
                            transform: none !important;
                            filter: none !important;
                        }
                    }

                    .active-overlay {
                        background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
                    }
                `}</style>
            </div>
        </div>
    );
}
