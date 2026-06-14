"use client";

import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 btn-glass-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 z-50"
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="w-5 h-5 text-dark-600" />
    </button>
  );
}