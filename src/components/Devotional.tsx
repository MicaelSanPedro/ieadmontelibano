"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react";

const monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const monthThemes = ["Novos Começos em Deus","O Amor Inabalável do Pai","Fé que Move Montanhas","Ressurreição e Vida Nova","A Família na Presença de Deus","O Poder do Espírito Santo","Chamado Missionário","Perseverança nas Provações","Sabedoria que Vem do Alto","Coração Grato, Vida Abundante","Intimidade na Oração","O Verbo se Fez Carne"];

type D = { ref: string; text: string; reflection: string };

const jan: D[] = [
  {ref:"Gênesis 1:1",text:"No princípio criou Deus os céus e a terra.",reflection:"Tudo começa com Deus. Neste novo ano, entregue seus planos ao Criador e permita que Ele seja o fundamento de cada passo."},
  {ref:"Jeremias 29:11",text:"Eu sei os planos que tenho para vocês, diz o Senhor, planos de dar-lhes esperança e um futuro.",reflection:"Deus já preparou um futuro de esperança para você. Confie que os planos dEle são maiores e melhores que os nossos."},
  {ref:"Isaías 43:19",text:"Eis que farei uma coisa nova, e agora sairá à luz; porventura não a sabereis?",reflection:"Deus está fazendo algo novo em sua vida. Não se prenda ao passado, mantenha os olhos abertos para a obra que Ele está realizando."},
  {ref:"Salmo 65:11",text:"Coroas o ano da tua bondade, e as tuas pegas destilam gordura.",reflection:"Que este ano seja coroado pela bondade de Deus. Cada passo seu pode deixar marcas da graça divina por onde passar."},
  {ref:"Provérbios 3:5-6",text:"Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento.",reflection:"Comece o ano depositando toda confiança no Senhor. Quando deixamos de nos apoiar na própria sabedoria, Deus nos dirige por caminhos seguros."},
  {ref:"Lamentações 3:22-23",text:"As misericórdias do Senhor são a causa de não sermos consumidos; porque as suas misericórdias não têm fim.",reflection:"Cada amanhecer traz uma nova chance da parte de Deus. Suas misericórdias se renovam diariamente, sem fim e sem medida."},
  {ref:"Filipenses 3:13-14",text:"Esquecendo-me das coisas que atrás ficam, e avançando para as que estão diante de mim, prossigo para o alvo.",reflection:"Deixe o que ficou para trás e avance com determinação. O prêmio da vocação celestial está à sua frente."},
  {ref:"2 Coríntios 5:17",text:"Se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo.",reflection:"Em Cristo, você é uma nova criação. O ano novo é uma oportunidade para viver a realidade dessa transformação."},
  {ref:"Salmo 32:8",text:"Instruir-te-ei e ensinar-te-ei o caminho que deves seguir; guiar-te-ei com os meus olhos.",reflection:"Deus promete nos guiar. Este ano, busque Sua direção em cada decisão e caminho que precisar trilhar."},
  {ref:"Josué 1:9",text:"Sê forte e corajoso. Não temas, nem te espantes, porque o Senhor teu Deus é contigo por onde quer que andares.",reflection:"Coragem não é ausência de medo, é a certeza de que Deus está ao nosso lado em cada circunstância da vida."},
  {ref:"Eclesiastes 3:1",text:"Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu.",reflection:"Confie no tempo de Deus. Ele sabe o momento certo para cada acontecimento em sua vida."},
  {ref:"Romanos 8:28",text:"Todas as coisas cooperam para o bem daqueles que amam a Deus.",reflection:"Até o que parece ruim pode cooperar para o bem quando amamos a Deus. Sua soberania transforma tudo."},
  {ref:"Salmo 1:1-2",text:"Bem-aventurado o homem que não anda segundo o conselho dos ímpios, mas tem o seu prazer na lei do Senhor.",reflection:"A verdadeira felicidade está em meditar na Palavra de Deus dia e noite. Comece o ano com esta base sólida."},
  {ref:"Isaías 40:31",text:"Os que esperam no Senhor renovarão as suas forças; subirão com asas como águias.",reflection:"Quando a energia acabar, espere no Senhor. Ele renova nossas forças e nos dá asas para voar acima dos problemas."},
  {ref:"Mateus 6:33",text:"Buscai primeiro o Reino de Deus e a sua justiça, e todas essas coisas vos serão acrescentadas.",reflection:"Priorize Deus em tudo. Quando o Reino está em primeiro lugar, Ele cuida de cada detalhe da nossa vida."},
  {ref:"Deuteronômio 31:8",text:"O Senhor é quem vai adiante de ti; ele será contigo, não te deixará nem te desamparará.",reflection:"Deus vai à sua frente. Você não caminha sozinho — o Todo-Poderoso abre o caminho antes de você."},
  {ref:"Salmo 37:5",text:"Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.",reflection:"Entregar não é desistir, é confiar. Quando colocamos nosso caminho nas mãos de Deus, Ele assume o controle."},
  {ref:"Isaías 26:3",text:"Tu conservarás em paz aquele cuja mente está firme em ti.",reflection:"A paz de Deus guarda aqueles que mantêm a mente nEle. Em meio ao caos, a firmeza em Deus traz tranquilidade."},
  {ref:"Tiago 1:5",text:"Se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente.",reflection:"Sabedoria é um presente que Deus deseja conceder. Peça com fé e Ele transformará suas decisões."},
  {ref:"Salmo 23:1",text:"O Senhor é o meu pastor; nada me faltará.",reflection:"Com Deus como pastor, a falta dá lugar à provisão. Confie que Ele supre cada necessidade."},
  {ref:"João 1:1-2",text:"No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.",reflection:"Cristo é o princípio de tudo. Ao iniciar qualquer projeto, coloque Jesus como o fundamento."},
  {ref:"Provérbios 16:3",text:"Confia ao Senhor as tuas obras, e os teus planos serão estabelecidos.",reflection:"Seus planos se consolidam quando são entregues a Deus. Trabalhe duro, mas confie o resultado ao Senhor."},
  {ref:"Romanos 15:13",text:"O Deus da esperança vos encha de todo o gozo e paz em crença.",reflection:"Que a esperança de Deus transborde em alegria e paz em seu coração durante todo este ano."},
  {ref:"Salmo 118:24",text:"Este é o dia que fez o Senhor; regozijemo-nos e alegremo-nos nele.",reflection:"Cada dia é um presente de Deus. Alegre-se não apenas nos dias bons, mas em cada dia que Ele lhe concede."},
  {ref:"Efésios 2:10",text:"Somos feitura sua, criados em Cristo Jesus para boas obras.",reflection:"Você foi criado com propósito. As boas obras que Deus preparou para você estão esperando para serem realizadas."},
  {ref:"Hebreus 12:1-2",text:"Corramos com perseverança a carreira que nos está proposta, olhando para Jesus.",reflection:"A vida cristã é uma maratona. Mantenha os olhos em Jesus e não desista no caminho."},
  {ref:"1 Pedro 5:7",text:"Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",reflection:"Não carregue pesos que não são seus. Deus se importa com você e quer levar suas preocupações."},
  {ref:"Salmo 90:12",text:"Ensina-nos a contar os nossos dias, para que alcancemos coração sábio.",reflection:"Que possamos valorizar cada dia como um dom precioso e usá-lo com sabedoria para a glória de Deus."},
  {ref:"Apocalipse 21:5",text:"Eis que faço novas todas as coisas.",reflection:"Deus é especialista em recomeços. Confie que Ele pode fazer novas todas as coisas em sua vida."},
  {ref:"Números 6:24-26",text:"O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti.",reflection:"Que a benção sacerdotal esteja sobre sua vida. O rosto de Deus brilha sobre aqueles que O buscam de coração."},
  {ref:"Salmo 91:1",text:"Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.",reflection:"Habitar no esconderijo de Deus é estar seguro. Faça do Senhor sua morada permanente neste novo ano."},
];

const feb: D[] = [
  {ref:"João 3:16",text:"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",reflection:"O amor de Deus é imensurável. Ele não apenas disse que nos amava, mas provou dando o que tinha de mais precioso."},
  {ref:"1 João 4:8",text:"Aquele que não ama não conhece a Deus, porque Deus é amor.",reflection:"Deus não apenas tem amor — Ele é amor. Conhecer a Deus é experimentar o amor mais puro e transformador."},
  {ref:"Romanos 5:8",text:"Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.",reflection:"O amor de Deus não depende do que somos ou fazemos. Ele nos amou quando ainda éramos pecadores — isso é graça."},
  {ref:"1 Coríntios 13:4-7",text:"O amor é sofredor, é benigno; o amor não é invejoso; não trata com leviandade.",reflection:"O amor verdadeiro descrito por Paulo vai além de sentimento — é atitude, é ação, é entrega diária."},
  {ref:"Salmo 36:5-7",text:"A tua misericórdia, Senhor, estende-se até os céus, e a tua fidelidade até às nuvens.",reflection:"A misericórdia de Deus é infinita e inabalável. Nela encontramos refúgio seguro para cada dia."},
  {ref:"Romanos 8:38-39",text:"Nada nos separará do amor de Deus que está em Cristo Jesus.",reflection:"Nenhuma circunstância, nenhum poder pode nos separar do amor de Deus. Esta é a segurança eterna."},
  {ref:"1 João 4:19",text:"Nós amamos porque ele nos amou primeiro.",reflection:"Nosso amor é resposta ao amor de Deus. Ele nos amou primeiro, e essa iniciativa divina transforma nossos corações."},
  {ref:"Jeremias 31:3",text:"Com amor eterno te amei; por isso com benignidade te atraí.",reflection:"O amor de Deus é eterno — não muda, não acaba, não falha. É esse amor que nos atrai para Ele."},
  {ref:"Cantares 8:7",text:"As muitas águas não poderiam apagar o amor, nem os rios afogá-lo.",reflection:"Nada pode apagar o amor de Deus por você. Nem as maiores dificuldades da vida podem sufocar esse amor."},
  {ref:"Efésios 3:17-19",text:"Para que vós, arraigados e alicerçados em amor, possais compreender a largura, o comprimento, a altura e a profundidade do amor de Cristo.",reflection:"O amor de Cristo é tão vasto que transcende nossa compreensão. Quanto mais o buscamos, mais dele desfrutamos."},
  {ref:"Zacarias 2:8",text:"Aquele que tocar em vós toca na menina do seu olho.",reflection:"Deus tem um cuidado tão especial por você como se fosse a menina dos Seus olhos. Você é preciosíssimo para Ele."},
  {ref:"Salmo 86:15",text:"Tu, Senhor, és um Deus compassivo e misericordioso, longânimo e grande em benignidade e verdade.",reflection:"A compaixão de Deus é infinita. Ele é paciente, misericordioso e cheio de verdade — podemos confiar plenamente nEle."},
  {ref:"Oséias 11:4",text:"Eu os atraí com cordas humanas, com laços de amor.",reflection:"Deus nos atrai com amor, não com força. Seus laços são gentis, suas cordas são de bondade."},
  {ref:"João 15:9",text:"Como o Pai me amou, assim também eu vos amei; permanecei no meu amor.",reflection:"Jesus nos ama com o mesmo amor com que o Pai O ama. Permanecer nesse amor é a maior segurança."},
  {ref:"Salmo 103:8",text:"Misericordioso e piedoso é o Senhor; longânimo e grande em benignidade.",reflection:"A paciência de Deus é uma das maiores demonstrações do Seu amor. Ele nos dá tempo para voltarmos a Ele."},
  {ref:"Gálatas 2:20",text:"Eu fui crucificado com Cristo; e vivo, não mais eu, mas Cristo vive em mim.",reflection:"A vida cristã é Cristo vivendo em nós. Seu amor sacrificial nos dá uma nova identidade e propósito."},
  {ref:"Deuteronômio 7:8",text:"Mas porque o Senhor vos amava.",reflection:"A escolha de Deus por você não foi por mérito, foi por amor puro e gratuito. Medite nesta verdade transformadora."},
  {ref:"Isaías 54:10",text:"Os montes se retirarão, e os outeiros serão abalados, mas a minha benignidade não se apartará de ti.",reflection:"A natureza inteira pode tremer, mas o amor de Deus permanece firme e inabalável sobre sua vida."},
  {ref:"1 João 3:1",text:"Vede quão grande amor nos tem concedido o Pai: que fôssemos chamados filhos de Deus.",reflection:"O maior privilégio do cristão é ser filho de Deus. Isso não é mérito nosso, é graça pura."},
  {ref:"Romanos 5:5",text:"O amor de Deus está derramado em nossos corações pelo Espírito Santo que nos foi dado.",reflection:"O Espírito Santo é quem nos faz experimentar o amor de Deus de forma real e profunda em nosso íntimo."},
  {ref:"Mateus 22:37-39",text:"Amarás o Senhor teu Deus de todo o teu coração... e amarás o teu próximo como a ti mesmo.",reflection:"O grande mandamento resume toda a fé: amar a Deus sobre tudo e estender esse amor ao próximo."},
  {ref:"Colossenses 3:14",text:"E, sobre tudo isto, revesti-vos de amor, que é o vínculo da perfeição.",reflection:"O amor é o que une tudo. Quando nos vestimos de amor, todas as outras virtudes se completam."},
  {ref:"Salmo 139:17-18",text:"Quão preciosos me são, ó Deus, os teus pensamentos! Quão grandes são as somas deles!",reflection:"Deus pensa em você constantemente. Seus pensamentos a seu respeito são inúmeros e preciosos."},
  {ref:"1 Tessalonicenses 5:8",text:"Mas nós, que somos do dia, sejamos sóbrios, vestindo-nos da couraça da fé e do amor.",reflection:"A fé e o amor são nossa proteção diária. Vestir-se deles é estar preparado para qualquer batalha."},
  {ref:"João 13:34-35",text:"Um novo mandamento vos dou: que vos ameis uns aos outros.",reflection:"O sinal de um verdadeiro discípulo não é apenas o que sabe, mas como ama. O amor é nossa marca registrada."},
  {ref:"Salmo 117:2",text:"Porque a sua benignidade é grande para conosco, e a verdade do Senhor dura para sempre.",reflection:"A bondade de Deus é imensa e Sua verdade é eterna. Nestas duas verdades encontramos toda segurança."},
  {ref:"1 Pedro 4:8",text:"Mas, sobretudo, tende ardente amor uns para com os outros, porque o amor cobrirá a multidão de pecados.",reflection:"O amor tem poder para curar relacionamentos e cobrir ofensas. Pratique o amor ardente e veja a transformação."},
  {ref:"Romanos 12:9-10",text:"O amor seja sem fingimento. Amai-vos cordialmente uns aos outros com amor fraternal.",reflection:"O amor verdadeiro não é fingido. Seja autêntico em suas relações e demonstre afeto genuíno."},
  {ref:"Salmo 136:1",text:"Louvai ao Senhor, porque ele é bom, porque a sua misericórdia dura para sempre.",reflection:"A misericórdia de Deus é eterna. Por isso, nosso louvor também deve ser constante e inabalável."},
];

function getDevotional(month: number, day: number): D {
  const m: D[][] = [jan, feb];
  const fb = { ref: "Salmo 119:105", text: "Lâmpada para os meus pés é tua palavra e luz para o meu caminho.", reflection: "A Palavra de Deus ilumina cada passo do nosso caminho. Busque nela direção e sabedoria para cada dia." };
  if (month >= 1 && month <= m.length) { const d = m[month - 1]; if (day >= 1 && day <= d.length) return d[day - 1]; }
  return fb;
}

function getDaysInMonth(month: number) { return new Date(2026, month, 0).getDate(); }
function getFirstDayOfMonth(month: number) { return new Date(2026, month - 1, 1).getDay(); }

export default function Devotional() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  const now = new Date();
  const [sm, setSm] = useState(now.getMonth() + 1);
  const [sd, setSd] = useState<number | null>(null);

  useEffect(() => { const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 }); if (ref.current) o.observe(ref.current); return () => o.disconnect(); }, []);

  const dim = getDaysInMonth(sm), fd = getFirstDayOfMonth(sm);
  const days: (number | null)[] = [];
  for (let i = 0; i < fd; i++) days.push(null);
  for (let d = 1; d <= dim; d++) days.push(d);

  const dev = sd !== null ? getDevotional(sm, sd) : null;

  return (
    <section id="devocional" ref={ref} className="py-20 lg:py-28 bg-dark-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-white/35 font-semibold text-sm uppercase tracking-widest">Alimento Diário</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Devocional <span className="text-white/60">Anual</span></h2>
          <div className="section-divider mb-6" />
          <p className="text-white/45 max-w-2xl mx-auto text-lg">Uma palavra de Deus para cada dia do ano. Selecione o mês e clique no dia para ler sua meditação.</p>
        </div>

        <div className={`flex items-center justify-center gap-4 mb-10 transition-all duration-700 delay-200 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <button onClick={() => setSm(m => m === 1 ? 12 : m - 1)} className="glass-pill w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] transition-all duration-200" aria-label="Anterior"><ChevronLeft className="w-5 h-5" /></button>
          <div className="text-center min-w-[260px]">
            <h3 className="text-xl sm:text-2xl font-bold text-white">{monthNames[sm - 1]}</h3>
            <p className="text-white/35 text-sm mt-1">{monthThemes[sm - 1]}</p>
          </div>
          <button onClick={() => setSm(m => m === 12 ? 1 : m + 1)} className="glass-pill w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] transition-all duration-200" aria-label="Próximo"><ChevronRight className="w-5 h-5" /></button>
        </div>

        <div className={`max-w-3xl mx-auto mb-10 transition-all duration-700 delay-300 ${v ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map(d => (
              <div key={d} className="text-center text-white/25 text-xs font-semibold py-2 uppercase tracking-wider">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((day, i) => {
              const isToday = day === now.getDate() && sm === now.getMonth() + 1;
              const isSel = day === sd;
              return (
                <button key={i} disabled={!day} onClick={() => day && setSd(day)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    !day ? "cursor-default" :
                    isSel ? "bg-white text-dark-600 shadow-lg shadow-white/10 scale-105" :
                    isToday ? "glass-elevated text-white border-white/[0.12]" :
                    "glass text-white/50 hover:text-white hover:bg-white/[0.06]"
                  }`}>
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {dev && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in" onClick={() => setSd(null)}>
            <div className="glass-elevated rounded-3xl max-w-lg w-full p-8 sm:p-10 relative animate-fade-in-up" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSd(null)} className="absolute top-4 right-4 glass-pill w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all duration-200" aria-label="Fechar"><X className="w-4 h-4" /></button>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="btn-glass-white w-12 h-12 rounded-xl flex items-center justify-center">
                    <span className="text-dark-600 font-bold text-lg">{dev.ref.match(/\d+/)?.[0] || sd}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{sd} de {monthNames[sm - 1]}</p>
                    <p className="text-white/35 text-sm">{monthThemes[sm - 1]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3"><BookOpen className="w-4 h-4 text-white/40" /><span className="text-white/40 text-sm font-semibold">{dev.ref}</span></div>
                <blockquote className="text-white/75 text-base leading-relaxed mb-6 pl-4 border-l-2 border-white/15 italic">&ldquo;{dev.text}&rdquo;</blockquote>
                <div className="glass rounded-xl p-5">
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Reflexão</p>
                  <p className="text-white/60 text-sm leading-relaxed">{dev.reflection}</p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
                  <button onClick={() => setSd(Math.max(1, (sd || 1) - 1))} disabled={(sd || 1) <= 1} className="flex items-center gap-1 text-white/35 hover:text-white text-sm disabled:opacity-20 transition-colors"><ChevronLeft className="w-4 h-4" /> Anterior</button>
                  <button onClick={() => setSd(Math.min(dim, (sd || 1) + 1))} disabled={(sd || 1) >= dim} className="flex items-center gap-1 text-white/35 hover:text-white text-sm disabled:opacity-20 transition-colors">Próximo <ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}