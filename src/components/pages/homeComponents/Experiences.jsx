import { useEffect, useRef, useState } from "react";
import { BackgroundCircles } from "../../design/Hero";
import ExperienceCard from "./ExperienceCard";

import KioskIcon from "../../../assets/svg/Kiosk.svg";
import KeyIcon from "../../../assets/svg/Key.svg";
import VirtualAssistantsIcon from "../../../assets/svg/Virtual-assistants.svg";
import LockerKeyIcon from "../../../assets/svg/Locker-key.svg";
import AcousticCabinIcon from "../../../assets/svg/Acoustic-cabin.svg";
import CarSystemIcon from "../../../assets/svg/Car-system.svg";

const EXPERIENCES = [
  { title: "Self-Service\nKiosk", icon: KioskIcon },
  { title: "Keydrop", icon: KeyIcon },
  { title: "Virtual\nAssistants", icon: VirtualAssistantsIcon },
  { title: "Videface Smart\nLocker Key\nManagement", icon: LockerKeyIcon },
  { title: "Acoustic Cabin\nBooth", icon: AcousticCabinIcon },
  { title: "Car\nManagement\nSystem", icon: CarSystemIcon },
];

const Experiences = () => {
  const titleRef = useRef(null);
  const [glowAmount, setGlowAmount] = useState(0);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    let rafId = 0;

    const clamp01 = (v) => Math.max(0, Math.min(1, v));
    const smoothstep = (t) => t * t * (3 - 2 * t);

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

  return (
    <>
      <section className="relative w-full overflow-hidden pb-20 pt-52">
        {/* Fondo: rectángulo con arco redondeado arriba */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-[100vw] z-10"
          style={{
            background: "linear-gradient(180deg, #0A6CFF 0%, #064199 100%)",
            borderTopLeftRadius: "50% 800px",
            borderTopRightRadius: "50% 800px",
          }}
        />

        {/* Partículas centradas */}
        <div className="pointer-events-none opacity-50 absolute left-1/2 top-[90px] h-[900px] w-[900px] -translate-x-1/2 z-20">
          <BackgroundCircles
            className="absolute inset-0 rounded-full border border-white/10"
          />
        </div>

        <div className="container relative z-30 flex flex-col items-center">



          <h2
            ref={titleRef}
            className="experience-title text-center text-4xl font-medium leading-tight md:text-5xl"
          >
            <span className="relative inline-block">
              <span
                aria-hidden
                style={{
                  background: "linear-gradient(90deg, #FFFFFF 66%, #007FFF 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  display: "inline-block",
                  opacity: 1 - glowAmount,
                  transition: "opacity 280ms ease",
                }}
              >
                Driving Smarter Customer<br />
                Experiences, <span className="font-bold">Every Day</span>
              </span>

              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  color: "#fff",
                  WebkitTextFillColor: "#fff",
                  opacity: glowAmount,
                  transition: "opacity 280ms ease",
                  filter:
                    "drop-shadow(0 0 18px rgba(255, 255, 255, 0.9)) brightness(1.15)",
                  pointerEvents: "none",
                }}
              >
                Driving Smarter Customer<br />
                Experiences, <span className="font-bold">Every Day</span>
              </span>
            </span>
          </h2>

          <div className="mt-24 grid w-full max-w-[920px] grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCES.map((item) => (
              <ExperienceCard
                key={item.title}
                title={item.title}
                iconSrc={item.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Nuevo apartado tipo tarjetas como la imagen */}
      <section className="w-full py-20 flex flex-col items-center mt-20">
                                       <h2 className="font-medium text-3xl md:text-6xl pb-2">
                                        Why you'll love
                                        <p className="pl-4 font-bold"
                                    
                                    style={{
                                        background: 'linear-gradient(90deg, #00438B 0%, #007FFF 57%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        color: 'transparent',
                                        display: 'inline-block',
                                    }}
                                >
                                    Videface
                                </p>
                                        </h2> 
        <div className="grid w-full max-w-[1100px] grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 lg:grid-cols-4 mt-20">
          {/* Tarjeta 1 */}
          <div className="relative w-full max-w-[250px]">
            <div className="bg-[#0A6CFF] rounded-b-[7.5rem] min-h-[370px] p-2" style={{ boxShadow: '12px 0 16px 0 rgba(0,0,0,0.5)' }}>
              <div className="flex flex-col items-center justify-between border-4 border-white rounded-b-[6.5rem] bg-[#0A6CFF] pt-6 pb-8 px-6 min-h-[354px] w-full h-full">
                <div className="text-white text-center font-extrabold text-xl mb-6">REAL-TIME<br />TRANSLATION</div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="flex items-center justify-center rounded-full bg-white w-40 h-40">
                    <span className="icon-translation w-24 h-24 text-[#0A6CFF]" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Tarjeta 2 */}
            <div className="relative w-full max-w-[250px]">
              <div className="bg-[#0A6CFF] rounded-b-[7.5rem] min-h-[370px] p-2" style={{ boxShadow: '12px 0 16px 0 rgba(0,0,0,0.5)' }}>
                <div className="flex flex-col items-center justify-between border-4 border-white rounded-b-[6.5rem] bg-[#0A6CFF] pt-6 pb-8 px-6 min-h-[354px] w-full h-full">
                  <div className="text-white text-center font-extrabold text-xl mb-6">24/7 REMOTE AGENT SUPPORT</div>
                  <div className="flex-1 flex items-center justify-center">
                    <span className="flex items-center justify-center rounded-full bg-white w-40 h-40">
                      <span className="icon-agent-support w-24 h-24 text-[#0A6CFF]" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          {/* Tarjeta 3 */}
            <div className="relative w-full max-w-[250px]">
              <div className="bg-[#0A6CFF] rounded-b-[7.5rem] min-h-[370px] p-2" style={{ boxShadow: '12px 0 16px 0 rgba(0,0,0,0.5)' }}>
                <div className="flex flex-col items-center justify-between border-4 border-white rounded-b-[6.5rem] bg-[#0A6CFF] pt-6 pb-8 px-6 min-h-[354px] w-full h-full">
                  <div className="text-white text-center font-extrabold text-xl mb-6">REDUCE<br />COSTS</div>
                  <div className="flex-1 flex items-center justify-center">
                    <span className="flex items-center justify-center rounded-full bg-white w-40 h-40">
                      <span className="icon-reduce w-24 h-24 text-[#0A6CFF]" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          {/* Tarjeta 4 */}
            <div className="relative w-full max-w-[250px]">
              <div className="bg-[#0A6CFF] rounded-b-[7.5rem] min-h-[370px] p-2" style={{ boxShadow: '12px 0 16px 0 rgba(0,0,0,0.5)' }}>
                <div className="flex flex-col items-center justify-between border-4 border-white rounded-b-[6.5rem] bg-[#0A6CFF] pt-6 pb-8 px-6 min-h-[354px] w-full h-full">
                  <div className="text-white text-center font-extrabold text-xl mb-6">BOOST<br />PRODUCTIVITY</div>
                  <div className="flex-1 flex items-center justify-center">
                    <span className="flex items-center justify-center rounded-full bg-white w-40 h-40">
                      <span className="icon-productivity w-24 h-24 text-[#0A6CFF]" />
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
