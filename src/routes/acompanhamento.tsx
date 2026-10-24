import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, Camera, Check, ClipboardCopy, Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  HABITOS_PADRAO,
  REGIOES_ACOMPANHAMENTO,
  TIPOS_OBSERVACAO,
  contarPorRegiao,
  formatarData,
  nomeRegiao,
  resumoTexto,
  type Habito,
  type Observacao,
  type Pe,
  type Perfil,
} from "@/lib/acompanhamento";

export const Route = createFileRoute("/acompanhamento")({
  head: () => ({
    meta: [
      { title: "Área de acompanhamento local — SAÚDE DOS PÉS" },
      { name: "description", content: "Demonstração local do acompanhamento de pés: perfis, observações por região, rotina diária e resumo. Tudo em memória, nada é salvo ou enviado." },
      { property: "og:title", content: "Área de acompanhamento local — SAÚDE DOS PÉS" },
      { property: "og:description", content: "Experimente registrar observações por região do pé e montar um resumo. Demonstração em memória, sem salvamento." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Acompanhamento,
});

function hoje(): string {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

function Acompanhamento() {
  const seq = useRef(0);
  const novoId = (prefixo: string) => `${prefixo}-${++seq.current}`;

  const [perfis, setPerfis] = useState<Perfil[]>([{ id: "perfil-0", nome: "Você", relacao: "Uso próprio" }]);
  const [perfilId, setPerfilId] = useState("perfil-0");
  const [observacoes, setObservacoes] = useState<Observacao[]>([]);
  const [habitos, setHabitos] = useState<Habito[]>(HABITOS_PADRAO);
  const [feitos, setFeitos] = useState<Set<string>>(new Set());
  const [aba, setAba] = useState<"registros" | "rotina" | "resumo">("registros");

  const perfil = perfis.find((p) => p.id === perfilId) ?? perfis[0]!;
  const doPerfil = observacoes.filter((o) => o.perfilId === perfil.id);

  const adicionarPerfil = (nome: string, relacao: string) => {
    const p: Perfil = { id: novoId("perfil"), nome, relacao };
    setPerfis((ps) => [...ps, p]);
    setPerfilId(p.id);
  };

  const adicionarObservacao = (o: Omit<Observacao, "id" | "perfilId">) => {
    setObservacoes((os) => [{ ...o, id: novoId("obs"), perfilId: perfil.id }, ...os]);
  };

  const removerObservacao = (id: string) => {
    setObservacoes((os) => {
      const alvo = os.find((o) => o.id === id);
      if (alvo?.foto) URL.revokeObjectURL(alvo.foto);
      return os.filter((o) => o.id !== id);
    });
  };

  const alternarHabito = (id: string) => {
    setFeitos((f) => {
      const novo = new Set(f);
      if (novo.has(id)) novo.delete(id);
      else novo.add(id);
      return novo;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Button asChild variant="ghost"><Link to="/"><ArrowLeft /> Voltar à página inicial</Link></Button>
          <span className="font-display text-sm font-extrabold text-primary">SAÚDE DOS PÉS</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Demonstração local</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Área de acompanhamento</h1>
        <p className="mt-4 max-w-2xl rounded-2xl border border-border bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground">
          Tudo aqui funciona apenas nesta sessão: os dados ficam na memória do navegador e <strong className="text-foreground">somem ao recarregar a página</strong>. Nada é salvo, enviado ou compartilhado. Conteúdo educativo, sem diagnóstico.
        </p>

        <Perfis perfis={perfis} ativoId={perfil.id} onSelecionar={setPerfilId} onAdicionar={adicionarPerfil} />

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Seções do acompanhamento">
          {([
            ["registros", "Observações"],
            ["rotina", "Rotina de hoje"],
            ["resumo", "Resumo"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={aba === id}
              onClick={() => setAba(id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                aba === id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-secondary",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {aba === "registros" && (
            <Registros observacoes={doPerfil} onAdicionar={adicionarObservacao} onRemover={removerObservacao} />
          )}
          {aba === "rotina" && (
            <Rotina
              habitos={habitos}
              feitos={feitos}
              onAlternar={alternarHabito}
              onAdicionar={(titulo) => setHabitos((hs) => [...hs, { id: novoId("habito"), titulo }])}
            />
          )}
          {aba === "resumo" && <Resumo perfil={perfil} observacoes={doPerfil} feitos={feitos.size} totalHabitos={habitos.length} />}
        </div>
      </main>
    </div>
  );
}

function Perfis({ perfis, ativoId, onSelecionar, onAdicionar }: {
  perfis: Perfil[];
  ativoId: string;
  onSelecionar: (id: string) => void;
  onAdicionar: (nome: string, relacao: string) => void;
}) {
  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [relacao, setRelacao] = useState("");

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;
    onAdicionar(nome.trim(), relacao.trim() || "Familiar");
    setNome("");
    setRelacao("");
    setAberto(false);
  };

  return (
    <section aria-label="Perfis acompanhados" className="mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <Users className="size-5 text-accent" aria-hidden />
        {perfis.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelecionar(p.id)}
            aria-pressed={p.id === ativoId}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              p.id === ativoId ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-secondary",
            )}
          >
            {p.nome}
          </button>
        ))}
        <Button variant="outline" size="sm" onClick={() => setAberto(!aberto)} aria-expanded={aberto}>
          <Plus /> Adicionar perfil
        </Button>
      </div>
      {aberto && (
        <form onSubmit={enviar} className="mt-4 flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-4">
          <label className="text-sm font-medium">
            Nome
            <input required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Mãe" className="mt-1 block w-44 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          </label>
          <label className="text-sm font-medium">
            Relação
            <input value={relacao} onChange={(e) => setRelacao(e.target.value)} placeholder="Ex.: mãe, avô" className="mt-1 block w-44 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          </label>
          <Button type="submit" size="sm">Criar perfil</Button>
        </form>
      )}
    </section>
  );
}

function Registros({ observacoes, onAdicionar, onRemover }: {
  observacoes: Observacao[];
  onAdicionar: (o: Omit<Observacao, "id" | "perfilId">) => void;
  onRemover: (id: string) => void;
}) {
  const [pe, setPe] = useState<Pe>("esquerdo");
  const [regiaoId, setRegiaoId] = useState<string>(REGIOES_ACOMPANHAMENTO[4].id);
  const [tipo, setTipo] = useState<string>(TIPOS_OBSERVACAO[0]);
  const [data, setData] = useState(hoje);
  const [nota, setNota] = useState("");
  const [foto, setFoto] = useState<string | undefined>();
  const arquivoRef = useRef<HTMLInputElement>(null);

  const escolherFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (foto) URL.revokeObjectURL(foto);
    setFoto(arquivo ? URL.createObjectURL(arquivo) : undefined);
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nota.trim()) return;
    onAdicionar({ pe, regiaoId, tipo, data, nota: nota.trim(), foto });
    setNota("");
    setFoto(undefined);
    if (arquivoRef.current) arquivoRef.current.value = "";
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <form onSubmit={enviar} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-xl font-bold">Nova observação</h2>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Escolher pé">
          {(["esquerdo", "direito"] as Pe[]).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={pe === p}
              onClick={() => setPe(p)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium capitalize",
                pe === p ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-secondary",
              )}
            >
              Pé {p}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Região
            <select value={regiaoId} onChange={(e) => setRegiaoId(e.target.value)} className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              {REGIOES_ACOMPANHAMENTO.map((r) => <option key={r.id} value={r.id}>{r.nome}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium">
            Tipo
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              {TIPOS_OBSERVACAO.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium">
            Data
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          </label>
          <div className="text-sm font-medium">
            Foto (opcional)
            <label className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/60">
              <Camera className="size-4" aria-hidden />
              {foto ? "Trocar foto" : "Escolher foto"}
              <input ref={arquivoRef} type="file" accept="image/*" onChange={escolherFoto} className="sr-only" />
            </label>
          </div>
        </div>
        {foto && <img src={foto} alt="Prévia da foto escolhida" className="mt-3 h-28 w-auto rounded-xl border border-border object-cover" />}
        <label className="mt-4 block text-sm font-medium">
          O que você observou?
          <textarea
            required
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            rows={3}
            placeholder="Ex.: pele mais ressecada no calcanhar ao fim do dia"
            className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </label>
        <Button type="submit" className="mt-5"><Plus /> Registrar observação</Button>
        <p className="mt-3 text-xs text-muted-foreground">Registros educativos, sem diagnóstico. A foto fica apenas nesta sessão.</p>
      </form>

      <div className="flex flex-col rounded-3xl bg-secondary/60 p-6" aria-live="polite">
        <h2 className="text-xl font-bold">Histórico desta sessão</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {observacoes.length} {observacoes.length === 1 ? "observação registrada" : "observações registradas"}
        </p>
        <ul className="mt-5 flex-1 space-y-3">
          {observacoes.length === 0 && (
            <li className="rounded-xl border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
              Nenhuma observação ainda. Use o formulário ao lado para registrar a primeira.
            </li>
          )}
          {observacoes.map((o) => (
            <li key={o.id} className="rounded-xl bg-card p-4">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-primary">{o.tipo}</span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  {formatarData(o.data)}
                  <button onClick={() => onRemover(o.id)} aria-label="Remover observação" className="rounded-full p-1 hover:bg-secondary">
                    <Trash2 className="size-3.5" />
                  </button>
                </span>
              </div>
              <p className="mt-2 text-sm font-medium">{nomeRegiao(o.regiaoId)} · pé {o.pe}</p>
              <p className="mt-1 text-sm text-muted-foreground">{o.nota}</p>
              {o.foto && <img src={o.foto} alt={`Foto da observação em ${nomeRegiao(o.regiaoId)}`} className="mt-3 h-24 w-auto rounded-lg border border-border object-cover" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Rotina({ habitos, feitos, onAlternar, onAdicionar }: {
  habitos: Habito[];
  feitos: Set<string>;
  onAlternar: (id: string) => void;
  onAdicionar: (titulo: string) => void;
}) {
  const [novo, setNovo] = useState("");
  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novo.trim()) return;
    onAdicionar(novo.trim());
    setNovo("");
  };

  return (
    <div className="max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h2 className="text-xl font-bold">Rotina de cuidados de hoje</h2>
      <p className="mt-1 text-sm text-muted-foreground">{feitos.size} de {habitos.length} hábitos concluídos nesta sessão</p>
      <ul className="mt-5 space-y-2">
        {habitos.map((h) => {
          const feito = feitos.has(h.id);
          return (
            <li key={h.id}>
              <button
                onClick={() => onAlternar(h.id)}
                aria-pressed={feito}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                  feito ? "border-accent/40 bg-accent/10 text-foreground" : "border-border bg-background hover:bg-secondary/60",
                )}
              >
                <span className={cn("grid size-5 shrink-0 place-items-center rounded-full border", feito ? "border-accent bg-accent text-accent-foreground" : "border-border")}>
                  {feito && <Check className="size-3.5" />}
                </span>
                <span className={feito ? "line-through opacity-70" : undefined}>{h.titulo}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={enviar} className="mt-5 flex gap-2">
        <input value={novo} onChange={(e) => setNovo(e.target.value)} placeholder="Adicionar hábito personalizado" className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
        <Button type="submit" variant="outline" size="sm"><Plus /> Adicionar</Button>
      </form>
    </div>
  );
}

function Resumo({ perfil, observacoes, feitos, totalHabitos }: {
  perfil: Perfil;
  observacoes: Observacao[];
  feitos: number;
  totalHabitos: number;
}) {
  const [copiado, setCopiado] = useState(false);
  const texto = resumoTexto(perfil, observacoes, feitos, totalHabitos);

  const copiar = () => {
    void navigator.clipboard?.writeText(texto).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  };

  return (
    <div className="max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h2 className="text-xl font-bold">Resumo — {perfil.nome}</h2>
      <p className="mt-1 text-sm text-muted-foreground">Relação: {perfil.relacao}</p>
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between rounded-xl bg-secondary/60 px-4 py-3">
          <dt className="font-medium">Observações nesta sessão</dt>
          <dd className="font-bold">{observacoes.length}</dd>
        </div>
        <div className="flex justify-between rounded-xl bg-secondary/60 px-4 py-3">
          <dt className="font-medium">Rotina de hoje</dt>
          <dd className="font-bold">{feitos} de {totalHabitos} hábitos</dd>
        </div>
      </dl>
      {observacoes.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">Por região</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {contarPorRegiao(observacoes).map(([regiao, total]) => (
              <li key={regiao} className="flex justify-between rounded-lg bg-background px-4 py-2">
                <span>{regiao}</span>
                <span className="font-bold">{total}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={copiar} variant="outline" className="mt-6">
        <ClipboardCopy /> {copiado ? "Resumo copiado!" : "Copiar resumo em texto"}
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        O resumo é copiado para a sua área de transferência — você decide se e com quem compartilhar, por exemplo levando anotações a uma consulta.
      </p>
    </div>
  );
}
