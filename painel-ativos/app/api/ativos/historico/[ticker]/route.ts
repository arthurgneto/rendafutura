import YahooFinance from "yahoo-finance2";
import { NextResponse } from "next/server";

const yahoo = new YahooFinance();

export async function GET(_: any, { params }: any) {
  const { ticker } = params;

  try {
    const dados = await yahoo.chart(`${ticker}.SA`, {
      period1: "6mo",
      interval: "1d"
    });

    if (!dados || !dados.quotes || dados.quotes.length === 0) {
      return NextResponse.json(null);
    }

    const labels = dados.quotes.map((q: any) =>
      new Date(q.date).toLocaleDateString()
    );

    const valores = dados.quotes.map((q: any) => q.close);

    return NextResponse.json({
      labels,
      datasets: [
        {
          label: ticker,
          data: valores
        }
      ]
    });
  } catch {
    return NextResponse.json(null);
  }
}
