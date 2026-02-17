import Button from "../../../Button";
import ImageKioskBG from "../../../../assets/hero/kioskbg.webp";
import ImageKioskUSER from "../../../../assets/hero/kioskuser.webp";
import { useEffect, useRef, useState } from "react";

const KioskHero = () => {
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
        <div ref={heroRef} id="kiosk-hero" className="w-full pt-28 pb-10 lg:pt-20 lg:pb-12 xl:pt-40 xl:pb-28">
            <div className="container flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
                <div className="w-full lg:flex-1 lg:max-w-[48rem] relative z-20 flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:pr-12 lg:-ml-16 xl:-ml-10">
                    <h1 className="font-bold text-center lg:ml-10 xl:ml-0 lg:text-left text-4xl md:text-5xl lg:text-6xl lg:font-semibold leading-[1.05] mb-6 hero-left-enter">
                        Smart Self-Service Kiosk
                    </h1>

                    <h2 className="text-3xl md:text-4xl font-normal text-black mb-6 lg:ml-10 xl:ml-0 hero-left-enter">
                        Built to Transform <span className="font-bold" style={{
                            background: 'linear-gradient(90deg, #00438B 0%, #007FFF 57%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: 'transparent',
                            display: 'inline-block',
                        }}>Customer Operations</span>
                    </h2>

                    <div className="w-full flex justify-center mt-6 hero-left-enter">
                        <Button
                            textColor="text-white"
                            size="lg"
                            className="hero-cta-btn"
                        >
                            REQUEST A DEMO
                        </Button>
                    </div>
                </div>

                <div className="w-full lg:flex-1 relative z-10 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[450px] rounded-[28px] overflow-visible">
                            <div style={{ ...bgWrapStyle }}>
                                <img
                                    src={ImageKioskBG}
                                    alt="Kiosk background"
                                    className="block h-auto w-full hero-bg-enter"
                                    style={{ borderRadius: 24, boxShadow: "15px 12px 0 0 rgba(59,130,246,0.40)" }}
                                />
                            </div>

                        <div className="absolute bottom-0 right-0 z-10 pointer-events-none" style={userWrapStyle}>
                            <img
                                src={ImageKioskUSER}
                                alt="Kiosk user"
                                className="hero-user-enter h-auto w-[100%] rounded-[28px]"
                                style={{ borderRadius: 24 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KioskHero;
