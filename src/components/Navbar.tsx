"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import SearchBar from "./SearchBar";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Cultos", href: "#cultos" },
  { label: "Devocional", href: "#devocional" },
  { label: "Eventos", href: "#eventos" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "navbar-solid" : "navbar-top"}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#inicio" onClick={(e) => handleNavClick(e, "#inicio")} className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-105">
              <Image src="/logo.png" alt="IEAD Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight text-white">IEAD</span>
              <span className="text-xs font-medium leading-tight text-white/40">Rondonópolis — MT</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 text-white/60 hover:text-white hover:bg-white/[0.06]">
                {link.label}
              </a>
            ))}
            <div className="ml-2 mr-2">
              <SearchBar />
            </div>
            <a href="#contato" onClick={(e) => handleNavClick(e, "#contato")}
              className="btn-glass-white px-5 py-2 text-dark-600 rounded-full text-sm font-semibold hover:bg-white transition-all duration-300 hover:scale-105">
              Visite-nos
            </a>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg glass-pill text-white/70 hover:text-white transition-all duration-200"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="py-4 space-y-1">
            <div className="px-4 pb-3">
              <SearchBar />
            </div>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                className="block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 text-white/60 hover:bg-white/[0.06] hover:text-white">
                {link.label}
              </a>
            ))}
            <a href="#contato" onClick={(e) => handleNavClick(e, "#contato")}
              className="block mx-4 mt-3 px-5 py-3 btn-glass-white text-dark-600 rounded-xl text-sm font-semibold text-center">
              Visite-nos
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}