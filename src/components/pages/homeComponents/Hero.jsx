import Button from "../../Button";
import CompanyLogos from "../../CompanyLogos";
import { BottomLine } from "../../design/Hero";
import ImagePrincipalBG from "../../../assets/hero/ImagePrincipalBG.webp";
import ImagePrincipalUSER from "../../../assets/hero/ImagePrincipalUSER.webp";
import ImageInterfaz from "../../../assets/hero/interfaz.png";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
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

            // 0 when hero top is in/above viewport, 1 when it has moved up ~60% of its height.
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

    // Fade starts after 55% of scroll, so for first 0.55 progress, opacity stays at 1
    const fadeStart = 0.25;
    const fadeProgress = scrollProgress < fadeStart ? 0 : (scrollProgress - fadeStart) / (1 - fadeStart);
    const bgWrapStyle = {
        opacity: 1 - fadeProgress,
        transform: `translateY(${-140 * scrollProgress}px)`,
        transition: "transform 120ms linear, opacity 120ms linear",
        willChange: "transform, opacity",
    };

    const userWrapStyle = {
        opacity: 1 - fadeProgress,
        transform: `translateY(${-220 * scrollProgress}px)`,
        transition: "transform 120ms linear, opacity 120ms linear",
        willChange: "transform, opacity",
    };

    return (
        <div ref={heroRef} id="hero" className="w-full pt-12 pb-10 lg:pt-16 lg:pb-12 xl:pt-20 xl:pb-16">
            <div className="container flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="w-full lg:flex-1 lg:max-w-[34rem] flex flex-col justify-center items-start text-left">
                    <h1 className="font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 hero-left-enter">
                        Your Entire Customer<br />Service Operation,<br />Powered by Virtual Assistance.
                    </h1>
                    <div className="w-full flex justify-center mt-8 hero-left-enter">
                        <Button
                            href="#demo"
                            textColor="text-white"
                            size="lg"
                            className="hero-cta-btn glass-blue-btn"
                                style={{
                                    background: "#0A6CFF",
                                    boxShadow: "5px 7px 10px 0 rgb(0, 0, 0, 0.4), 0 4px 32px 0 rgba(0, 127, 255, 0.10), 0 0 24px 2px rgba(255,255,255,0.45)",
                                }}
                        >
                            REQUEST A DEMO
                        </Button>
                    </div>
                </div>
                <div className="w-full lg:flex-1 flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[826px] overflow-visible">
                        <div style={bgWrapStyle}>
                            <img
                                src={ImagePrincipalBG}
                                alt="Background"
                                className="block w-full h-auto hero-bg-enter"
                            />
                        </div>

                        <div
                            className="absolute bottom-0 right-0 z-10 pointer-events-none"
                            style={userWrapStyle}
                        >
                            <img
                                src={ImagePrincipalUSER}
                                alt="User"
                                className="hero-user-enter"
                                style={{ background: "transparent", height: "auto" }}
                            />
                        </div>
                        <img
                            src={ImageInterfaz}
                            alt="User"
                            className="absolute bottom-0 right-0 z-10 pointer-events-none"
                            style={{ background: "transparent", height: "auto" }}
                        />
                    </div>
                </div>
            </div>
            <div className="container text-center mt-40 mb-4">
                                <h2
                                    className="font-bold text-3xl md:text-6xl pb-2"
                                    style={{
                                        background: 'linear-gradient(90deg, #00438B 0%, #007FFF 57%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        color: 'transparent',
                                        display: 'inline-block',
                                    }}
                                >
                                    Empowering Businesses
                                </h2>
                <p className="text-2xl md:text-6xl font-normal text-black mb-6">
                    with Seamless Remote Service
                </p>
                <CompanyLogos className="z-10 mt-20" />

            </div>

        </div>
    );
};

export default Hero;
