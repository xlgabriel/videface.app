const ExperienceCard = ({ title, iconSrc }) => {
  return (
    <div className="group relative h-[280px] w-[240px] overflow-hidden rounded-2xl border border-white/20 bg-blue-200/20 p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white shadow-[10px_14px_28px_-10px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35)] hover:shadow-[10px_14px_28px_-10px_rgba(0,0,0,0.65),0_6px_18px_-12px_rgba(0,0,0,0.35),0_0_48px_rgba(255,255,255,0.55)] experience-card">
      <div className="relative z-10 flex h-full flex-col items-center justify-start pt-4 text-center experience-card__content">
        <p className="whitespace-pre-line text-base font-bold uppercase leading-tight tracking-wide text-white transition-colors duration-300 group-hover:text-[#064199]">
          {title}
        </p>
        <img
          src={iconSrc}
          alt=""
          className="mt-6 h-28 w-28 transition duration-300 [filter:brightness(0)_invert(1)] group-hover:[filter:none]"
        />
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
