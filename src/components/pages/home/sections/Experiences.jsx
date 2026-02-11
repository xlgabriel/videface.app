import { useEffect, useRef, useState } from "react";
import { BackgroundCircles } from "../../../design/Hero";
import ExperienceCard from "../homeComponents/ExperienceCard";

import KioskIcon from "../../../../assets/svg/Kiosk.svg";
import KeyIcon from "../../../../assets/svg/Key.svg";
import VirtualAssistantsIcon from "../../../../assets/svg/Virtual-assistants.svg";
import LockerKeyIcon from "../../../../assets/svg/Locker-key.svg";
import AcousticCabinIcon from "../../../../assets/svg/Acoustic-cabin.svg";
import CarSystemIcon from "../../../../assets/svg/Car-system.svg";

const EXPERIENCES = [
  { title: "Kiosk for virtual\nAssistance", icon: KioskIcon },
  { title: "Keydrop", icon: KeyIcon },
  { title: "Virtual\nAssistants", icon: VirtualAssistantsIcon },
  { title: "Videface Smart\nLocker Key\nManagement", icon: LockerKeyIcon },
  { title: "Acoustic Cabin\nBooth", icon: AcousticCabinIcon },
  { title: "Car\nManagement\nSystem", icon: CarSystemIcon },
];

// Utility functions
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smoothstep = (t) => t * t * (3 - 2 * t);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const Experiences = () => {
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  const loveSectionRef = useRef(null);

  const [glowAmount, setGlowAmount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loveInView, setLoveInView] = useState(false);

  // Main scroll progress tracker for the section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Progress: 0 when section top hits bottom of viewport, 1 when section top is at 30% from top
      const start = vh;
      const end = vh * 0.3;
      const progress = clamp01((start - rect.top) / (start - end));

      setScrollProgress(progress);
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      rafId && window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Title glow effect (existing logic)
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const titleCenter = rect.top + rect.height / 2;
      const distance = Math.abs(titleCenter - viewportCenter);

      // Near = strongly glowing, Far = fully gradient
      const near = 130;
      const far = 260;
      const t = clamp01(1 - (distance - near) / (far - near));
      setGlowAmount(smoothstep(t));
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      rafId && window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Animation playback: activates on enter and resets on exit
  useEffect(() => {
    const el = loveSectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setLoveInView(Boolean(entry?.isIntersecting));
      },
      { threshold: [0, 0.2] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Slower and delayed animation
  // Semicircle: longer fade and more extended movement
  const bgMotion = easeOutCubic(clamp01(scrollProgress / 0.38));
  const bgOpacity = smoothstep(clamp01(scrollProgress / 0.75));

  // Extra delay for the rest (particles, title, cards)
  // Particles: 44-82% of scroll
  const particlesProgress = easeOutCubic(clamp01((scrollProgress - 0.44) / 0.38));
  // Title: 60-94% of scroll
  const titleProgress = easeOutCubic(clamp01((scrollProgress - 0.60) / 0.34));
  // Cards: 88-100% of scroll (more delay)
  const cardsProgress = easeOutCubic(clamp01((scrollProgress - 0.88) / 0.12));

  // Semicircle (container) with radial gradient, rectangular on sm
  // Treat 'lg' and below as the rectangular layout (lg breakpoint = 1024px)
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 1024;
  const bgStyle = isSmallScreen
    ? {
        background:
          "radial-gradient(ellipse 80% 80% at 50% 50%, #0A6CFF 0%, #0A6CFF 22%, #064199 58%, #031A3F 100%)",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderRadius: 0,
        opacity: bgOpacity,
        transform: `translateY(${(1 - bgMotion) * 120}px)`,
        transition: "transform 170ms ease-out, opacity 220ms ease-out",
        
      }
    : {
        background:
          "radial-gradient(ellipse 80% 80% at 50% 50%, #0A6CFF 0%, #0A6CFF 22%, #064199 58%, #031A3F 100%)",
        borderTopLeftRadius: "50% 800px",
        borderTopRightRadius: "50% 800px",
        opacity: bgOpacity,
        transform: `translateY(${(1 - bgMotion) * 120}px)`,
        transition: "transform 170ms ease-out, opacity 220ms ease-out",
        boxShadow: '15px 15px 25px 0 rgba(0, 0, 0, 0.7)',
      };

  // Particles styles (expansion + fade)
  const particlesStyle = {
    opacity: particlesProgress * 0.5,
    transform: `translate(-50%, 0) scale(${0.5 + 0.5 * particlesProgress})`,
    transition: "transform 200ms ease-out, opacity 200ms ease-out",
  };

  // Title container styles
  const titleContainerStyle = {
    opacity: titleProgress,
    transform: `translateY(${(1 - titleProgress) * 40}px)`,
    transition: "transform 180ms ease-out, opacity 180ms ease-out",
  };

  // Cards container styles
  const cardsContainerStyle = {
    opacity: cardsProgress,
    transform: `translateY(${(1 - cardsProgress) * 60}px)`,
    transition: "transform 200ms ease-out, opacity 200ms ease-out",
  };

  return (
    <>
      <section ref={sectionRef} className="relative w-full overflow-hidden pb-20">
        {/* Fondo: semicírculo con degradado radial, rectangular en sm */}

        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-[100vw] z-10  "
          style={bgStyle}
        />


        {/* Partículas centradas */}
        <div
          className="pointer-events-none absolute left-1/2 top-[170px] h-[900px] w-[900px] z-20"
          style={particlesStyle}
        >
          <BackgroundCircles
            className="absolute inset-0 rounded-full border border-white/10"
          />
        </div>

        <div className="container relative pt-20 sm:pt-52 z-30 flexflex-col items-center" >
          {/* Title with scroll-driven entrance + glow effect */}
          <div style={titleContainerStyle}>
            <h2
              ref={titleRef}
              className="experience-title text-center text-4xl font-medium leading-tight md:text-4xl lg:text-6xl"
            >
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(90deg, #FFFFFF 66%, #007FFF 90%)",
                  WebkitBackgroundClip: "text",
                  display: "inline-block",
                  WebkitTextFillColor: `rgba(255,255,255,${glowAmount})`,
                  color: glowAmount > 0 ? `rgba(255,255,255,${glowAmount})` : "transparent",
                  transition: "WebkitTextFillColor 280ms ease, color 280ms ease, filter 280ms ease",
                  filter:
                    glowAmount > 0
                      ? `drop-shadow(0 0 ${18 * glowAmount}px rgba(255,255,255,${Math.min(
                          0.9,
                          glowAmount
                        )})) brightness(${1 + 0.15 * glowAmount})`
                      : "none",
                }}
              >
                Driving Smarter Customer <br />
                Experiences, <span className="font-bold">Every Day</span>
              </span>
            </h2>
          </div>

          <div className="flex justify-center mt-28 mb-10 sm:mb-20">
            <div
              className="grid w-full max-w-[920px] grid-cols-2 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
              style={cardsContainerStyle}
            >
              {EXPERIENCES.map((item) => (
                <ExperienceCard
                  key={item.title}
                  title={item.title}
                  iconSrc={item.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nuevo apartado tipo tarjetas como la imagen */}
      <section
        ref={loveSectionRef}
        className="w-full py-20 flex flex-col items-center mt-5 sm:mt-20"
      >
                                       <h2 className="font-medium text-4xl md:text-6xl pb-2 text-center">
                                        Why you'll love&nbsp;
                                        <span className="pl-4 font-bold"
                                    
                                    style={{
                                        background: 'linear-gradient(90deg, #00438B 0%, #007FFF 57%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        color: 'transparent',
                                        display: 'inline-block',
                                    }}
                                >
                                    VideFace
                                </span>
                                        </h2> 
        <div className="grid w-full max-w-[1100px] grid-cols-2 justify-items-center gap-6 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4 mt-20">
          {/* Tarjeta 1 */}
          <div
            className={`relative w-full max-w-[180px] sm:max-w-[250px] flag-in ${
              loveInView ? "flag-in--play" : ""
            }`}
            style={{ "--flag-delay": "0ms" }}
          >
            <div className="bg-[#0A6CFF] rounded-b-[7.5rem] h-[320px] sm:h-[370px] p-2" style={{ boxShadow: '12px 0 16px 0 rgba(0,0,0,0.5)' }}>
              <div className="flex flex-col items-center justify-between border-4 border-white rounded-b-[6.5rem] bg-[#0A6CFF] pt-6 pb-8 px-6 h-full w-full">
                <h3 className="text-white text-center font-extrabold text-lg sm:text-xl mb-6">REAL-TIME <br />TRANSLATION</h3>
                <div className="flex-1 flex items-center justify-center">
                  <span className="flex items-center justify-center rounded-full bg-white w-32 h-32 sm:w-40 sm:h-40">
                    <span className="icon-translation w-20 h-20 sm:w-24 sm:h-24 text-[#0A6CFF]" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Tarjeta 2 */}
            <div
              className={`relative w-full max-w-[180px] sm:max-w-[250px] flag-in ${
                loveInView ? "flag-in--play" : ""
              }`}
              style={{ "--flag-delay": "120ms" }}
            >
              <div className="bg-[#0A6CFF] rounded-b-[7.5rem] h-[320px] sm:h-[370px] p-2" style={{ boxShadow: '12px 0 16px 0 rgba(0,0,0,0.5)' }}>
                <div className="flex flex-col items-center justify-between border-4 border-white rounded-b-[6.5rem] bg-[#0A6CFF] pt-6 pb-8 px-6 h-full w-full">
                <h3 className="text-white text-center font-extrabold text-lg sm:text-xl mb-6">24/7 REMOTE AGENT SUPPORT</h3>
                  <div className="flex-1 flex items-center justify-center">
                    <span className="flex items-center justify-center rounded-full bg-white w-32 h-32 sm:w-40 sm:h-40">
                      <span className="icon-agent-support w-20 h-20 sm:w-24 sm:h-24 text-[#0A6CFF]" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          {/* Tarjeta 3 */}
            <div
              className={`relative w-full max-w-[180px] sm:max-w-[250px] flag-in ${
                loveInView ? "flag-in--play" : ""
              }`}
              style={{ "--flag-delay": "240ms" }}
            >
              <div className="bg-[#0A6CFF] rounded-b-[7.5rem] h-[320px] sm:h-[370px] p-2" style={{ boxShadow: '12px 0 16px 0 rgba(0,0,0,0.5)' }}>
                <div className="flex flex-col items-center justify-between border-4 border-white rounded-b-[6.5rem] bg-[#0A6CFF] pt-6 pb-8 px-6 h-full w-full">
                <h3 className="text-white text-center font-extrabold text-lg sm:text-xl mb-6">REDUCE <br />COSTS</h3>
                  <div className="flex-1 flex items-center justify-center">
                    <span className="flex items-center justify-center rounded-full bg-white w-32 h-32 sm:w-40 sm:h-40">
                      <span className="icon-reduce w-20 h-20 sm:w-24 sm:h-24 text-[#0A6CFF]" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          {/* Tarjeta 4 */}
            <div
              className={`relative w-full max-w-[180px] sm:max-w-[250px] flag-in ${
                loveInView ? "flag-in--play" : ""
              }`}
              style={{ "--flag-delay": "360ms" }}
            >
              <div className="bg-[#0A6CFF] rounded-b-[7.5rem] h-[320px] sm:h-[370px] p-2" style={{ boxShadow: '12px 0 16px 0 rgba(0,0,0,0.5)' }}>
                <div className="flex flex-col items-center justify-between border-4 border-white rounded-b-[6.5rem] bg-[#0A6CFF] pt-6 pb-8 px-6 h-full w-full">
                <h3 className="text-white text-center font-extrabold text-lg sm:text-xl mb-6">BOOST <br />PRODUCTIVITY</h3>
                  <div className="flex-1 flex items-center justify-center">
                    <span className="flex items-center justify-center rounded-full bg-white w-32 h-32 sm:w-40 sm:h-40">
                      <span className="icon-productivity w-20 h-20 sm:w-24 sm:h-24 text-[#0A6CFF]" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Experiences;
