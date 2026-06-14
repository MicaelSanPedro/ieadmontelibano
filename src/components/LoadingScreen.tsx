"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 4200);
    const t2 = setTimeout(() => setVisible(false), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-opacity duration-800 ${fade ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ background: "#050a14" }}
    >
      {/* Subtle ambient glow behind logo */}
      <div
        className="absolute w-72 h-72 rounded-full animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(160,180,208,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Spinning ring container */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
        {/* Spinning border ring */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          style={{ animationDuration: "1.8s" }}
          viewBox="0 0 100 100"
          fill="none"
        >
          <defs>
            <linearGradient id="spin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
              <stop offset="25%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="50%" stopColor="rgba(160,180,208,0.9)" />
              <stop offset="75%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="48"
            stroke="url(#spin-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="100 200"
          />
        </svg>

        {/* Second ring — counter-rotate, thinner */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          style={{ animationDuration: "2.5s", animationDirection: "reverse" }}
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.5"
            strokeDasharray="60 220"
            strokeLinecap="round"
          />
        </svg>

        {/* Outer glow ring */}
        <div
          className="absolute inset-[-4px] rounded-full animate-spin"
          style={{
            animationDuration: "4s",
            background: "conic-gradient(from 0deg, transparent 0%, rgba(160,180,208,0.2) 25%, transparent 50%, rgba(255,255,255,0.15) 75%, transparent 100%)",
            filter: "blur(4px)",
          }}
        >
          <div className="absolute inset-[2px] rounded-full" style={{ background: "#050a14" }} />
        </div>

        {/* Logo */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden z-10">
          <Image src="/logo.png" alt="IEAD" fill className="object-contain" priority />
        </div>
      </div>

      {/* Text below */}
      <p
        className="absolute mt-52 sm:mt-60 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase"
        style={{
          color: "rgba(255,255,255,0.25)",
          animation: "pulse 2s ease-in-out infinite",
        }}
      >
        Carregando
      </p>
    </div>,
    document.body
  );
}