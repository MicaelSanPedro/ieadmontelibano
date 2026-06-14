"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Heart, Users, Globe } from "lucide-react";

const values = [
  { icon: BookOpen, title: "Palavra de Deus", description: "Fundamentados nas Sagradas Escrituras como nossa regra de fé e prática, buscamos a cada dia conhecer mais do Senhor através da Sua Palavra." },
  { icon: Heart, title: "Amor e Compaixão", description: "Acolhemos a todos com o amor de Cristo, sem distinção ou preconceito, pois cremos que cada pessoa é preciosidade aos olhos de Deus." },
  { icon: Users, title: "Comunhão", description: "Vivemos em comunidade, cuidando uns dos outros como família espiritual, compartilhando alegrias e fardos no amor do Senhor." },
  { icon: Globe, title: "Missões", description: "Comprometidos com a Grande Comissão, levando o Evangelho a todas as nações, começando pelo nosso bairro até os confins da terra." },
];

const team = [
  { name: "Pr. Valdomiro", role: "Pastor Titular", description: "Pastor titular da IEAD, dedicado ao ensino da Palavra de Deus e ao pastoreio fiel das ovelhas do Senhor em Rondonópolis. Com amor e sabedoria, lidera a igreja na busca pela presença de Deus." },
  { name: "Isabel", role: "Esposa do Pastor", description: "Dedicada ao ministério feminino, lidera o departamento de senhoras e apoia a obra pastoral com amor, sabedoria e excelência, sendo exemplo de serva do Senhor." },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);

  return (
    <section id="sobre" ref={ref} className="py-20 lg:py-28 bg-dark-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-white/35 font-semibold text-sm uppercase tracking-widest">Quem Somos</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Sobre a <span className="text-white/60">IEAD</span></h2>
          <div className="section-divider mb-6" />
        </div>

        {/* History */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center mb-20 transition-all duration-700 delay-200 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Nossa <span className="text-white/50">História</span></h3>
            <div className="space-y-4 text-white/55 leading-relaxed">
              <p>A Igreja Evangélica Assembleia de Deus no bairro Monte Líbano, em Rondonópolis — MT, teve início quando um pequeno grupo de irmãos cheios do Espírito Santo se reuniu para orar e adorar ao Senhor. Desde então, Deus tem abençoado grandemente a obra, transformando vidas e famílias na comunidade.</p>
              <p>Com o passar dos anos, aquela pequena congregação cresceu e se tornou uma referência na comunidade do Monte Líbano e em toda Rondonópolis. Hoje, somos uma igreja vibrante e acolhedora, com membros que se reúnem semanalmente para glorificar o nome de Jesus e buscar Sua face.</p>
              <p>Localizada no coração do bairro Monte Líbano, nossa igreja serve a comunidade com amor e dedicação, levando a Palavra de Deus e o conforto do Espírito Santo a todas as famílias da região, sendo uma luz em meio às trevas.</p>
            </div>
          </div>
          <div className="relative">
            <div className="glass rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80')" }} />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-white/[0.06] rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-white/[0.06] rounded-2xl -z-10" />
          </div>
        </div>

        {/* Values */}
        <div className={`mb-20 transition-all duration-700 delay-400 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">Nossos <span className="text-white/50">Valores</span></h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <div key={i} className="glass glass-hover rounded-2xl p-6 text-center">
                <div className="relative z-10">
                  <div className="glass-icon w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"><val.icon className="w-7 h-7 text-white/60" /></div>
                  <h4 className="font-bold text-white text-lg mb-2">{val.title}</h4>
                  <p className="text-white/45 text-sm leading-relaxed">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pastors */}
        <div className={`transition-all duration-700 delay-500 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Nossa <span className="text-white/50">Liderança Pastoral</span></h3>
          <div className="section-divider mb-12" />
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((m, i) => (
              <div key={i} className="glass glass-hover rounded-2xl overflow-hidden">
                <div className="relative z-10">
                  <div className="h-52 bg-gradient-to-br from-white/[0.04] to-transparent flex items-center justify-center">
                    <div className="glass-icon w-24 h-24 rounded-full flex items-center justify-center border border-white/[0.08]">
                      <span className="text-3xl font-bold text-white/50">{m.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="font-bold text-white text-lg">{m.name}</h4>
                    <p className="text-white/35 font-medium text-sm mb-3">{m.role}</p>
                    <p className="text-white/45 text-sm leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}