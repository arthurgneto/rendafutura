export async function buscarTicker(ticker: string) {
  const r = await fetch(
    `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}.SA?modules=financialData,defaultKeyStatistics,summaryDetail,summaryProfile`
  );

  const json = await r.json();
  return json.quoteSummary.result[0];
}
