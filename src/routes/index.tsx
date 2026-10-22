import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapaVivo } from "@/components/MapaVivo";
import heroImg from "@/assets/hero-familia.jpg";
import cuidadoImg from "@/assets/cuidado-pes.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAÚDE DOS PÉS — Aprenda a observar e registrar cada mudança" },
      { name: "description", content: "Educação, observação guiada e histórico visual para você e sua família cuidarem melhor dos pés ao longo da vida." },
      { property: "og:title", content: "SAÚDE DOS PÉS" },
      { property: "og:description", content: "Seus pés contam uma história. Aprenda a observar e registrar cada mudança." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["Como funciona", "#como-funciona"],
  ["Mapa Vivo", "#mapa-vivo"],
  ["Conteúdo educativo", "#escola"],
  ["Para a família", "#familia"],
  ["Perguntas frequentes", "#faq"],
];

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Carrossel />
        <Problema />
        <ComoFunciona />
        <section id="mapa-vivo" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
          <SectionHead kicker="Mapa Vivo" title="Cada região do pé, com sua própria história." text="Selecione o pé, a vista e a região para ver como as observações ficam organizadas. Use o mouse, o toque ou o teclado." />
          <MapaVivo />
        </section>
        <Escola />
        <Familia />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-primary">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-foreground">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden><path d="M9 22c-3 0-4-3-4-6 0-4 2-7 5-7s4 3 4 6-2 7-5 7Zm6-15a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3 2a1.2 1.2 0 1 1 0-2.4A1.2 1.2 0 0 1 18 9Zm-6-4a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm8 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" /></svg>
      </span>
      SAÚDE DOS PÉS
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden gap-6 text-sm font-medium lg:flex" aria-label="Principal">
          {NAV.map(([l, h]) => <a key={h} href={h} className="hover:text-info">{l}</a>)}
        </nav>
        <a href="#mapa-vivo" className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground lg:inline-block">Conhecer a plataforma</a>
        <button className="rounded-lg p-2 lg:hidden" aria-expanded={open} aria-label="Abrir menu" onClick={() => setOpen(!open)}>
          <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current" fill="none" strokeWidth="2"><path d={open ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-border px-5 py-4 lg:hidden" aria-label="Menu móvel">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="block py-2 font-medium">{l}</a>)}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 md:grid-cols-[1.05fr_1fr] md:pt-20">
      <div>
        <p className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">Aprenda · Observe · Registre · Compartilhe</p>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] md:text-5xl lg:text-[3.4rem]">
          Seus pés contam uma história. Aprenda a observar e registrar cada mudança.
        </h1>
        <p className="mt-6 text-lg leading-relaxed">O SAÚDE DOS PÉS reúne educação, observação guiada e histórico visual para ajudar você e sua família a cuidar melhor dos pés ao longo da vida.</p>
        <p className="mt-3 leading-relaxed text-muted-foreground">Aprenda cuidados cotidianos, registre observações, organize fotografias e acompanhe as informações ao longo do tempo em uma experiência simples e acolhedora.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#mapa-vivo" className="rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5">Conhecer o Mapa Vivo</a>
          <a href="#como-funciona" className="rounded-full border border-primary/25 bg-card px-6 py-3.5 font-semibold text-primary hover:bg-secondary">Descobrir como funciona</a>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">Educação e acompanhamento organizado. Não substitui avaliação profissional.</p>
      </div>
      <div className="relative">
        <img src={heroImg} alt="Filha adulta e mãe consultando informações no celular em casa" width={1280} height={1024} className="aspect-[5/4] w-full rounded-[2rem] object-cover shadow-soft" />
        <div className="absolute -bottom-6 -left-4 w-52 rounded-2xl border border-border bg-card p-4 shadow-soft md:-left-10">
          <p className="text-xs font-semibold text-accent">Histórico · pé esquerdo</p>
          <p className="mt-1 font-display font-bold text-primary">Calcanhar</p>
          <div className="mt-3 space-y-1.5 text-xs">
            <div className="flex justify-between"><span>Pele seca</span><span className="text-muted-foreground">12/09</span></div>
            <div className="flex justify-between"><span>Rachadura</span><span className="text-muted-foreground">03/10</span></div>
          </div>
        </div>
        <div className="absolute -right-3 top-6 rounded-2xl bg-primary px-4 py-3 text-primary-foreground shadow-soft">
          <p className="text-xs opacity-80">Relatório pronto</p>
          <p className="font-display text-sm font-bold">Compartilhar com a família</p>
        </div>
      </div>
    </section>
  );
}

const SLIDES = [
  { k: "Educação", t: "Cuidar começa por saber observar.", d: "Conteúdos claros sobre higiene, pele, unhas, calçados e sinais que merecem atenção profissional.", img: cuidadoImg },
  { k: "Histórico", t: "Não deixe informações importantes se perderem.", d: "Datas, regiões, descrições e fotografias organizadas em uma linha do tempo fácil de consultar.", img: null },
  { k: "Família", t: "Mais organização para quem cuida de quem ama.", d: "Perfis para cada pessoa da família e compartilhamento apenas com quem você autorizar.", img: heroImg },
];

function Carrossel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 7000);
    return () => clearInterval(id);
  }, [paused]);
  const s = SLIDES[i];
  return (
    <section aria-roledescription="carrossel" aria-label="Destaques" className="bg-primary py-16 text-primary-foreground"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)}
      onKeyDown={(e) => { if (e.key === "ArrowRight") setI((i + 1) % 3); if (e.key === "ArrowLeft") setI((i + 2) % 3); }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-500" aria-live="polite">
          <p className="text-sm font-semibold uppercase tracking-widest text-highlight">{s.k}</p>
          <h2 className="mt-3 text-3xl font-extrabold text-primary-foreground md:text-4xl">{s.t}</h2>
          <p className="mt-4 text-lg opacity-85">{s.d}</p>
          <div className="mt-8 flex items-center gap-3">
            <button aria-label="Slide anterior" onClick={() => setI((i + 2) % 3)} className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/30 hover:bg-primary-foreground/10">‹</button>
            <button aria-label="Próximo slide" onClick={() => setI((i + 1) % 3)} className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/30 hover:bg-primary-foreground/10">›</button>
            <div className="ml-3 flex gap-2">
              {SLIDES.map((sl, n) => (
                <button key={n} aria-label={`Ir para ${sl.k}`} aria-current={n === i} onClick={() => setI(n)} className={cn("h-2 rounded-full transition-all", n === i ? "w-8 bg-highlight" : "w-2 bg-primary-foreground/40")} />
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl">
          {s.img ? (
            <img src={s.img} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          ) : (
            <div className="aspect-[4/3] space-y-3 bg-card p-6 text-card-foreground">
              {[["20/10", "Dedos · pé esquerdo", "Bolha"], ["15/10", "Arco · pé direito", "Dor relatada"], ["03/10", "Calcanhar · pé esquerdo", "Rachadura"], ["28/09", "Unhas · pé direito", "Alteração na unha"]].map(([d, r, t]) => (
                <div key={d} className="flex items-center gap-4 rounded-xl bg-secondary/60 p-4">
                  <span className="font-display text-lg font-bold text-primary">{d}</span>
                  <div><p className="font-semibold">{r}</p><p className="text-sm text-muted-foreground">{t}</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SectionHead({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">{kicker}</p>
      <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}

function Problema() {
  const itens = [
    "“Essa mancha já estava aqui no mês passado?”",
    "Fotos espalhadas no celular, sem data nem contexto.",
    "Na consulta, é difícil lembrar quando algo começou.",
    "Familiares cuidando juntos, cada um com uma informação diferente.",
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHead kicker="Você já passou por isso?" title="Pequenas mudanças são fáceis de esquecer." text="Sem um registro organizado, detalhes que poderiam ajudar uma conversa com um profissional acabam se perdendo." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {itens.map((t) => <div key={t} className="rounded-2xl border border-border bg-card p-6 leading-relaxed">{t}</div>)}
      </div>
    </section>
  );
}

function ComoFunciona() {
  const passos = [
    ["Aprenda", "Módulos curtos sobre cuidados cotidianos e sinais de atenção."],
    ["Observe", "Um roteiro guiado para olhar cada região do pé com calma."],
    ["Registre", "Marque a região no Mapa Vivo, descreva e adicione uma foto se quiser."],
    ["Compartilhe", "Gere um resumo para levar à consulta ou mostrar a familiares autorizados."],
  ];
  return (
    <section id="como-funciona" className="scroll-mt-24 bg-secondary/50 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead kicker="Como funciona" title="Quatro passos simples, no seu ritmo." />
        <ol className="grid gap-6 md:grid-cols-4">
          {passos.map(([t, d], n) => (
            <li key={t} className="rounded-2xl bg-card p-6">
              <span className="font-display text-4xl font-extrabold text-accent">0{n + 1}</span>
              <h3 className="mt-3 text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const MODULOS = [
  ["Conhecendo os pés", "Regiões básicas, pele, unhas e o que observar na rotina."],
  ["Higiene e cuidados diários", "Lavar, secar entre os dedos, meias e calçados."],
  ["Pele, manchas e alterações", "Como registrar mudanças sem tentar adivinhar a causa."],
  ["Calçados, conforto e movimento", "Ajuste, atrito e cuidados após atividades."],
  ["Sinais de atenção", "Quando procurar atendimento — e quando é urgente."],
  ["Cuidados ao longo da vida", "Crianças, adultos, idosos e pessoas com diabetes."],
  ["Organização familiar", "Como dividir os cuidados com quem você ama."],
];

function Escola() {
  return (
    <section id="escola" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-20">
      <SectionHead kicker="Escola dos Pés" title="Conteúdo educativo, claro e responsável." text="Informação para entender melhor o que você observa — sem substituir a orientação de um profissional de saúde." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MODULOS.map(([t, d], n) => (
          <article key={t} className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft">
            <p className="text-xs font-semibold text-info">Módulo {n + 1}</p>
            <h3 className="mt-2 text-lg font-bold">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </article>
        ))}
        <div className="flex items-end rounded-2xl bg-highlight/40 p-6">
          <p className="font-display font-bold text-primary">Em feridas, dor intensa ou mudanças rápidas, procure atendimento profissional.</p>
        </div>
      </div>
    </section>
  );
}

function Familia() {
  return (
    <section id="familia" className="scroll-mt-24 bg-secondary/50 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <img src={cuidadoImg} alt="Pessoa hidratando os pés em casa" loading="lazy" width={1024} height={768} className="rounded-[2rem] object-cover shadow-soft" />
        <div>
          <SectionHead kicker="Para a família" title="Quem cuida de si e de quem ama também precisa aprender a observar os pequenos detalhes." />
          <ul className="space-y-4">
            {["Um perfil para cada pessoa, com histórico próprio.", "Você decide quem pode ver cada informação.", "Resumos organizados para levar às consultas.", "Privacidade em primeiro lugar: fotos e dados não são públicos."].map((t) => (
              <li key={t} className="flex gap-3"><span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  ["O SAÚDE DOS PÉS faz diagnóstico?", "Não. A plataforma é educativa e ajuda a organizar observações. Somente um profissional de saúde pode avaliar e diagnosticar."],
  ["A plataforma analisa minhas fotos?", "Não há análise automática. As fotos servem para você acompanhar mudanças e mostrar a um profissional, se desejar."],
  ["Posso acompanhar os pés de um familiar?", "Sim, essa é uma das propostas: perfis separados para cada pessoa, com compartilhamento autorizado."],
  ["Quando devo procurar atendimento?", "Diante de feridas, sinais de infecção, dor intensa, inchaço novo ou perda de sensibilidade, procure um profissional. Em situações graves, busque atendimento de urgência."],
  ["A área de acompanhamento já está disponível?", "Ainda não. O Mapa Vivo desta página é uma demonstração com dados fictícios."],
];

function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 mx-auto max-w-3xl px-5 py-20">
      <SectionHead kicker="Perguntas frequentes" title="Tire suas dúvidas." />
      <div className="space-y-3">
        {FAQ.map(([q, a]) => (
          <details key={q} className="group rounded-2xl border border-border bg-card p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-display font-bold text-primary">
              {q}<span className="text-xl text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20">
      <div className="rounded-[2rem] bg-accent p-10 text-center text-accent-foreground md:p-16">
        <h2 className="text-3xl font-extrabold text-accent-foreground md:text-4xl">Comece a contar a história dos seus pés.</h2>
        <p className="mx-auto mt-4 max-w-xl opacity-90">Aprenda. Observe. Registre. Compartilhe.</p>
        <a href="#mapa-vivo" className="mt-8 inline-block rounded-full bg-card px-7 py-3.5 font-semibold text-primary">Conhecer o Mapa Vivo</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <Logo />
        <p className="max-w-lg">Conteúdo educativo. O SAÚDE DOS PÉS não realiza diagnóstico e não substitui avaliação de profissionais de saúde.</p>
      </div>
    </footer>
  );
}
