"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, BookOpen, Music, Users, Heart, Star, Sparkles, Baby } from "lucide-react";

const services = [
  { day: "Domingo", time: "09:00", title: "Escola Bíblica Dominical", description: "Momento de estudo aprofundado da Palavra de Deus, com classes para todas as faixas etárias — crianças, jovens, adultos e seniors.", icon: BookOpen, highlight: false, type: "Ensino" },
  { day: "Domingo", time: "19:00", title: "Culto de Celebração", description: "Nosso culto principal de louvor, adoração e pregação da Palavra. Um momento especial de comunhão com Deus e entre os irmãos.", icon: Sparkles, highlight: true, type: "Celebração" },
  { day: "Quarta-feira", time: "19:30", title: "Culto de Doutrina", description: "Ensinamentos fundamentais da fé cristã, baseados nas doutrinas bíblicas das Assembleias de Deus.", icon: BookOpen, highlight: false, type: "Ensino" },
  { day: "Sexta-feira", time: "19:30", title: "Culto de Oração e Louvor", description: "Uma noite dedicada à oração fervorosa e ao louvor ao Espírito Santo. Venha buscar renovação e poder espiritual.", icon: Heart, highlight: false, type: "Oração" },
  { day: "Sábado", time: "15:00", title: "Reunião de Jovens (ONJ)", description: "Encontro da Obra Nova da Juventude com louvor, palavra direcionada, atividades especiais e comunhão entre os jovens.", icon: Users, highlight: false, type: "Jovens" },
  { day: "Sábado", time: "09:00", title: "Ensaios e Ministérios", description: "Ensaio do ministério de louvor, do coral, do teatro evangelístico e preparação para os cultos da semana.", icon: Music, highlight: false, type: "Ensaios" },
];

const additionalInfo = [
  { icon: Baby, title: "Ministério Infantil", description: "Classes especiais para crianças de 0 a 11 anos durante todos os cultos." },
  { icon: Users, title: "Departamento de Jovens", description: "Atividades semanais para jovens e adolescentes a partir de 12 anos." },
  { icon: Star, title: "Senhoras (MPR)", description: "Reunião mensal das Mulheres Pentecostais Renovadas." },
  { icon: Heart, title: "Varões (MVB)", description: "Reunião mensal dos Varões do Brasil para edificação masculina." },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);

  return (
    <section id="cultos" ref={ref} className="py-20 lg:py-28 bg-dark-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-white/35 font-semibold text-sm uppercase tracking-widest">Agenda Semanal</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Nossos <span className="text-white/60">Cultos</span></h2>
          <div className="section-divider mb-6" />
          <p className="text-white/45 max-w-2xl mx-auto text-lg">Venha participar dos nossos cultos e encontros semanais. Você será muito bem-vindo!</p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 transition-all duration-700 delay-200 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          {services.map((s, i) => (
            <div key={i} className={`rounded-2xl overflow-hidden glass-hover ${s.highlight ? "glass-elevated lg:col-span-3 sm:col-span-2" : "glass"}`}>
              <div className="relative z-10 p-6 sm:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="glass-icon w-12 h-12 rounded-xl flex items-center justify-center">
                    <s.icon className={`w-6 h-6 ${s.highlight ? "text-white/80" : "text-white/50"}`} />
                  </div>
                  <span className="glass-pill px-3 py-1 rounded-full text-xs font-semibold text-white/50">{s.type}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className={`w-4 h-4 ${s.highlight ? "text-white/50" : "text-white/35"}`} />
                  <span className={`font-semibold text-sm ${s.highlight ? "text-white/60" : "text-white/45"}`}>{s.day} às {s.time}</span>
                </div>
                <p className={`text-sm leading-relaxed ${s.highlight ? "text-white/50" : "text-white/40"}`}>{s.description}</p>
                {s.highlight && (
                  <div className="mt-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
                    <span className="text-white/40 text-sm font-medium">Culto Principal — Todos são bem-vindos!</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={`transition-all duration-700 delay-400 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">Ministérios <span className="text-white/50">Especiais</span></h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalInfo.map((info, i) => (
              <div key={i} className="glass glass-hover text-center p-6 rounded-2xl">
                <div className="relative z-10">
                  <div className="glass-icon w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"><info.icon className="w-6 h-6 text-white/50" /></div>
                  <h4 className="font-bold text-white mb-2">{info.title}</h4>
                  <p className="text-white/45 text-sm leading-relaxed">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}