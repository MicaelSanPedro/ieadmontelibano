"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) entry.target.classList.add("animate-fade-in-up"); }, { threshold: 0.1 });
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const scroll = (sel: string) => { const t = document.querySelector(sel); if (t) t.scrollIntoView({ behavior: "smooth" }); };

  return (
    <section id="inicio" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80')" }} />
      <div className="hero-overlay absolute inset-0" />
      <div className="hero-pattern absolute inset-0" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up mb-8 flex justify-center">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl overflow-hidden glass-pill p-3">
            <Image src="/logo.png" alt="IEAD Logo" fill className="object-contain" priority />
          </div>
        </div>

        <div className="animate-fade-in-up animation-delay-200 glass-pill inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8">
          <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
          <span className="text-sm text-white/80 font-medium tracking-wide">Igreja Evangélica Assembleia de Deus</span>
        </div>

        <h1 className="animate-fade-in-up animation-delay-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
          <span className="text-gradient-white" style={{ filter: "drop-shadow(0 0 24px rgba(255,255,255,0.6)) drop-shadow(0 0 60px rgba(160,180,208,0.4))" }}>IEAD MONTE LÍBANO</span>
        </h1>
        <p className="animate-fade-in-up animation-delay-300 text-sm sm:text-base text-white/40 font-medium tracking-wider uppercase mb-8">Rondonópolis — MT</p>

        <p className="animate-fade-in-up animation-delay-400 text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed">
          Um lugar de encontro com Deus, onde a fé é fortalecida, a família é acolhida e vidas são transformadas pelo poder do Evangelho.
        </p>

        <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#cultos" onClick={(e) => { e.preventDefault(); scroll("#cultos"); }}
            className="btn-glass-white px-8 py-4 text-dark-600 rounded-full font-semibold text-base hover:bg-white transition-all duration-300 hover:scale-105 w-full sm:w-auto">
            Horários de Culto
          </a>
          <a href="#sobre" onClick={(e) => { e.preventDefault(); scroll("#sobre"); }}
            className="glass-pill px-8 py-4 text-white rounded-full font-semibold text-base hover:bg-white/[0.1] transition-all duration-300 hover:scale-105 w-full sm:w-auto">
            Conheça nossa Igreja
          </a>
        </div>

        <div className="animate-fade-in-up animation-delay-600 mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[
            { label: "Domingo", time: "9:00 & 19:00" },
            { label: "Quarta-feira", time: "19:30" },
            { label: "Sexta-feira", time: "19:30" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-6 sm:gap-10">
              {i > 0 && <div className="w-px h-10 bg-white/8 hidden sm:block" />}
              <div className="text-center">
                <p className="text-white/40 font-semibold text-sm uppercase tracking-wider">{s.label}</p>
                <p className="text-white font-bold text-lg">{s.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => scroll("#sobre")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors duration-300 animate-bounce"
        aria-label="Rolar para baixo">
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}