import { useState } from "react";
import { cn } from "@/lib/utils";

type Pe = "esquerdo" | "direito";
type Vista = "planta" | "superior";
type Regiao = { id: string; nome: string; vistas: Vista[] };

const REGIOES: Regiao[] = [
  { id: "dedos", nome: "Dedos", vistas: ["planta", "superior"] },
  { id: "unhas", nome: "Unhas", vistas: ["superior"] },
  { id: "antepe", nome: "Parte anterior da planta", vistas: ["planta"] },
  { id: "arco", nome: "Arco plantar", vistas: ["planta"] },
  { id: "calcanhar", nome: "Calcanhar", vistas: ["planta"] },
  { id: "laterais", nome: "Laterais", vistas: ["planta", "superior"] },
  { id: "peito", nome: "Peito do pé", vistas: ["superior"] },
];

type Registro = { data: string; tipo: string; nota: string };
const DEMO: Record<string, Registro[]> = {
  "esquerdo-calcanhar": [
    { data: "12/09/2026", tipo: "Pele seca", nota: "Pele áspera ao final do dia." },
    { data: "03/10/2026", tipo: "Rachadura", nota: "Pequena fissura relatada, sem dor." },
  ],
  "direito-unhas": [{ data: "28/09/2026", tipo: "Alteração na unha", nota: "Unha do hálux mais espessa." }],
  "direito-arco": [{ data: "15/10/2026", tipo: "Dor relatada", nota: "Desconforto após caminhada longa." }],
  "esquerdo-dedos": [{ data: "20/10/2026", tipo: "Bolha", nota: "Atrito com calçado novo." }],
};

const SHAPES: Record<Vista, Record<string, string>> = {
  planta: {
    dedos: "M58 30 a14 16 0 1 1 28 0 a14 16 0 1 1 -28 0 M90 36 a10 12 0 1 1 20 0 a10 12 0 1 1 -20 0 M112 46 a8 10 0 1 1 16 0 a8 10 0 1 1 -16 0 M130 60 a7 9 0 1 1 14 0 a7 9 0 1 1 -14 0 M144 76 a6 8 0 1 1 12 0 a6 8 0 1 1 -12 0",
    antepe: "M52 70 Q100 52 150 92 L146 140 Q100 128 54 140 Z",
    arco: "M54 146 Q90 136 120 150 L116 220 Q86 214 62 222 Z",
    laterais: "M122 148 L146 146 Q144 200 132 236 L118 228 Z",
    calcanhar: "M62 228 Q90 218 130 240 Q136 300 96 304 Q58 300 62 228 Z",
  },
  superior: {
    unhas: "M64 26 h20 v14 h-20 Z M94 34 h14 v10 h-14 Z M115 44 h11 v9 h-11 Z M132 58 h10 v8 h-10 Z M146 74 h8 v7 h-8 Z",
    dedos: "M58 42 h32 v34 h-32 Z M92 46 h20 v30 h-20 Z M113 55 h16 v26 h-16 Z M130 68 h14 v20 h-14 Z M144 82 h12 v16 h-12 Z",
    peito: "M60 84 Q104 76 144 104 L132 230 Q96 238 70 230 Z",
    laterais: "M46 96 L58 90 L66 236 L52 240 Z M148 108 L160 112 L146 236 L134 232 Z",
  },
};

export function MapaVivo() {
  const [pe, setPe] = useState<Pe>("esquerdo");
  const [vista, setVista] = useState<Vista>("planta");
  const [sel, setSel] = useState<string>("calcanhar");

  const regioes = REGIOES.filter((r) => r.vistas.includes(vista));
  const atual = (regioes.find((r) => r.id === sel) ?? regioes[0])!;
  const registros = DEMO[`${pe}-${atual.id}`] ?? [];

  const trocarVista = (v: Vista) => {
    setVista(v);
    if (!REGIOES.find((r) => r.id === sel)?.vistas.includes(v)) setSel(v === "planta" ? "calcanhar" : "unhas");
  };

  return (
    <div className="grid gap-6 rounded-3xl border border-border bg-card p-5 shadow-soft md:grid-cols-[1fr_1.1fr] md:p-8">
      <div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Escolher pé">
          {(["esquerdo", "direito"] as Pe[]).map((p) => (
            <Toggle key={p} active={pe === p} onClick={() => setPe(p)}>Pé {p}</Toggle>
          ))}
          <span className="mx-1 w-px bg-border" />
          {(["planta", "superior"] as Vista[]).map((v) => (
            <Toggle key={v} active={vista === v} onClick={() => trocarVista(v)}>
              {v === "planta" ? "Planta" : "Vista superior"}
            </Toggle>
          ))}
        </div>
        <svg viewBox="30 10 150 300" className="mx-auto mt-6 h-80 w-auto" role="img" aria-label={`Mapa do pé ${pe}, ${vista}`}>
          <g transform={pe === "direito" ? "translate(210 0) scale(-1 1)" : undefined}>
            {regioes.map((r) => {
              const tem = !!DEMO[`${pe}-${r.id}`];
              const ativo = atual.id === r.id;
              return (
                <path
                  key={r.id}
                  d={SHAPES[vista][r.id]}
                  tabIndex={0}
                  role="button"
                  aria-label={`${r.nome}${tem ? ", possui registros" : ""}`}
                  aria-pressed={ativo}
                  onClick={() => setSel(r.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSel(r.id))}
                  className={cn(
                    "cursor-pointer stroke-card stroke-[2] outline-none transition-colors focus-visible:stroke-info focus-visible:stroke-[3]",
                    ativo ? "fill-accent" : tem ? "fill-highlight hover:fill-accent/70" : "fill-secondary hover:fill-accent/40",
                  )}
                />
              );
            })}
          </g>
        </svg>
        <div className="mt-4 flex justify-center gap-5 text-xs text-muted-foreground">
          <Legend className="bg-secondary" label="Sem registros" />
          <Legend className="bg-highlight" label="Com registros" />
          <Legend className="bg-accent" label="Selecionada" />
        </div>
      </div>

      <div className="flex flex-col rounded-2xl bg-secondary/60 p-6" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Pé {pe} · {vista === "planta" ? "planta" : "vista superior"}</p>
        <h3 className="mt-2 text-2xl font-bold">{atual.nome}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {registros.length} {registros.length === 1 ? "registro" : "registros"} de demonstração
        </p>
        <ul className="mt-5 flex-1 space-y-3">
          {registros.length === 0 && (
            <li className="rounded-xl border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
              Nenhuma observação nesta região. Experimente o calcanhar esquerdo ou as unhas do pé direito.
            </li>
          )}
          {registros.map((r) => (
            <li key={r.data} className="rounded-xl bg-card p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-primary">{r.tipo}</span>
                <span className="text-muted-foreground">{r.data}</span>
              </div>
              <p className="mt-2 text-sm">{r.nota}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <button disabled title="Disponível na área de acompanhamento" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground opacity-60">Adicionar observação</button>
          <button disabled title="Disponível na área de acompanhamento" className="rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary opacity-60">Ver histórico</button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Demonstração com dados fictícios. Os registros não representam diagnóstico.</p>
      </div>
    </div>
  );
}

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors",
        active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("h-3 w-3 rounded-full", className)} /> {label}
    </span>
  );
}
