"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 4200);
    const t2 = setTimeout(() => setVisible(false), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-opacity duration-700 ${fade ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ background: "#050a14" }}
    >
      {/* Ambient glow — static, no animation */}
      <div
        className="absolute w-64 h-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(61,71,126,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
        {/* Single SVG spinner — GPU compositing only (transform: rotate) */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ animation: "spin 1.6s linear infinite", willChange: "transform" }}
          viewBox="0 0 100 100"
          fill="none"
        >
          <defs>
            <linearGradient id="ld-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#5a6292" />
              <stop offset="100%" stopColor="#9ea2c0" />
            </linearGradient>
          </defs>
          <circle
            cx="50" cy="50" r="48"
            stroke="url(#ld-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="90 210"
          />
        </svg>

        {/* Logo */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden z-10">
          <Image src="/logo.png" alt="IEAD" fill className="object-contain" priority />
        </div>
      </div>

      <p
        className="mt-10 text-xs font-semibold tracking-[0.3em] uppercase"
        style={{ color: "rgba(158,162,192,0.4)" }}
      >
        Carregando
      </p>
    </div>,
    document.body
  );
}