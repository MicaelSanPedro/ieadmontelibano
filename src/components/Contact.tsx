"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  const [ok, setOk] = useState(false);
  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setOk(true); setTimeout(() => setOk(false), 4000); };

  const infoCards = [
    { icon: MapPin, title: "Endereço", lines: ["Bairro Monte Líbano", "Rondonópolis — MT"] },
    { icon: Phone, title: "Telefone", lines: ["(65) 3456-7890", "(65) 98765-4321", "WhatsApp"] },
    { icon: Mail, title: "E-mail", lines: ["contato@ieadmontelibano.org.br", "eventos@ieadmontelibano.org.br"] },
    { icon: Clock, title: "Secretaria", lines: ["Segunda a Sexta", "09:00 — 17:00"] },
  ];

  return (
    <section id="contato" ref={ref} className="py-20 lg:py-28 bg-dark-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-white/35 font-semibold text-sm uppercase tracking-widest">Fale Conosco</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Entre em <span className="text-white/60">Contato</span></h2>
          <div className="section-divider mb-6" />
          <p className="text-white/45 max-w-2xl mx-auto text-lg">Teremos o prazer de receber você! Entre em contato conosco para mais informações sobre nossos cultos e eventos.</p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-700 delay-200 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {infoCards.map((c, i) => (
                <div key={i} className="glass glass-hover rounded-2xl p-6">
                  <div className="relative z-10">
                    <div className="glass-icon w-12 h-12 rounded-xl flex items-center justify-center mb-4"><c.icon className="w-6 h-6 text-white/60" /></div>
                    <h3 className="font-bold text-white text-lg mb-2">{c.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{c.lines.map((l, j) => <span key={j}>{l}<br /></span>)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl overflow-hidden h-64 lg:h-72">
              <div className="relative z-10 w-full h-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=60')" }} />
                <div className="relative z-10 text-center">
                  <MapPin className="w-10 h-10 text-white/50 mx-auto mb-3" />
                  <p className="text-white font-bold text-lg">IEAD</p>
                  <p className="text-white/35 text-sm">Bairro Monte Líbano — Rondonópolis, MT</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-elevated rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="glass-icon w-10 h-10 rounded-xl flex items-center justify-center"><MessageCircle className="w-5 h-5 text-white/60" /></div>
                <div><h3 className="text-xl font-bold text-white">Envie uma Mensagem</h3><p className="text-white/35 text-sm">Preencha o formulário abaixo</p></div>
              </div>
              {ok ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="glass-icon w-16 h-16 rounded-full flex items-center justify-center mb-4"><CheckCircle className="w-8 h-8 text-white/70" /></div>
                  <h4 className="text-lg font-bold text-white mb-2">Mensagem Enviada!</h4>
                  <p className="text-white/45 text-sm">Obrigado pelo seu contato. Retornaremos em breve.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><label htmlFor="name" className="block text-sm font-semibold text-white/70 mb-2">Nome Completo</label><input type="text" id="name" required placeholder="Seu nome" className="w-full glass-input px-4 py-3 rounded-xl text-white placeholder:text-white/25 text-sm" /></div>
                    <div><label htmlFor="phone" className="block text-sm font-semibold text-white/70 mb-2">Telefone</label><input type="tel" id="phone" placeholder="(00) 00000-0000" className="w-full glass-input px-4 py-3 rounded-xl text-white placeholder:text-white/25 text-sm" /></div>
                  </div>
                  <div><label htmlFor="email" className="block text-sm font-semibold text-white/70 mb-2">E-mail</label><input type="email" id="email" required placeholder="seuemail@exemplo.com" className="w-full glass-input px-4 py-3 rounded-xl text-white placeholder:text-white/25 text-sm" /></div>
                  <div><label htmlFor="subject" className="block text-sm font-semibold text-white/70 mb-2">Assunto</label>
                    <select id="subject" required className="w-full glass-input px-4 py-3 rounded-xl text-white text-sm">
                      <option value="" className="bg-dark-500">Selecione um assunto</option>
                      <option value="info" className="bg-dark-500">Informações sobre cultos</option>
                      <option value="visita" className="bg-dark-500">Agendar uma visita pastoral</option>
                      <option value="eventos" className="bg-dark-500">Informações sobre eventos</option>
                      <option value="oracao" className="bg-dark-500">Pedido de oração</option>
                      <option value="outro" className="bg-dark-500">Outro assunto</option>
                    </select>
                  </div>
                  <div><label htmlFor="message" className="block text-sm font-semibold text-white/70 mb-2">Mensagem</label><textarea id="message" required rows={5} placeholder="Escreva sua mensagem aqui..." className="w-full glass-input px-4 py-3 rounded-xl text-white placeholder:text-white/25 text-sm resize-none" /></div>
                  <button type="submit" className="w-full btn-glass-white flex items-center justify-center gap-2 px-6 py-4 text-dark-600 rounded-xl font-semibold hover:bg-white transition-all duration-300 hover:scale-[1.02]">
                    <Send className="w-5 h-5" /> Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}