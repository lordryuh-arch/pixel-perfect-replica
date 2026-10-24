// Área de acompanhamento local: tudo vive apenas em estado React (memória da
// sessão). Nada é salvo em banco de dados nem em armazenamento do navegador.

export type Pe = "esquerdo" | "direito";

export type Perfil = {
  id: string;
  nome: string;
  relacao: string;
};

export type Observacao = {
  id: string;
  perfilId: string;
  pe: Pe;
  regiaoId: string;
  tipo: string;
  data: string; // AAAA-MM-DD
  nota: string;
  foto?: string; // URL de objeto em memória (createObjectURL)
};

export type Habito = {
  id: string;
  titulo: string;
};

export const REGIOES_ACOMPANHAMENTO = [
  { id: "dedos", nome: "Dedos" },
  { id: "unhas", nome: "Unhas" },
  { id: "antepe", nome: "Parte anterior da planta" },
  { id: "arco", nome: "Arco plantar" },
  { id: "calcanhar", nome: "Calcanhar" },
  { id: "laterais", nome: "Laterais" },
  { id: "peito", nome: "Peito do pé" },
] as const;

export const TIPOS_OBSERVACAO = [
  "Pele seca",
  "Rachadura",
  "Bolha",
  "Vermelhidão",
  "Alteração na unha",
  "Dor relatada",
  "Outro",
] as const;

export const HABITOS_PADRAO: Habito[] = [
  { id: "examinar", titulo: "Examinar os pés com calma" },
  { id: "hidratar", titulo: "Hidratar a pele dos pés" },
  { id: "secar", titulo: "Secar bem entre os dedos" },
  { id: "calcado", titulo: "Usar calçado confortável e adequado" },
];

export function nomeRegiao(regiaoId: string): string {
  return REGIOES_ACOMPANHAMENTO.find((r) => r.id === regiaoId)?.nome ?? regiaoId;
}

export function contarPorRegiao(observacoes: Observacao[]): [string, number][] {
  const contagem = new Map<string, number>();
  for (const o of observacoes) contagem.set(o.regiaoId, (contagem.get(o.regiaoId) ?? 0) + 1);
  return [...contagem.entries()]
    .map(([id, total]) => [nomeRegiao(id), total] as [string, number])
    .sort((a, b) => b[1] - a[1]);
}

const AVISO_EDUCATIVO =
  "Conteúdo educativo, sem diagnóstico. Em caso de feridas, dor intensa ou sinais de infecção, procure um profissional de saúde.";

export function resumoTexto(
  perfil: Perfil,
  observacoes: Observacao[],
  habitosFeitos: number,
  totalHabitos: number,
): string {
  const linhas = [
    `Resumo de acompanhamento — ${perfil.nome} (${perfil.relacao})`,
    `Observações registradas nesta sessão: ${observacoes.length}`,
  ];
  for (const [regiao, total] of contarPorRegiao(observacoes)) {
    linhas.push(`- ${regiao}: ${total}`);
  }
  const ultima = [...observacoes].sort((a, b) => b.data.localeCompare(a.data))[0];
  if (ultima) {
    linhas.push(
      `Último registro: ${formatarData(ultima.data)} — ${ultima.tipo} (${nomeRegiao(ultima.regiaoId)}, pé ${ultima.pe})`,
    );
  }
  linhas.push(`Rotina de hoje: ${habitosFeitos} de ${totalHabitos} hábitos concluídos`);
  linhas.push(AVISO_EDUCATIVO);
  return linhas.join("\n");
}

export function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}
