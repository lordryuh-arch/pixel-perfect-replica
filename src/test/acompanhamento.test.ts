import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { contarPorRegiao, resumoTexto, type Observacao, type Perfil } from "@/lib/acompanhamento";

const perfil: Perfil = { id: "p1", nome: "Maria", relacao: "Mãe" };

const obs = (parcial: Partial<Observacao>): Observacao => ({
  id: "o1",
  perfilId: "p1",
  pe: "esquerdo",
  regiaoId: "calcanhar",
  tipo: "Pele seca",
  data: "2026-10-20",
  nota: "Pele áspera ao fim do dia.",
  ...parcial,
});

describe("Área de acompanhamento local", () => {
  it("agrupa a contagem de observações por nome da região, da maior para a menor", () => {
    const resultado = contarPorRegiao([
      obs({ id: "a" }),
      obs({ id: "b", regiaoId: "unhas" }),
      obs({ id: "c" }),
    ]);
    expect(resultado).toEqual([
      ["Calcanhar", 2],
      ["Unhas", 1],
    ]);
  });

  it("monta o resumo com perfil, contagens, último registro e aviso educativo", () => {
    const texto = resumoTexto(perfil, [obs({}), obs({ id: "b", regiaoId: "unhas", data: "2026-10-22" })], 2, 4);
    expect(texto).toContain("Maria (Mãe)");
    expect(texto).toContain("Observações registradas nesta sessão: 2");
    expect(texto).toContain("- Calcanhar: 1");
    expect(texto).toContain("Último registro: 22/10/2026");
    expect(texto).toContain("Rotina de hoje: 2 de 4 hábitos concluídos");
    expect(texto).toContain("sem diagnóstico");
  });

  it("resumo sem observações informa zero e não inventa último registro", () => {
    const texto = resumoTexto(perfil, [], 0, 4);
    expect(texto).toContain("Observações registradas nesta sessão: 0");
    expect(texto).not.toContain("Último registro");
  });

  it("a área local nunca usa armazenamento do navegador nem chama backend", () => {
    const fontes = ["src/routes/acompanhamento.tsx", "src/lib/acompanhamento.ts"].map((f) =>
      readFileSync(resolve(__dirname, "..", "..", f), "utf8"),
    );
    for (const fonte of fontes) {
      expect(fonte).not.toMatch(/localStorage|sessionStorage|indexedDB|document\.cookie/);
      expect(fonte).not.toMatch(/fetch\(|createServerFn|supabase/);
    }
  });
});
