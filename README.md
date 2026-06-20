# IEAD Monte Líbano — Rondonópolis, MT

Site oficial da **Igreja Evangélica Assembleia de Deus** no bairro Monte Líbano, Rondonópolis — Mato Grosso.

## 🌐 Acesse

Deploy automático via Vercel a cada push na branch `main`.

## 🛠 Tech Stack

| Tecnologia | Versão |
|---|---|
| [Next.js](https://nextjs.org) | 16.2 (App Router) |
| [React](https://react.dev) | 19 |
| [TypeScript](https://typescriptlang.org) | 5 |
| [Tailwind CSS](https://tailwindcss.com) | v4 (CSS-first config) |
| [lucide-react](https://lucide.dev) | — |

## ✨ Funcionalidades

- **Design Liquid Glass** — tema escuro com efeitos de vidro translúcido (inspirado no Apple Vision Pro)
- **Tela de carregamento** animada com spinner SVG
- **Navbar responsiva** com menu mobile e busca interna completa
- **Hero** com imagem de fundo, horários de culto e CTAs
- **Sobre** — história, valores e liderança pastoral
- **Cultos** — 6 cultos semanais + 4 ministérios especiais
- **Devocional Anual** — calendário interativo com versículo e reflexão diária
- **Eventos** — agenda de eventos futuros com destaques e momentos especiais
- **Contato** — formulário funcional com validação (API route `/api/contact`)
- **SEO** — metadata, OpenGraph, keywords configurados
- **Scroll to Top** — botão flutuante
- **Animações** — fade-in com IntersectionObserver

## 🚀 Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## 📁 Estrutura

```
src/
├── app/
│   ├── api/contact/route.ts   # API de contato
│   ├── globals.css             # Estilos globais + sistema Liquid Glass
│   ├── layout.tsx              # Layout raiz (font Inter, metadata)
│   └── page.tsx                # Página principal (single-page)
├── components/
│   ├── LoadingScreen.tsx       # Tela de carregamento
│   ├── Navbar.tsx              # Navegação fixa
│   ├── SearchBar.tsx           # Busca interna com índice
│   ├── Hero.tsx                # Banner principal
│   ├── About.tsx               # Sobre a igreja
│   ├── Services.tsx            # Cultos semanais
│   ├── Devotional.tsx          # Devocional anual
│   ├── Events.tsx              # Eventos
│   ├── Contact.tsx             # Formulário de contato
│   ├── Footer.tsx              # Rodapé
│   └── ScrollToTop.tsx         # Botão voltar ao topo
└── public/
    └── logo.png
```

## 📜 Licença

Projeto privado — IEAD Rondonópolis.
