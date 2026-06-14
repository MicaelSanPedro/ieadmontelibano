"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, ArrowRight, BookOpen, Clock, Calendar, MapPin, Users, Heart, Star, Church, Sparkles, Music, Baby, ChevronRight } from "lucide-react";

/* =============================================
   SEARCH INDEX — All site content
   ============================================= */

type SearchResult = {
  id: string;
  title: string;
  description: string;
  section: string;
  href: string;
  icon: React.ReactNode;
  category: string;
};

const searchIndex: SearchResult[] = [
  // ---- NAVIGATION / SECTIONS ----
  { id: "nav-1", title: "Início", description: "Página inicial com boas-vindas à IEAD Monte Líbano", section: "Início", href: "#inicio", icon: <Church className="w-4 h-4" />, category: "Navegação" },
  { id: "nav-2", title: "Sobre Nós", description: "Conheça a história, visão, missão e valores da IEAD", section: "Sobre Nós", href: "#sobre", icon: <Users className="w-4 h-4" />, category: "Navegação" },
  { id: "nav-3", title: "Cultos", description: "Horários e informações dos cultos semanais", section: "Cultos", href: "#cultos", icon: <Clock className="w-4 h-4" />, category: "Navegação" },
  { id: "nav-4", title: "Devocional Anual", description: "Palavra de Deus para cada dia do ano", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Navegação" },
  { id: "nav-5", title: "Eventos", description: "Próximos eventos e programações especiais", section: "Eventos", href: "#eventos", icon: <Calendar className="w-4 h-4" />, category: "Navegação" },
  { id: "nav-6", title: "Contato", description: "Endereço, telefone, e-mail e formulário de contato", section: "Contato", href: "#contato", icon: <MapPin className="w-4 h-4" />, category: "Navegação" },

  // ---- ABOUT ----
  { id: "about-1", title: "Nossa História", description: "A IEAD no bairro Monte Líbano começou com um pequeno grupo de irmãos cheios do Espírito Santo. Hoje é uma igreja vibrante e acolhedora em Rondonópolis — MT.", section: "Sobre Nós", href: "#sobre", icon: <Church className="w-4 h-4" />, category: "Sobre" },
  { id: "about-2", title: "Nossa Visão", description: "Ser uma igreja referência na pregação do Evangelho pleno, formando discípulos comprometidos com Cristo e capacitados para impactar a sociedade.", section: "Sobre Nós", href: "#sobre", icon: <Star className="w-4 h-4" />, category: "Sobre" },
  { id: "about-3", title: "Nossa Missão", description: "Adorar a Deus em espírito e em verdade, proclamar as boas novas da salvação em Jesus Cristo, edificar os santos na fé e servir ao próximo.", section: "Sobre Nós", href: "#sobre", icon: <Church className="w-4 h-4" />, category: "Sobre" },
  { id: "about-4", title: "Palavra de Deus (Valor)", description: "Fundamentados nas Sagradas Escrituras como nossa regra de fé e prática, buscamos a cada dia conhecer mais do Senhor.", section: "Sobre Nós", href: "#sobre", icon: <BookOpen className="w-4 h-4" />, category: "Valores" },
  { id: "about-5", title: "Amor e Compaixão (Valor)", description: "Acolhemos a todos com o amor de Cristo, sem distinção ou preconceito, pois cada pessoa é preciosidade aos olhos de Deus.", section: "Sobre Nós", href: "#sobre", icon: <Heart className="w-4 h-4" />, category: "Valores" },
  { id: "about-6", title: "Comunhão (Valor)", description: "Vivemos em comunidade, cuidando uns dos outros como família espiritual, compartilhando alegrias e fardos no amor do Senhor.", section: "Sobre Nós", href: "#sobre", icon: <Users className="w-4 h-4" />, category: "Valores" },
  { id: "about-7", title: "Missões (Valor)", description: "Comprometidos com a Grande Comissão, levando o Evangelho a todas as nações, começando pelo nosso bairro até os confins da terra.", section: "Sobre Nós", href: "#sobre", icon: <Star className="w-4 h-4" />, category: "Valores" },

  // ---- PASTORS ----
  { id: "team-1", title: "Pr. Valdomiro", description: "Pastor titular da IEAD, dedicado ao ensino da Palavra de Deus e ao pastoreio fiel das ovelhas do Senhor em Rondonópolis.", section: "Sobre Nós", href: "#sobre", icon: <Users className="w-4 h-4" />, category: "Liderança" },
  { id: "team-2", title: "Isabel", description: "Esposa do Pastor, dedicada ao ministério feminino, lidera o departamento de senhoras e apoia a obra pastoral com amor e sabedoria.", section: "Sobre Nós", href: "#sobre", icon: <Users className="w-4 h-4" />, category: "Liderança" },

  // ---- SERVICES ----
  { id: "svc-1", title: "Escola Bíblica Dominical", description: "Domingo às 09:00 — Estudo aprofundado da Palavra de Deus, com classes para todas as faixas etárias.", section: "Cultos", href: "#cultos", icon: <BookOpen className="w-4 h-4" />, category: "Cultos" },
  { id: "svc-2", title: "Culto de Celebração", description: "Domingo às 19:00 — Nosso culto principal de louvor, adoração e pregação da Palavra. Culto Principal.", section: "Cultos", href: "#cultos", icon: <Sparkles className="w-4 h-4" />, category: "Cultos" },
  { id: "svc-3", title: "Culto de Doutrina", description: "Quarta-feira às 19:30 — Ensinamentos fundamentais da fé cristã baseados nas doutrinas bíblicas das Assembleias de Deus.", section: "Cultos", href: "#cultos", icon: <BookOpen className="w-4 h-4" />, category: "Cultos" },
  { id: "svc-4", title: "Culto de Oração e Louvor", description: "Sexta-feira às 19:30 — Noite dedicada à oração fervorosa e ao louvor ao Espírito Santo.", section: "Cultos", href: "#cultos", icon: <Heart className="w-4 h-4" />, category: "Cultos" },
  { id: "svc-5", title: "Reunião de Jovens (ONJ)", description: "Sábado às 15:00 — Obra Nova da Juventude com louvor, palavra direcionada e comunhão entre os jovens.", section: "Cultos", href: "#cultos", icon: <Users className="w-4 h-4" />, category: "Cultos" },
  { id: "svc-6", title: "Ensaios e Ministérios", description: "Sábado às 09:00 — Ensaio do ministério de louvor, coral, teatro evangelístico e preparação para os cultos.", section: "Cultos", href: "#cultos", icon: <Music className="w-4 h-4" />, category: "Cultos" },

  // ---- MINISTRIES ----
  { id: "min-1", title: "Ministério Infantil", description: "Classes especiais para crianças de 0 a 11 anos durante todos os cultos.", section: "Cultos", href: "#cultos", icon: <Baby className="w-4 h-4" />, category: "Ministérios" },
  { id: "min-2", title: "Departamento de Jovens", description: "Atividades semanais para jovens e adolescentes a partir de 12 anos.", section: "Cultos", href: "#cultos", icon: <Users className="w-4 h-4" />, category: "Ministérios" },
  { id: "min-3", title: "Senhoras (MPR)", description: "Reunião mensal das Mulheres Pentecostais Renovadas.", section: "Cultos", href: "#cultos", icon: <Star className="w-4 h-4" />, category: "Ministérios" },
  { id: "min-4", title: "Varões (MVB)", description: "Reunião mensal dos Varões do Brasil para edificação masculina.", section: "Cultos", href: "#cultos", icon: <Users className="w-4 h-4" />, category: "Ministérios" },

  // ---- DEVOTIONAL — January ----
  { id: "dev-jan-1", title: "Gênesis 1:1", description: "No princípio criou Deus os céus e a terra. — Tudo começa com Deus. Neste novo ano, entregue seus planos ao Criador.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-2", title: "Jeremias 29:11", description: "Eu sei os planos que tenho para vocês, diz o Senhor, planos de dar-lhes esperança e um futuro.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-3", title: "Isaías 43:19", description: "Eis que farei uma coisa nova, e agora sairá à luz. — Deus está fazendo algo novo em sua vida.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-4", title: "Salmo 65:11", description: "Coroas o ano da tua bondade, e as tuas pegas destilam gordura.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-5", title: "Provérbios 3:5-6", description: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-6", title: "Lamentações 3:22-23", description: "As misericórdias do Senhor são a causa de não sermos consumidos; porque as suas misericórdias não têm fim.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-7", title: "Filipenses 3:13-14", description: "Esquecendo-me das coisas que atrás ficam, e avançando para as que estão diante de mim, prossigo para o alvo.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-8", title: "2 Coríntios 5:17", description: "Se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-9", title: "Salmo 32:8", description: "Instruir-te-ei e ensinar-te-ei o caminho que deves seguir; guiar-te-ei com os meus olhos.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-10", title: "Josué 1:9", description: "Sê forte e corajoso. Não temas, nem te espantes, porque o Senhor teu Deus é contigo.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-11", title: "Eclesiastes 3:1", description: "Tudo tem o seu tempo determinado, e há tempo para todo o propósito debaixo do céu.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-12", title: "Romanos 8:28", description: "Todas as coisas cooperam para o bem daqueles que amam a Deus.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-13", title: "Salmo 1:1-2", description: "Bem-aventurado o homem que não anda segundo o conselho dos ímpios, mas tem o seu prazer na lei do Senhor.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-14", title: "Isaías 40:31", description: "Os que esperam no Senhor renovarão as suas forças; subirão com asas como águias.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-15", title: "Mateus 6:33", description: "Buscai primeiro o Reino de Deus e a sua justiça, e todas essas coisas vos serão acrescentadas.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-16", title: "Deuteronômio 31:8", description: "O Senhor é quem vai adiante de ti; ele será contigo, não te deixará nem te desamparará.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-17", title: "Salmo 37:5", description: "Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-18", title: "Isaías 26:3", description: "Tu conservarás em paz aquele cuja mente está firme em ti.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-19", title: "Tiago 1:5", description: "Se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-20", title: "Salmo 23:1", description: "O Senhor é o meu pastor; nada me faltará.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-21", title: "João 1:1-2", description: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-22", title: "Provérbios 16:3", description: "Confia ao Senhor as tuas obras, e os teus planos serão estabelecidos.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-23", title: "Romanos 15:13", description: "O Deus da esperança vos encha de todo o gozo e paz em crença.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-24", title: "Salmo 118:24", description: "Este é o dia que fez o Senhor; regozijemo-nos e alegremo-nos nele.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-25", title: "Efésios 2:10", description: "Somos feitura sua, criados em Cristo Jesus para boas obras.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-26", title: "Hebreus 12:1-2", description: "Corramos com perseverança a carreira que nos está proposta, olhando para Jesus.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-27", title: "1 Pedro 5:7", description: "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-28", title: "Salmo 90:12", description: "Ensina-nos a contar os nossos dias, para que alcancemos coração sábio.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-29", title: "Apocalipse 21:5", description: "Eis que faço novas todas as coisas.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-30", title: "Números 6:24-26", description: "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-jan-31", title: "Salmo 91:1", description: "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },

  // ---- DEVOTIONAL — February ----
  { id: "dev-feb-1", title: "João 3:16", description: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-2", title: "1 João 4:8", description: "Aquele que não ama não conhece a Deus, porque Deus é amor.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-3", title: "Romanos 5:8", description: "Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-4", title: "1 Coríntios 13:4-7", description: "O amor é sofredor, é benigno; o amor não é invejoso; não trata com leviandade.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-5", title: "Salmo 36:5-7", description: "A tua misericórdia, Senhor, estende-se até os céus, e a tua fidelidade até às nuvens.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-6", title: "Romanos 8:38-39", description: "Nada nos separará do amor de Deus que está em Cristo Jesus.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-7", title: "1 João 4:19", description: "Nós amamos porque ele nos amou primeiro.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-8", title: "Jeremias 31:3", description: "Com amor eterno te amei; por isso com benignidade te atraí.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-9", title: "Cantares 8:7", description: "As muitas águas não poderiam apagar o amor, nem os rios afogá-lo.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-10", title: "Efésios 3:17-19", description: "Para que vós, arraigados e alicerçados em amor, possais compreender a largura, o comprimento, a altura e a profundidade do amor de Cristo.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-11", title: "Zacarias 2:8", description: "Aquele que tocar em vós toca na menina do seu olho.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-12", title: "Salmo 86:15", description: "Tu, Senhor, és um Deus compassivo e misericordioso, longânimo e grande em benignidade e verdade.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-13", title: "Oséias 11:4", description: "Eu os atraí com cordas humanas, com laços de amor.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-14", title: "João 15:9", description: "Como o Pai me amou, assim também eu vos amei; permanecei no meu amor.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-15", title: "Salmo 103:8", description: "Misericordioso e piedoso é o Senhor; longânimo e grande em benignidade.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-16", title: "Gálatas 2:20", description: "Eu fui crucificado com Cristo; e vivo, não mais eu, mas Cristo vive em mim.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-17", title: "Deuteronômio 7:8", description: "Mas porque o Senhor vos amava.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-18", title: "Isaías 54:10", description: "Os montes se retirarão, e os outeiros serão abalados, mas a minha benignidade não se apartará de ti.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-19", title: "1 João 3:1", description: "Vede quão grande amor nos tem concedido o Pai: que fôssemos chamados filhos de Deus.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-20", title: "Romanos 5:5", description: "O amor de Deus está derramado em nossos corações pelo Espírito Santo que nos foi dado.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-21", title: "Mateus 22:37-39", description: "Amarás o Senhor teu Deus de todo o teu coração... e amarás o teu próximo como a ti mesmo.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-22", title: "Colossenses 3:14", description: "E, sobre tudo isto, revesti-vos de amor, que é o vínculo da perfeição.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-23", title: "Salmo 139:17-18", description: "Quão preciosos me são, ó Deus, os teus pensamentos! Quão grandes são as somas deles!", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-24", title: "1 Tessalonicenses 5:8", description: "Mas nós, que somos do dia, sejamos sóbrios, vestindo-nos da couraça da fé e do amor.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-25", title: "João 13:34-35", description: "Um novo mandamento vos dou: que vos ameis uns aos outros.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-26", title: "Salmo 117:2", description: "Porque a sua benignidade é grande para conosco, e a verdade do Senhor dura para sempre.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-27", title: "1 Pedro 4:8", description: "Mas, sobretudo, tende ardente amor uns para com os outros, porque o amor cobrirá a multidão de pecados.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-28", title: "Romanos 12:9-10", description: "O amor seja sem fingimento. Amai-vos cordialmente uns aos outros com amor fraternal.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },
  { id: "dev-feb-29", title: "Salmo 136:1", description: "Louvai ao Senhor, porque ele é bom, porque a sua misericórdia dura para sempre.", section: "Devocional", href: "#devocional", icon: <BookOpen className="w-4 h-4" />, category: "Devocional" },

  // ---- EVENTS ----
  { id: "evt-1", title: "Conferência de Avivamento", description: "15 FEV — Três dias de pregação da Palavra, louvor poderoso e oração fervorosa com pastores convidados de todo o Brasil. 19:30 no Templo Principal.", section: "Eventos", href: "#eventos", icon: <Star className="w-4 h-4" />, category: "Eventos" },
  { id: "evt-2", title: "Culto de Ação de Graças", description: "22 FEV — Uma noite especial para agradecer a Deus pelas bênçãos recebidas. 19:00 no Templo Principal.", section: "Eventos", href: "#eventos", icon: <Heart className="w-4 h-4" />, category: "Eventos" },
  { id: "evt-3", title: "Encontro de Casais", description: "08 MAR — Palestra especial para casais com temas sobre família, amor e comunhão conjugal. 15:00 no Salão de Eventos.", section: "Eventos", href: "#eventos", icon: <Users className="w-4 h-4" />, category: "Eventos" },
  { id: "evt-4", title: "Festival de Louvor Jovem", description: "15 MAR — ONJ! Uma noite de louvor inesquecível com a presença de bandas convidadas. 19:30 no Templo Principal.", section: "Eventos", href: "#eventos", icon: <Music className="w-4 h-4" />, category: "Eventos" },
  { id: "evt-5", title: "Escola Bíblica de Férias", description: "22 MAR — Atividades especiais para crianças durante as férias escolares. 08:00 no Salão Infantil.", section: "Eventos", href: "#eventos", icon: <BookOpen className="w-4 h-4" />, category: "Eventos" },
  { id: "evt-6", title: "Vigília de Oração", description: "05 ABR — Uma vigília especial dedicada à intercessão pela igreja, família e nação. 22:00 no Templo Principal.", section: "Eventos", href: "#eventos", icon: <Heart className="w-4 h-4" />, category: "Eventos" },
  { id: "evt-7", title: "Seminário de Liderança", description: "12 ABR — Treinamento para líderes de célula, diáconos e obreiros sobre liderança cristã. 09:00 na Sala de Ensino.", section: "Eventos", href: "#eventos", icon: <BookOpen className="w-4 h-4" />, category: "Eventos" },
  { id: "evt-8", title: "Culto da Mulher Virtuosa", description: "20 ABR — Celebração especial do Ministério de Senhoras com louvor, pregação e café da manhã. 09:00 no Salão de Eventos.", section: "Eventos", href: "#eventos", icon: <Star className="w-4 h-4" />, category: "Eventos" },

  // ---- CONTACT INFO ----
  { id: "ct-1", title: "Endereço — Monte Líbano", description: "Bairro Monte Líbano, Rondonópolis — MT", section: "Contato", href: "#contato", icon: <MapPin className="w-4 h-4" />, category: "Contato" },
  { id: "ct-2", title: "Telefone", description: "(65) 3456-7890 — (65) 98765-4321 — WhatsApp", section: "Contato", href: "#contato", icon: <Users className="w-4 h-4" />, category: "Contato" },
  { id: "ct-3", title: "E-mail", description: "contato@ieadmontelibano.org.br — eventos@ieadmontelibano.org.br", section: "Contato", href: "#contato", icon: <Heart className="w-4 h-4" />, category: "Contato" },
  { id: "ct-4", title: "Horário da Secretaria", description: "Segunda a Sexta, 09:00 — 17:00", section: "Contato", href: "#contato", icon: <Clock className="w-4 h-4" />, category: "Contato" },
];

/* =============================================
   SEARCH ENGINE — Fuzzy matching
   ============================================= */

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
}

function score(query: string, item: SearchResult): number {
  const q = normalize(query);
  const qWords = q.split(/\s+/).filter(Boolean);

  const titleNorm = normalize(item.title);
  const descNorm = normalize(item.description);
  const catNorm = normalize(item.category);
  const secNorm = normalize(item.section);
  const combined = `${titleNorm} ${descNorm} ${catNorm} ${secNorm}`;

  let score = 0;

  // Exact title match
  if (titleNorm === q) score += 100;
  // Title starts with query
  else if (titleNorm.startsWith(q)) score += 80;
  // All query words in title
  else if (qWords.every(w => titleNorm.includes(w))) score += 60;
  // Query words in title partially
  else if (qWords.some(w => titleNorm.includes(w))) score += 30;

  // All words in combined text
  if (qWords.every(w => combined.includes(w))) score += 25;
  // Some words in combined text
  else if (qWords.some(w => combined.includes(w))) score += 10;

  // Sequential character matching (fuzzy)
  let ci = 0;
  for (let qi = 0; qi < q.length && ci < titleNorm.length; qi++) {
    if (q[qi] === titleNorm[ci] || ci < titleNorm.length) {
      while (ci < titleNorm.length && titleNorm[ci] !== q[qi]) ci++;
      if (ci < titleNorm.length && titleNorm[ci] === q[qi]) score += 3;
      ci++;
    }
  }

  // Category/section bonus
  if (catNorm.includes(q)) score += 15;
  if (secNorm.includes(q)) score += 15;

  return score;
}

function search(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];
  const q = normalize(query);
  if (q.length < 2) return [];

  const results = searchIndex
    .map(item => ({ item, s: score(q, item) }))
    .filter(r => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 8)
    .map(r => r.item);

  return results;
}

/* =============================================
   COMPONENT
   ============================================= */

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const performSearch = useCallback((q: string) => {
    const r = search(q);
    setResults(r);
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      e.preventDefault();
      navigateTo(results[activeIndex].href);
    }
  };

  const navigateTo = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="glass-pill px-3 py-2 rounded-xl flex items-center gap-2 text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all duration-200 group"
        aria-label="Pesquisar"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline text-xs font-medium">Pesquisar</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium text-white/20 bg-white/[0.04] border border-white/[0.06] group-hover:text-white/35 group-hover:border-white/[0.1] transition-all duration-200">
          <span className="text-[9px]">⌘</span>K
        </kbd>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Search Container */}
          <div
            className="relative z-10 w-full max-w-2xl animate-search-open"
            onClick={e => e.stopPropagation()}
          >
            {/* Input area */}
            <div className="glass-elevated rounded-2xl overflow-hidden">
              <div className="relative z-10 flex items-center px-5 py-4 gap-3">
                <Search className="w-5 h-5 text-white/30 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                    performSearch(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Pesquisar no site..."
                  className="flex-1 bg-transparent text-white text-base placeholder:text-white/25 outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {query && (
                  <button
                    onClick={() => { setQuery(""); setResults([]); inputRef.current?.focus(); }}
                    className="p-1 rounded-md text-white/30 hover:text-white/60 transition-colors"
                    aria-label="Limpar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-white/15 bg-white/[0.03] border border-white/[0.06]">
                  ESC
                </kbd>
              </div>
            </div>

            {/* Results dropdown */}
            {results.length > 0 && (
              <div ref={listRef} className="glass-elevated rounded-2xl mt-2 overflow-hidden max-h-[50vh] overflow-y-auto">
                <div className="relative z-10 py-2">
                  {results.map((r, i) => (
                    <button
                      key={r.id}
                      onClick={() => navigateTo(r.href)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full text-left px-5 py-3.5 flex items-start gap-4 transition-all duration-150 group ${
                        i === activeIndex
                          ? "bg-white/[0.06]"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-150 ${
                        i === activeIndex
                          ? "bg-white/10 text-white/70"
                          : "bg-white/[0.04] text-white/30 group-hover:text-white/50"
                      }`}>
                        {r.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-sm text-white/85 truncate">{r.title}</span>
                          <span className="glass-pill px-2 py-0.5 rounded-md text-[10px] font-semibold text-white/30 flex-shrink-0">{r.category}</span>
                        </div>
                        <p className="text-xs text-white/35 leading-relaxed line-clamp-2">{r.description}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-all duration-150 ${
                        i === activeIndex ? "text-white/50 translate-x-0.5" : "text-white/15 group-hover:text-white/30"
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {query.trim().length >= 2 && results.length === 0 && (
              <div className="glass-elevated rounded-2xl mt-2 overflow-hidden">
                <div className="relative z-10 px-5 py-8 text-center">
                  <Search className="w-8 h-8 text-white/15 mx-auto mb-3" />
                  <p className="text-white/40 text-sm font-medium mb-1">Nenhum resultado encontrado</p>
                  <p className="text-white/25 text-xs">Tente outro termo de pesquisa</p>
                </div>
              </div>
            )}

            {/* Empty state hint */}
            {!query && (
              <div className="glass-elevated rounded-2xl mt-2 overflow-hidden">
                <div className="relative z-10 px-5 py-6">
                  <p className="text-white/25 text-xs font-semibold uppercase tracking-wider mb-3">Sugestões rápidas</p>
                  <div className="flex flex-wrap gap-2">
                    {["Culto de Celebração", "Devocional", "Pr. Valdomiro", "Horários", "Eventos", "Oração", "Contato", "EBD"].map(tag => (
                      <button
                        key={tag}
                        onClick={() => { setQuery(tag); performSearch(tag); inputRef.current?.focus(); }}
                        className="glass-pill px-3 py-1.5 rounded-lg text-xs font-medium text-white/35 hover:text-white/70 hover:bg-white/[0.08] transition-all duration-200"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}