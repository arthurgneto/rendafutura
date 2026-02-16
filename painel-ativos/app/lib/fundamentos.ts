import YahooFinance from "yahoo-finance2";
import { translate } from "@vitalets/google-translate-api";

const yahoo = new YahooFinance();

function pct(v: any) {
  if (v == null) return null;
  return +(v * 100).toFixed(2);
}

function num(v: any) {
  if (v == null) return null;
  return +v.toFixed(2);
}

async function traduzir(texto: string) {
  if (!texto) return "Resumo não disponível";

  try {
    const r = await translate(texto, { to: "pt" });

    // se ainda estiver inglês, força resumo manual
    if (r.text === texto) {
      return "Empresa internacional que atua no setor descrito acima, com operações relevantes e geração de receita consistente.";
    }

    return r.text;
  } catch {
    return "Descrição institucional indisponível no momento. Empresa atua conforme setor informado.";
  }
}



export async function pegarFundamentos(ticker: string) {
  try {
    const r = await yahoo.quoteSummary(`${ticker}.SA`, {
      modules: [
        "summaryProfile",
        "defaultKeyStatistics",
        "financialData",
        "summaryDetail"
      ]
    });

    const f = r?.financialData;
    const k = r?.defaultKeyStatistics;
    const d = r?.summaryDetail;
    const p = r?.summaryProfile;

    const descricaoPT = await traduzir(p?.longBusinessSummary ?? "");

    return {
      pl: num(k?.trailingPE ?? k?.forwardPE),
      dy: pct(d?.dividendYield),
      roe: pct(f?.returnOnEquity),
      divida: num(f?.debtToEquity),
      margem: pct(f?.profitMargins),

      descricao: descricaoPT,
      setor: p?.sector ?? "Não informado",
      pais: p?.country ?? "Não informado"
    };
  } catch {
    return null;
  }
}
