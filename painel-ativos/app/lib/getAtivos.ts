import ativos from "../data/ativos.json";
import { analisarFundamentos } from "./analiseFundamental";
import { traduzir } from "./traducao";
import { pegarFundamentos } from "./fundamentos";

export async function getAtivos() {
  const resultados = await Promise.all(
    ativos.slice(0, 10).map(async (a: any) => {
      const fundamentos = await pegarFundamentos(a.ticker);

      if (!fundamentos) {
        return {
          ticker: a.ticker,
          score: "🔴",
          fundamentos: {},
          resumo: "Erro ao buscar fundamentos"
        };
      }

      const score = analisarFundamentos(fundamentos);
      const traducao = traduzir(fundamentos);

      return {
        ticker: a.ticker,
        score,
        fundamentos: traducao,
        resumo: "Fundamentos reais da empresa"
      };
    })
  );

  return resultados;
}
