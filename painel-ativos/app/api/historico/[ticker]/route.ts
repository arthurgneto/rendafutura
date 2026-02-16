import YahooFinance from "yahoo-finance2";
import { NextResponse } from "next/server";

const yahoo = new YahooFinance();

export async function GET(req: any, ctx: any) {
  const { ticker } = await ctx.params;

  const lista = ticker.split(",");

  const agora = Math.floor(Date.now() / 1000);
  const tresAnos = agora - 60 * 60 * 24 * 365 * 3;

  const datasets: any[] = [];
  let baseResult: any[] | null = null;

  for (const t of lista) {
    const dados = await yahoo.chart(`${t}.SA`, {
      period1: tresAnos,
      period2: agora,
      interval: "1d"
    });

    const result = dados?.quotes;
    if (!result) continue;

    // guarda o primeiro ticker como referência dos labels
    if (!baseResult) baseResult = result;

    datasets.push({
      label: t,
      data: result.map((q: any) => q.close)
    });
  }

  if (!baseResult) {
    return NextResponse.json(null);
  }

  const labels: string[] = [];
  const hoje = new Date();

  for (let i = 0; i < baseResult.length; i++) {
    const data = new Date(baseResult[i].date);

    const mesmoMes =
      data.getMonth() === hoje.getMonth() &&
      data.getFullYear() === hoje.getFullYear();

    if (mesmoMes) {
      // mês atual → dias
      labels.push(data.getDate().toString());
    } else {
      // meses passados → mês/ano
      labels.push(
        data.toLocaleDateString("pt-BR", {
          month: "short",
          year: "2-digit"
        })
      );
    }
  }

  return NextResponse.json({ labels, datasets });
}
