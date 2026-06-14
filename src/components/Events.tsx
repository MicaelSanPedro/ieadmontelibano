"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Clock, Music, BookOpen, Heart, Users, Star, Gift, Coffee, Mic } from "lucide-react";

const upcomingEvents = [
  { date: "15", month: "FEV", title: "Conferência de Avivamento", description: "Três dias de pregação da Palavra, louvor poderoso e oração fervorosa com pastores convidados de todo o Brasil.", time: "19:30", location: "Templo Principal", icon: Star, featured: true, tag: "Destaque" },
  { date: "22", month: "FEV", title: "Culto de Ação de Graças", description: "Uma noite especial para agradecer a Deus pelas bênçãos recebidas. Venha com sua família!", time: "19:00", location: "Templo Principal", icon: Heart, featured: false, tag: "Culto" },
  { date: "08", month: "MAR", title: "Encontro de Casais", description: "Palestra especial para casais com temas sobre família, amor e comunhão conjugal à luz da Bíblia.", time: "15:00", location: "Salão de Eventos", icon: Users, featured: false, tag: "Família" },
  { date: "15", month: "MAR", title: "Festival de Louvor Jovem", description: "ONJ! Uma noite de louvor inesquecível com a presença de bandas convidadas.", time: "19:30", location: "Templo Principal", icon: Music, featured: false, tag: "Jovens" },
  { date: "22", month: "MAR", title: "Escola Bíblica de Férias", description: "Atividades especiais para crianças durante as férias escolares com palestras, brincadeiras e muita diversão.", time: "08:00", location: "Salão Infantil", icon: BookOpen, featured: false, tag: "Crianças" },
  { date: "05", month: "ABR", title: "Vigília de Oração", description: "Uma vigília especial dedicada à intercessão pela igreja, família e nação.", time: "22:00", location: "Templo Principal", icon: Heart, featured: false, tag: "Oração" },
  { date: "12", month: "ABR", title: "Seminário de Liderança", description: "Treinamento para líderes de célula, diáconos e obreiros sobre liderança cristã e serviço.", time: "09:00", location: "Sala de Ensino", icon: BookOpen, featured: false, tag: "Ensino" },
  { date: "20", month: "ABR", title: "Culto da Mulher Virtuosa", description: "Celebração especial do Ministério de Senhoras com louvor, pregação e café da manhã.", time: "09:00", location: "Salão de Eventos", icon: Coffee, featured: false, tag: "Senhoras" },
];

const pastHighlights = [
  { title: "Retiro Espiritual 2024", description: "Três dias de renovação espiritual no sítio da igreja.", icon: Gift },
  { title: "Congresso de Jovens", description: "ONJ com mais de 300 jovens presentes.", icon: Mic },
  { title: "Batismo em Águas", description: "Cerimônia especial com mais de 40 novos convertidos.", icon: Heart },
];

export default function Events() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);

  return (
    <section id="eventos" ref={ref} className="py-20 lg:py-28 bg-dark-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-white/35 font-semibold text-sm uppercase tracking-widest">Calendário</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Próximos <span className="text-white/60">Eventos</span></h2>
          <div className="section-divider mb-6" />
          <p className="text-white/45 max-w-2xl mx-auto text-lg">Confira nossa agenda de eventos especiais e programe-se para participar. Todos são bem-vindos!</p>
        </div>

        {/* Featured */}
        <div className={`mb-12 transition-all duration-700 delay-200 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          {upcomingEvents.filter(e => e.featured).map((ev, i) => (
            <div key={i} className="glass-elevated glass-hover rounded-3xl overflow-hidden">
              <div className="relative z-10 p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="btn-glass-white w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-dark-600 font-bold text-2xl sm:text-3xl block leading-none">{ev.date}</span>
                      <span className="text-dark-600/70 font-semibold text-xs sm:text-sm uppercase">{ev.month}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="glass-pill px-3 py-1 rounded-full text-xs font-semibold text-white/50 mb-3 inline-block">{ev.tag}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">{ev.title}</h3>
                  <p className="text-white/50 leading-relaxed mb-4 max-w-2xl">{ev.description}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-white/35"><Clock className="w-4 h-4 text-white/50" /><span className="text-sm">{ev.time}</span></div>
                    <div className="flex items-center gap-2 text-white/35"><MapPin className="w-4 h-4 text-white/50" /><span className="text-sm">{ev.location}</span></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 transition-all duration-700 delay-300 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          {upcomingEvents.filter(e => !e.featured).map((ev, i) => (
            <div key={i} className="glass glass-hover rounded-2xl overflow-hidden">
              <div className="relative z-10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="glass-icon w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="text-center">
                        <span className="text-white/70 font-bold text-lg block leading-none">{ev.date}</span>
                        <span className="text-white/35 font-semibold text-[10px] uppercase">{ev.month}</span>
                      </div>
                    </div>
                    <div className="glass-icon w-10 h-10 rounded-lg flex items-center justify-center"><ev.icon className="w-5 h-5 text-white/50" /></div>
                  </div>
                  <span className="glass-pill px-2.5 py-1 rounded-full text-xs font-semibold text-white/45">{ev.tag}</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{ev.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{ev.description}</p>
                <div className="flex items-center gap-4 text-white/30 text-sm">
                  <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /><span>{ev.time}</span></div>
                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /><span>{ev.location}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Past Highlights */}
        <div className={`glass rounded-3xl p-8 sm:p-12 transition-all duration-700 delay-500 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8"><Calendar className="w-6 h-6 text-white/50" /><h3 className="text-2xl font-bold text-white">Momentos <span className="text-white/50">Especiais</span></h3></div>
            <div className="grid sm:grid-cols-3 gap-6">
              {pastHighlights.map((item, i) => (
                <div key={i} className="glass rounded-xl p-4 flex items-start gap-4">
                  <div className="glass-icon w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"><item.icon className="w-5 h-5 text-white/50" /></div>
                  <div><h4 className="font-bold text-white text-sm">{item.title}</h4><p className="text-white/40 text-xs leading-relaxed mt-1">{item.description}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}