import { ArrowDown, ArrowRight, BookOpen, Check, MonitorSmartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { modules } from '@/lib/guide';
import { offer, offerPrice } from '@/lib/offer';
import coverImg from '@/assets/capa-guia.jpg';
import platformImg from '@/assets/plataforma-mockup.jpg';
import pageOneImg from '@/assets/pagina-1.jpg';
import pageTwoImg from '@/assets/pagina-2.jpg';
import pageThreeImg from '@/assets/pagina-3.jpg';

export function EbookSection() {
  return (
    <section id="ebook" className="scroll-mt-24 border-b border-border py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <figure className="mx-auto w-full max-w-sm">
          <img src={coverImg} alt="Mockup da capa do e-book SAÚDE DOS PÉS — Guia Educativo" width={484} height={778} loading="lazy" className="w-full rounded-2xl shadow-soft" />
          <figcaption className="mt-4 text-center text-xs text-muted-foreground">Representação ilustrativa do e-book digital. Não é um livro físico.</figcaption>
        </figure>
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent"><BookOpen className="size-4" /> O guia educativo</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">Conhecimento para cuidar.<br />Um olhar mais atento, todos os dias.</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">O e-book SAÚDE DOS PÉS reúne os temas que fazem parte de uma rotina de cuidados: conhecer, observar e organizar informações, sem tentar diagnosticar o que você vê.</p>
          <ul className="mt-7 space-y-4">
            {['Cuidados cotidianos com pele, unhas, meias e calçados.', 'Observações organizadas por data e região do pé.', 'Informações para conversar com um profissional de saúde.'].map(text => <li key={text} className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-accent" /><span>{text}</span></li>)}
          </ul>
          <Button asChild variant="outline" size="lg" className="mt-8 h-auto whitespace-normal py-3"><a href="#previa">Conhecer as páginas <ArrowDown /></a></Button>
        </div>
      </div>
      <div id="previa" className="mx-auto mt-16 max-w-6xl scroll-mt-24 px-5 md:mt-24">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div><p className="text-sm font-semibold uppercase tracking-widest text-accent">Por dentro do guia</p><h3 className="mt-3 text-2xl font-extrabold md:text-3xl">Uma prévia do que você vai conhecer.</h3></div>
          <p className="max-w-sm text-sm text-muted-foreground">Páginas ilustrativas, não uma amostra final. O conteúdo está sujeito à revisão profissional.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {[{ image: pageOneImg, title: 'Conhecendo os pés' }, { image: pageTwoImg, title: 'Cuidados diários' }, { image: pageThreeImg, title: 'Observar e registrar' }].map((page, n) => (
            <figure key={page.title}>
              <img src={page.image} alt={`Página ilustrativa: ${page.title}`} loading="lazy" className="aspect-[3/5] w-full rounded-lg border border-border object-contain bg-card shadow-soft" />
              <figcaption className="mt-4 flex gap-3 text-sm"><span className="font-semibold text-accent">0{n + 1}</span><span className="font-semibold text-primary">{page.title}<span className="mt-1 block text-xs font-normal text-muted-foreground">Prévia ilustrativa</span></span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ModulesSection() {
  return (
    <section id="escola" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">Escola dos Pés</p>
      <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Sete temas. Um cuidado mais consciente.</h2>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Conteúdo educativo, claro e responsável, para entender melhor o que você observa — sem substituir a orientação profissional.</p>
      <div className="mt-10 grid gap-x-10 sm:grid-cols-2">
        {modules.map((module, n) => <details key={module.title} className="group border-b border-border py-5">
          <summary className="flex cursor-pointer list-none items-center gap-4"><span className="text-sm font-semibold text-accent">0{n + 1}</span><h3 className="flex-1 text-lg font-bold">{module.title}</h3><span className="text-xl text-accent group-open:rotate-45" aria-hidden>+</span></summary>
          <div className="pl-9"><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{module.description}</p><ul className="mt-3 list-inside list-disc space-y-2 text-sm">{module.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>{module.note && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{module.note}</p>}</div>
        </details>)}
      </div>
    </section>
  );
}

export function PlatformSection() {
  return (
    <section id="plataforma" className="scroll-mt-24 bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent"><MonitorSmartphone className="size-4" /> A proposta da plataforma</p>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Do aprendizado à observação.<br />Tudo tem seu lugar.</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">O Mapa Vivo propõe uma maneira visual de organizar as observações de cada região do pé e reunir informações para acompanhar ao longo do tempo.</p>
          <div className="mt-7 space-y-5 border-l-2 border-accent/30 pl-5">
            <div><h3 className="font-bold">Uma região, uma história</h3><p className="mt-1 text-sm text-muted-foreground">Seleção do pé, da vista e da região em um mapa visual.</p></div>
            <div><h3 className="font-bold">Registros com contexto</h3><p className="mt-1 text-sm text-muted-foreground">Proposta de histórico com datas, descrições e fotografias.</p></div>
            <div><h3 className="font-bold">Cuidado compartilhado com respeito</h3><p className="mt-1 text-sm text-muted-foreground">Proposta de perfis familiares e compartilhamento autorizado.</p></div>
          </div>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground">A área de acompanhamento ainda não está disponível. Recursos e acesso dependem da confirmação da oferta; abaixo, você pode conhecer a demonstração do mapa.</p>
          <Button asChild size="lg" className="mt-6 h-auto whitespace-normal py-3"><a href="#mapa-vivo">Explorar o Mapa Vivo <ArrowRight /></a></Button>
        </div>
        <figure className="mx-auto w-full max-w-xs">
          <img src={platformImg} alt="Mockup ilustrativo da proposta do Mapa Vivo em um celular" width={338} height={697} loading="lazy" className="w-full rounded-2xl shadow-soft" />
          <figcaption className="mt-4 text-center text-xs text-muted-foreground">Tela ilustrativa. Não representa uma área de acesso já disponível.</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function OfferSection() {
  return (
    <section id="oferta" className="scroll-mt-24 border-y border-border bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">E-book + plataforma</p>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">SAÚDE DOS PÉS</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed">Aprenda com o guia educativo. Conheça a proposta de um acompanhamento visual para você e sua família.</p>
          <div className="mt-8 flex items-center gap-5">
            <img src={coverImg} alt="Capa ilustrativa do e-book digital" loading="lazy" className="h-48 w-auto rounded-lg shadow-soft" />
            <span className="text-3xl text-accent" aria-hidden>+</span>
            <img src={platformImg} alt="Tela ilustrativa da plataforma" loading="lazy" className="h-48 w-auto rounded-lg shadow-soft" />
          </div>
          <p className="mt-5 text-xs text-muted-foreground">Mockups ilustrativos de produtos digitais; nenhum item físico.</p>
        </div>
        <div className="border-t border-accent/30 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <p className="text-sm font-semibold text-accent">Oferta em preparação</p>
          <p className="mt-3 font-display text-3xl font-extrabold text-primary">{offerPrice()}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">A compra ainda não está disponível. As condições serão apresentadas aqui antes da abertura das vendas.</p>
          <dl className="mt-6 divide-y divide-border text-sm">
            {[['Duração do acesso', offer.accessDuration ?? 'A confirmar'], ['Recursos incluídos', offer.includedFeatures.length ? offer.includedFeatures.join(', ') : 'A confirmar'], ['Perfis familiares', offer.profileLimit === null ? 'A confirmar' : String(offer.profileLimit)], ['Renovação', offer.renewal ?? 'A confirmar'], ['Cancelamento', offer.cancellation ?? 'A confirmar']].map(([label, value]) => <div key={label} className="grid grid-cols-2 gap-4 py-3"><dt className="text-muted-foreground">{label}</dt><dd className="text-right font-medium">{value}</dd></div>)}
          </dl>
          <Button disabled size="lg" className="mt-6 h-auto w-full whitespace-normal py-3">Compra ainda indisponível</Button>
          <Button asChild variant="link" className="mt-2 h-auto w-full whitespace-normal"><a href="#mapa-vivo">Conhecer a demonstração <ArrowRight /></a></Button>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Nenhum pagamento é processado nesta página. A demonstração não concede acesso pago.</p>
        </div>
      </div>
    </section>
  );
}