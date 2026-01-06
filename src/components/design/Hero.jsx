import { useEffect, useState } from "react";
import { MouseParallax } from "react-just-parallax";

import PlusSvg from "../../assets/svg/PlusSvg";

export const Gradient = () => {
  return (
    <>
      <div className="relative z-1 h-6 mx-2.5 bg-n-11 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8" />
      <div className="relative z-1 h-6 mx-6 bg-n-11/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
    </>
  );
};

export const BottomLine = () => {
  return (
    <>
      <div className="hidden absolute top-[55.25rem] left-10 right-10 h-0.25 bg-n-1 pointer-events-none xl:block" />

      <PlusSvg className="hidden absolute top-[54.9375rem] left-[2.1875rem] z-2 pointer-events-none xl:block" />

      <PlusSvg className="hidden absolute top-[54.9375rem] right-[2.1875rem] z-2 pointer-events-none xl:block" />
    </>
  );
};

const Rings = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 w-[90rem] aspect-square border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
      {/* <div className="absolute top-1/2 left-1/2 w-[78rem] aspect-square border border-white/25 rounded-full -translate-x-1/2 -translate-y-1/2" /> */}
      <div className="absolute top-1/2 left-1/2 w-[65.875rem] aspect-square border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
      {/* <div className="absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" /> */}
      <div className="absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
      {/* <div className="absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2" /> */}
      <div className="absolute top-1/2 left-1/2 w-[12rem] aspect-square border border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </>
  );
};

export const BackgroundCircles = ({ parallaxRef, className }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wrapperClassName =
    className ??
    "absolute -top-[42.375rem] left-1/2 w-[78rem] aspect-square border border-n-2/5 rounded-full -translate-x-1/2 md:-top-[38.5rem] xl:-top-[32rem]";

  return (
    <div className={wrapperClassName}>
      <Rings />

      {/* Moving background colored circle balls */}
      <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>
        {/* Esferas originales */}
        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[46deg]">
          <div
            className={`w-2 h-2 -ml-1 -mt-36 bg-gradient-to-b from-white to-[#1486FF] rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[56deg]">
          <div
            className={`w-4 h-4 -ml-1 -mt-32 bg-gradient-to-b from-white to-[#1486FF] rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[54deg]">
          <div
            className={`hidden w-4 h-4 -ml-1 mt-[12.9rem] bg-gradient-to-b from-white to-[#1486FF] rounded-full xl:block transit transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[65deg]">
          <div
            className={`w-3 h-3 -ml-1.5 mt-52 bg-gradient-to-b from-white to-[#1486FF] rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[85deg]">
          <div
            className={`w-6 h-6 -ml-3 -mt-3 bg-gradient-to-b from-white to-[#1486FF] rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[70deg]">
          <div
            className={`w-6 h-6 -ml-3 -mt-3 bg-gradient-to-b from-white to-[#1486FF] rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          />
        </div>

        {/* Esferas adicionales */}
        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-2/3 origin-bottom rotate-[20deg]">
          <div
            className={`w-8 h-8 -ml-4 -mt-40 bg-gradient-to-b from-white to-[#1486FF] opacity-70 rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-80" : "translate-y-10 opacity-0"}`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/3 origin-bottom -rotate-[30deg]">
          <div
            className={`w-5 h-5 -ml-2.5 -mt-20 bg-gradient-to-b from-white to-[#1486FF] opacity-60 rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-80" : "translate-y-10 opacity-0"}`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-2/3 origin-bottom rotate-[110deg]">
          <div
            className={`w-10 h-10 -ml-5 -mt-60 bg-gradient-to-b from-white to-[#1486FF] opacity-50 rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-70" : "translate-y-10 opacity-0"}`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/4 origin-bottom rotate-[150deg]">
          <div
            className={`w-3 h-3 -ml-1.5 -mt-10 bg-gradient-to-b from-white to-[#1486FF] opacity-80 rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-90" : "translate-y-10 opacity-0"}`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-3/4 origin-bottom -rotate-[120deg]">
          <div
            className={`w-7 h-7 -ml-3.5 -mt-56 bg-gradient-to-b from-white to-[#1486FF] opacity-60 rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-80" : "translate-y-10 opacity-0"}`}
          />
        </div>
      </MouseParallax>
    </div>
  );
};
