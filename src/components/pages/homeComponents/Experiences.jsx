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
  return (
    <section className="relative w-full overflow-hidden pb-20 pt-52">
      {/* Fondo: rectángulo con arco redondeado arriba */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-[100vw]"
        style={{
          background: "linear-gradient(180deg, #0A6CFF 0%, #064199 100%)",
          borderTopLeftRadius: "50% 800px",
          borderTopRightRadius: "50% 800px",
        }}
      />

      {/* Partículas centradas */}
      <div className="pointer-events-none absolute left-1/2 top-[90px] h-[900px] w-[900px] -translate-x-1/2">
        <BackgroundCircles
          className="absolute inset-0 rounded-full border border-white/10"
        />
      </div>

      <div className="container relative z-10 flex flex-col items-center">
        <h2 className="text-center text-4xl font-medium leading-tight text-white md:text-5xl">
          Driving Smarter Customer<br />
          Experiences, <span className="font-bold text-black">Every Day</span>
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
  );
};

export default Experiences;
