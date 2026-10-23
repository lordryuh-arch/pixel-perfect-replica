import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapaVivo } from "@/components/MapaVivo";
import { EbookSection, ModulesSection, PlatformSection, OfferSection } from "@/components/OfferSections";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import heroImg from "@/assets/hero-familia.jpg";
import cuidadoImg from "@/assets/cuidado-pes.jpg";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAÚDE DOS PÉS — E-book educativo e proposta do Mapa Vivo" },
      { name: "description", content: "Conheça o guia educativo SAÚDE DOS PÉS e a proposta da plataforma Mapa Vivo. Prévias ilustrativas e demonstração; oferta com condições a confirmar." },
      { property: "og:title", content: "SAÚDE DOS PÉS — Guia educativo + Mapa Vivo" },
      { property: "og:description", content: "Aprenda a observar e registrar cada mudança. Conheça as prévias do e-book e a demonstração da plataforma; vendas ainda indisponíveis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["O e-book", "#ebook"],
  ["Plataforma", "#plataforma"],
  ["Mapa Vivo", "#mapa-vivo"],
  ["Dúvidas", "#faq"],
];

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Carrossel />
        <Problema />
        <EbookSection />
        <ModulesSection />
        <ComoFunciona />
        <PlatformSection />
        <section id="mapa-vivo" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
          <SectionHead kicker="Mapa Vivo · Demonstração" title="Cada região do pé, com sua própria história." text="Um exemplo de como as observações podem ficar organizadas. Os dados são fictícios e a área de acompanhamento ainda não está disponível." />
          <MapaVivo />
        </section>
        <Familia />
        <OfferSection />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2 font-display text-lg font-extrabold text-primary">
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
        <Button asChild className="hidden lg:inline-flex"><a href="#oferta">Conhecer a oferta <ArrowRight /></a></Button>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && (
        <nav className="border-t border-border px-5 py-4 lg:hidden" aria-label="Menu móvel">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="block py-2 font-medium">{l}</a>)}
          <Button asChild className="mt-3"><a href="#oferta" onClick={() => setOpen(false)}>Conhecer a oferta <ArrowRight /></a></Button>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="offer-hero relative isolate overflow-hidden">
      <img src={heroImg} alt="Filha adulta e mãe consultando informações no celular em casa" width={1280} height={1024} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_center]" />
      <div className="offer-hero-shade absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-highlight">E-book educativo + proposta de plataforma</p>
        <h1 className="mt-4 text-4xl font-extrabold text-primary-foreground md:text-5xl">SAÚDE DOS PÉS</h1>
        <p className="mt-5 font-display text-2xl font-bold leading-snug md:text-3xl">
          Seus pés contam uma história. Aprenda a observar e registrar cada mudança.
        </p>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-primary-foreground/85">Conheça o guia educativo e a proposta do Mapa Vivo: aprendizado e observações organizadas para cuidar de si e de quem você ama.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" variant="secondary" className="h-auto whitespace-normal py-3.5"><a href="#oferta">Conhecer a oferta <ArrowRight /></a></Button>
          <Button asChild size="lg" variant="ghost" className="h-auto whitespace-normal border border-primary-foreground/40 py-3.5 text-primary-foreground"><a href="#ebook">Explorar o e-book</a></Button>
        </div>
        <p className="mt-5 text-xs leading-relaxed text-primary-foreground/80">Oferta em preparação · Condições a confirmar<br />Conteúdo educativo. Não substitui avaliação profissional.</p>
        </div>
      </div>
    </section>
  );
}

const SLIDES = [
  { k: "Educação", t: "Cuidar começa por saber observar.", d: "Conteúdos claros sobre higiene, pele, unhas, calçados e sinais que merecem atenção profissional.", img: cuidadoImg },
  { k: "Histórico", t: "Cada detalhe merece contexto.", d: "A proposta do Mapa Vivo é reunir datas, regiões e observações. A linha do tempo ao lado é ilustrativa.", img: null },
  { k: "Família", t: "Mais organização para quem cuida de quem ama.", d: "Uma proposta de cuidado familiar com perfis separados e compartilhamento autorizado. Recursos ainda em preparação.", img: heroImg },
];

function Carrossel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 7000);
    return () => clearInterval(id);
  }, [paused]);
  const s = SLIDES[i] ?? SLIDES[0];
  if (!s) return null;
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
            <Button variant="ghost" size="icon" aria-label="Slide anterior" onClick={() => setI((i + 2) % 3)} className="border border-primary-foreground/30"><ChevronLeft /></Button>
            <Button variant="ghost" size="icon" aria-label="Próximo slide" onClick={() => setI((i + 1) % 3)} className="border border-primary-foreground/30"><ChevronRight /></Button>
            <div className="ml-3 flex gap-2">
              {SLIDES.map((sl, n) => (
                <Button key={n} variant="ghost" size="icon" aria-label={`Ir para ${sl.k}`} aria-current={n === i} onClick={() => setI(n)} className="size-7"><span className={cn("h-2 w-2 rounded-full", n === i ? "bg-highlight" : "bg-primary-foreground/40")} /></Button>
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
    ["Registre", "A proposta é reunir descrições e fotos por região no Mapa Vivo."],
    ["Compartilhe", "A proposta é organizar resumos para consultas e familiares autorizados."],
  ];
  return (
    <section id="como-funciona" className="scroll-mt-24 bg-secondary/50 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead kicker="Como funciona · A proposta" title="Quatro passos simples, no seu ritmo." text="O guia apresenta o aprendizado; os recursos de registro e compartilhamento da plataforma ainda estão em preparação." />
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

function Familia() {
  return (
    <section id="familia" className="scroll-mt-24 bg-secondary/50 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <img src={cuidadoImg} alt="Pessoa hidratando os pés em casa" loading="lazy" width={1024} height={768} className="rounded-[2rem] object-cover shadow-soft" />
        <div>
           <SectionHead kicker="Para a família" title="Quem cuida de si e de quem ama também precisa aprender a observar os pequenos detalhes." text="A proposta da plataforma respeita a autonomia da pessoa acompanhada. Os recursos familiares ainda não estão disponíveis." />
          <ul className="space-y-4">
            {["Históricos separados para não misturar informações.", "Compartilhamento somente com autorização.", "Organização de informações para as consultas.", "Respeito à privacidade e à autonomia de cada pessoa."].map((t) => (
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
  ["O e-book é um livro físico?", "Não. A proposta é um guia digital. A capa e as páginas mostradas nesta apresentação são mockups e prévias ilustrativas, não a versão final do material."],
  ["Já posso comprar o e-book e acessar a plataforma?", "Ainda não. A oferta está em preparação, sem compra disponível ou acesso pago nesta página. Preço, duração, recursos incluídos e demais condições ainda precisam ser confirmados."],
  ["A plataforma analisa minhas fotos?", "Não há análise automática. A proposta é organizar fotografias para consulta pessoal e conversas com profissionais. O envio de fotos não está disponível nesta demonstração."],
  ["Posso acompanhar os pés de um familiar?", "Esse é um dos recursos propostos, ainda não disponível: perfis separados e compartilhamento autorizado. Os limites de perfis e as condições de acesso estão a confirmar."],
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
    <section className="bg-accent py-14 text-center text-accent-foreground md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl font-extrabold text-accent-foreground md:text-4xl">Comece a contar a história dos seus pés.</h2>
        <p className="mx-auto mt-4 max-w-xl opacity-90">Aprenda. Observe. Registre. Compartilhe.</p>
        <Button asChild variant="secondary" size="lg" className="mt-8 h-auto whitespace-normal py-3.5"><a href="#oferta">Conhecer a oferta <ArrowRight /></a></Button>
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
