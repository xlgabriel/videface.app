import Button from "../../../Button";
import CompanyLogos from "../../../CompanyLogos";
import { BottomLine } from "../../../design/Hero";
import ImagePrincipalBG from "../../../../assets/hero/ImagePrincipalBG.webp";
import ImagePrincipalUSER from "../../../../assets/hero/ImagePrincipalUSER.webp";
import ImageInterfaz from "../../../../assets/hero/interfaz.gif";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "../homeComponents/ImageGallery";

const Hero = () => {
    const heroRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const companyLogosRef = useRef(null);
    const companyLogosRafRef = useRef(0);

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

    useEffect(() => {
        const el = companyLogosRef.current;
        if (!el) return;

        const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const clamp01 = (value) => Math.max(0, Math.min(1, value));
        const smoothstep = (t) => t * t * (3 - 2 * t);

        // Modern scroll-driven feel (targets)
        const maxTranslate = 140; // px
        const minScale = 0.9;
        const maxRotate = 1.25; // deg

        const current = { opacity: 1, translateY: 0, scale: 1, rotate: 0 };
        const target = { opacity: 1, translateY: 0, scale: 1, rotate: 0 };
        let measureRaf = 0;
        let tickRaf = 0;

        el.style.willChange = "opacity, transform";
        el.style.transformOrigin = "50% 50%";
        el.style.transition = "none";

        const apply = () => {
            const node = companyLogosRef.current;
            if (!node) return;

            node.style.opacity = String(current.opacity);
            node.style.transform = `translate3d(0, ${current.translateY}px, 0) scale(${current.scale}) rotate(${current.rotate}deg)`;
        };

        const tick = () => {
            tickRaf = 0;
            const k = 0.14; // smoothing factor (higher = snappier)

            current.opacity += (target.opacity - current.opacity) * k;
            current.translateY += (target.translateY - current.translateY) * k;
            current.scale += (target.scale - current.scale) * k;
            current.rotate += (target.rotate - current.rotate) * k;

            apply();

            const done =
                Math.abs(target.opacity - current.opacity) < 0.001 &&
                Math.abs(target.translateY - current.translateY) < 0.05 &&
                Math.abs(target.scale - current.scale) < 0.001 &&
                Math.abs(target.rotate - current.rotate) < 0.01;

            if (!done) tickRaf = window.requestAnimationFrame(tick);
        };

        const updateTarget = () => {
            const node = companyLogosRef.current;
            if (!node) return;

            const rect = node.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;

            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = vh / 2;
            const norm = (elementCenter - viewportCenter) / (vh / 2);
            const absNorm = Math.abs(norm);

            const visibility = smoothstep(clamp01(1 - absNorm));

            target.opacity = 0.12 + 0.88 * visibility;
            target.scale = minScale + (1 - minScale) * visibility;
            target.translateY = prefersReducedMotion ? 0 : -norm * maxTranslate * (1 - visibility);
            target.rotate = prefersReducedMotion ? 0 : norm * maxRotate * (1 - visibility);

            if (!tickRaf) tickRaf = window.requestAnimationFrame(tick);
        };

        const onScrollOrResize = () => {
            if (measureRaf) return;
            measureRaf = window.requestAnimationFrame(() => {
                measureRaf = 0;
                updateTarget();
            });
        };

        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);
        updateTarget();

        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            if (measureRaf) window.cancelAnimationFrame(measureRaf);
            if (tickRaf) window.cancelAnimationFrame(tickRaf);
            measureRaf = 0;
            tickRaf = 0;
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
            <div className="container flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20" >
                <div className="w-full lg:flex-1 lg:max-w-[48rem] relative z-20 flex flex-col justify-center items-center lg:items-start text-center lg:text-left lg:pr-12 lg:-ml-16 xl:-ml-24">
                    <h1 className="font-bold text-center lg:ml-10 xl:ml-0 lg:text-left text-4xl md:text-5xl lg:text-6xl lg:font-semibold leading-[1.05] mb-8 hero-left-enter">
                        Your Entire Customer <br />Service Operation, Powered by <br />
                        <span className="font-bold"
                            style={{
                                background: 'linear-gradient(90deg, #00438B 0%, #007FFF 57%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: 'transparent',
                                display: 'inline-block',
                            }}
                        >Virtual Assistance.</span>
                    </h1>
                    <div className="w-full flex justify-center mt-8 hero-left-enter">
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
                    <div className="relative w-full max-w-[360px] sm:max-w-[520px] md:max-w-[640px] lg:max-w-[826px] overflow-visible">
                        <div style={{ ...bgWrapStyle }}>
                            <img
                                src={ImagePrincipalBG}
                                alt="VideFace Branded Background"
                                title="VideFace branded background representing virtual assistance technology"
                                className="block h-auto w-[120%] max-w-[1000px] hero-bg-enter"
                            />
                        </div>

                        <div
                            className="absolute bottom-0 right-0 z-10 pointer-events-none"
                            style={userWrapStyle}
                        >
                            <img
                                src={ImagePrincipalUSER}
                                alt="Virtual Customer Service Agent"
                                title="Virtual customer service agent displayed on a VideFace assistance screen"
                                className="hero-user-enter h-auto w-[120%] max-w-[1000px]"
                            />
                        </div>

                        <img
                            src={ImageInterfaz}
                            alt="VideFace Virtual Assistance Screen"
                            title="VideFace virtual assistance screen used for remote customer service"
                            className="absolute z-10 pointer-events-none hero-gif-enter max-w-[60vw] w-[170px] sm:w-[220px] md:w-[280px] lg:w-[250px] xl:w-[320px] right-30 sm:right-70 md:right-74 lg:right-[280px] xl:right-[340px] top-10 sm:top-20 md:top-20 lg:top-[40px] xl:top-[50px]"
                            style={{
                                background: "transparent",
                                height: "auto",
                                borderRadius: "10px",
                                boxShadow: "4px 4px 16px 7px rgb(10,108,255,0.5)",
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="container text-center mt-20 sm:mt-40 mb-24">
                <h2
                    className="font-bold text-4xl md:text-6xl pb-2"
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
                <p className="text-3xl md:text-6xl font-normal text-black mb-6">
                    with Seamless Remote Service
                </p>
                <div className="z-10 mt-10 sm:mt-20 mb-20">
                    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-2 sm:px-6">
                        <div ref={companyLogosRef} className="w-full">
                            <CompanyLogos className="w-full" />
                        </div>
                    </div>
                </div>

            </div>
            <ImageGallery />
            <div className="container text-center mt-8 mb-0">
                <Button
                    textColor="text-white"
                    size="lg"
                    className="hero-cta-btn"
                >
                    GET A DEMO
                </Button>
            </div>
                    
        </div>

    );
};

export default Hero;
