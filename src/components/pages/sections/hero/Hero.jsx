import { useEffect, useRef, useState } from "react";
import Button from "../../../Button";

export default function Hero({
    id,
    title,
    subtitlePrefix,
    subtitleHighlight,
    bgImage,
    bgAlt,
    userImage,
    userAlt,
    bgImageClassName = "block h-auto w-full hero-bg-enter",
    userImageClassName = "hero-user-enter h-auto w-[100%] rounded-[28px]",
    userPositionClass = "lg:right-0 md:right-0 left-0",
    userScaleClass = "lg:scale-100 md:scale-90 scale-75",
}) {
    const heroRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let rafId = 0;

        const clamp01 = (value) => Math.max(0, Math.min(1, value));

        const update = () => {
            rafId = 0;
            const el = heroRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const heroHeight = Math.max(1, rect.height);

            const progress = clamp01((-rect.top) / (heroHeight * 0.6));
            setScrollProgress(progress);
        };

        const onScrollOrResize = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);
        update();

        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            if (rafId) window.cancelAnimationFrame(rafId);
        };
    }, []);

    const fadeStart = 0.25;
    const fadeProgress = scrollProgress < fadeStart ? 0 : (scrollProgress - fadeStart) / (1 - fadeStart);
    const bgWrapStyle = {
        opacity: 1 - fadeProgress,
        transform: `translateY(${-120 * scrollProgress}px)`,
        transition: "transform 120ms linear, opacity 120ms linear",
        willChange: "transform, opacity",
    };

    const userWrapStyle = {
        opacity: 1 - fadeProgress,
        transform: `translateY(${-180 * scrollProgress}px)`,
        transition: "transform 120ms linear, opacity 120ms linear",
        willChange: "transform, opacity",
    };

    return (
        <div ref={heroRef} id={id} className="w-full pt-28 pb-10 lg:pt-20 lg:pb-12 xl:pt-40 xl:pb-28">
            <div className="container flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
                <div className="w-full lg:flex-1 lg:max-w-[48rem] relative z-20 flex flex-col justify-center items-center text-center lg:pr-12">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl lg:font-semibold leading-[1.05] mb-6 hero-left-enter">
                        {title}
                    </h1>

                    <h2 className="text-3xl md:text-4xl font-normal text-black mb-6 hero-left-enter">
                        {subtitlePrefix}{" "}
                        <span
                            className="font-bold pb-1"
                            style={{
                                background: "linear-gradient(90deg, #00438B 0%, #007FFF 57%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                color: "transparent",
                                display: "inline-block",
                            }}
                        >
                            {subtitleHighlight}
                        </span>
                    </h2>

                    <div className="w-full flex justify-center mt-6 hero-left-enter">
                        <Button textColor="text-white" size="lg" className="hero-cta-btn">
                            REQUEST A DEMO
                        </Button>
                    </div>
                </div>

                <div className="w-full lg:flex-1 relative z-10 flex justify-center lg:justify-end items-end">
                    <div className="relative flex justify-center items-end w-full max-w-[450px]">
                        <div style={bgWrapStyle}>
                            <img
                                src={bgImage}
                                alt={bgAlt}
                                className={bgImageClassName}
                                style={{ borderRadius: 24, boxShadow: "15px 12px 0 0 rgba(59,130,246,0.40)" }}
                            />
                        </div>

                        <div className={`absolute bottom-0 z-10 pointer-events-none ${userPositionClass} ${userScaleClass}`} style={{...userWrapStyle, transformOrigin: 'bottom right'}}>
                            <img src={userImage} alt={userAlt} className={userImageClassName} style={{ borderRadius: 24 }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
