import React, { useEffect, useRef, useState } from "react";

export default function MessageCarousel({ items = [], autoPlay = true, interval = 6000 }) {
    const [index, setIndex] = useState(0);
    const timerRef = useRef(null);
    const count = items.length;

    if (!count) return null;

    useEffect(() => {
        if (!autoPlay || count <= 1) return;
        timerRef.current && clearInterval(timerRef.current);
        timerRef.current = setInterval(() => slide(1), interval);
        return () => timerRef.current && clearInterval(timerRef.current);
    }, [autoPlay, interval, count]);

    const slide = (d) => setIndex(i => (i + d + count) % count);

    return (
        <div className="relative w-full py-10">
            <div className="relative w-full max-w-[980px] mx-auto h-[320px] md:h-[340px] perspective">

                {items.map((item, i) => {
                    const offset = ((i - index + count) % count + count) % count;
                    let pos = "hidden";
                    if (offset === 0) pos = "current";
                    if (offset === 1) pos = "next";
                    if (offset === count - 1) pos = "prev";
                    return <StackCard key={i} item={item} pos={pos} />;
                })}

                <button onClick={() => slide(-1)} className="nav left">‹</button>
                <button onClick={() => slide(1)} className="nav right">›</button>
            </div>

            <div className="flex items-center justify-center gap-3 mt-6">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => slide(i > index ? 1 : -1)}
                        className={`h-2 rounded-full transition-all ${i === index ? "bg-[#1486FF] w-16" : "bg-[#93C5FD] w-10"
                            }`}
                    />
                ))}
            </div>

            <style jsx>{`
        .perspective { perspective: 1200px; }

        .nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          border-radius: 999px;
          background: white;
          border: 1px solid #e5e7eb;
          box-shadow: 0 6px 18px rgba(0,0,0,.15);
          z-index: 50;
        }
                .left { left: -14px; }
                .right { right: -14px; }

                @media (min-width: 768px) {
                    .left { left: -64px; }
                    .right { right: -64px; }
                }
      `}</style>
        </div>
    );
}

function StackCard({ item, pos }) {
    const sizeClass =
        pos === "current"
                        ? "w-[92vw] max-w-[560px] md:w-[600px] md:max-w-none"
            : pos === "prev" || pos === "next"
                                ? "hidden md:block w-[360px]"
                                : "hidden md:block w-[320px]";

    const cardHeightClass = pos === "current" ? "h-[400px] md:h-[300px]" : "h-[240px]";

    const base =
        "absolute inset-0 mx-auto transition-[transform,opacity] duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] will-change-[transform,opacity] ";

    const states = {
        current: {
            transform: "translateX(0) scale(1)",
            opacity: 1,
            zIndex: 30,
            pointerEvents: "auto",
        },
        prev: {
            transform: "translateX(-60%) scale(.88)",
            opacity: .38,
            zIndex: 10,
            pointerEvents: "none",
        },
        next: {
            transform: "translateX(60%) scale(.88)",
            opacity: .38,
            zIndex: 10,
            pointerEvents: "none",
        },
        hidden: {
            transform: "translateX(0) scale(.85)",
            opacity: 0,
            zIndex: 0,
            pointerEvents: "none",
        },
    };

    const isBackground = pos !== "current";

    const clampStyle = isBackground
        ? {
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
        }
        : undefined;

    return (
        <div className={base + sizeClass} style={states[pos]}>
            <div
                className={"bg-white rounded-md border border-gray-100 relative overflow-hidden " + cardHeightClass}
                style={{ boxShadow: "8px 12px 0 0 rgba(59,130,246,0.40)" }}
            >
                <div className="absolute top-4 right-4 ">
                    <span className="iconBase icon-user w-12 h-12 text-[#007FFF] block" />
                </div>

                <div className={isBackground ? "px-8 py-6 pr-24" : "px-10 py-7 pr-28"}>
                    <p className={isBackground ? "text-[#1486FF] font-bold text-lg" : "text-[#1486FF] font-bold text-2xl"}>{item.name}</p>
                    <p className={isBackground ? "text-sm font-semibold text-gray-800" : "text-base font-semibold text-gray-800"}>{item.role}</p>
                    <p
                        className={isBackground ? "mt-4 text-base text-gray-700 leading-relaxed" : "mt-6 text-lg text-gray-700 leading-relaxed"}
                        style={clampStyle}
                    >
                        {item.text}
                    </p>
                </div>
            </div>
        </div>
    );
}
