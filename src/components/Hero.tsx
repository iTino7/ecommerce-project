import { useEffect, useRef } from "react";
import gsap from "gsap";
import BlurText from "./BlurText";

interface HeroProps {
  onDone: () => void;
}

function Hero({ onDone }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) return;
      progress.current = Math.min(1, progress.current + e.deltaY * 0.002);

      gsap.to(hero, {
        yPercent: -progress.current * 100,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
        onComplete: () => {
          if (progress.current >= 1) onDone();
        },
      });

      if (progress.current >= 1) {
        hero.style.pointerEvents = "none";
        window.removeEventListener("wheel", handleWheel);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      ref={heroRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--background)",
      }}
    >
      <BlurText
        text="Benvenuti su Shopia"
        className="text-5xl font-bold"
        delay={120}
        animateBy="words"
        direction="top"
      />
      <BlurText
        text="Scopri i migliori prodotti, scelti per te."
        className="text-lg opacity-60 mt-4"
        delay={80}
        animateBy="words"
        direction="bottom"
      />
    </div>
  );
}

export default Hero;
