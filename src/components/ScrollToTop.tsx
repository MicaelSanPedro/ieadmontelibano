"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-[9999]"
      style={{ background: "rgba(255,255,255,0.92)" }}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="w-5 h-5" style={{ color: "#050a14" }} />
    </button>,
    document.body
  );
}