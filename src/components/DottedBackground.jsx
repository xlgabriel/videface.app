import { useEffect, useRef } from "react";

const DottedBackground = ({
  spacing = 50,
  size = 2,
  opacity = 0.18,
  color = "0,0,0",
  zIndex = -1,
  speed = 1,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    let rafId = null;

    const update = () => {
      rafId = null;
      if (!ref.current) return;
      // Negative to move with content (paper effect)
      const y = -window.scrollY * speed;
      ref.current.style.backgroundPosition = `0px ${y}px`;
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex,
        pointerEvents: "none",
        backgroundColor: "#F3F3F1",
        backgroundImage: `radial-gradient(circle, rgba(${color},${opacity}) ${size}px, transparent ${size + 0.1}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        backgroundPosition: "0px 0px",
        backgroundRepeat: "repeat",
      }}
    />
  );
};

export default DottedBackground;
