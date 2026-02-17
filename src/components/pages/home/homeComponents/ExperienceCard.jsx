import { useState, useEffect } from 'react';

const ExperienceCard = ({ title, iconSrc }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(false);

  const Icon = ({ className }) => (
    <span
      aria-hidden="true"
      className={className}
      style={{
        WebkitMaskImage: `url(${iconSrc})`,
        maskImage: `url(${iconSrc})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="group relative w-full max-w-[320px] h-[120px] overflow-hidden rounded-2xl border border-white/20 bg-blue-200/20 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white shadow-[10px_14px_28px_-10px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35)] hover:shadow-[10px_14px_28px_-10px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35),0_0_48px_rgba(255,255,255,0.55)] experience-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center experience-card__content">
          {hovered ? (
            <Icon className="h-16 w-16 block bg-current text-white transition-colors duration-300 group-hover:text-color-1" />
          ) : (
            <h3 className="whitespace-pre-line text-base font-bold uppercase leading-tight tracking-wide text-white transition-colors duration-300 group-hover:text-[#064199]">
              {title}
            </h3>
          )}
        </div>
        <style>{`
          .experience-card:hover .experience-card__content {
            filter: drop-shadow(0 0 60px rgba(255, 255, 255, 1)) drop-shadow(0 0 220px rgba(255, 255, 255, 0.7));
            transition: filter 0.3s;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="group relative h-[280px] w-[240px] overflow-hidden rounded-2xl border border-white/20 bg-blue-200/20 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white shadow-[10px_14px_28px_-10px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35)] hover:shadow-[10px_14px_28px_-10px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35),0_0_48px_rgba(255,255,255,0.55)] experience-card">
      <div className="relative z-10 flex h-full flex-col items-center justify-start pt-4 text-center experience-card__content">
        <h3 className="whitespace-pre-line text-base font-bold uppercase leading-tight tracking-wide text-white transition-colors duration-300 group-hover:text-[#064199]">
          {title}
        </h3>
        <Icon className="mt-6 h-28 w-28 block bg-current text-white transition-colors duration-300 group-hover:text-color-1" />
        <style>{`
          .experience-card:hover .experience-card__content {
            filter: drop-shadow(0 0 60px rgba(255, 255, 255, 1)) drop-shadow(0 0 220px rgba(255, 255, 255, 0.7));
            transition: filter 0.3s;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ExperienceCard;
