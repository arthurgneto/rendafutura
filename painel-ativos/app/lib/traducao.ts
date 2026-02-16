export function traduzir(f: any) {
  return {
    pl: `P/L ${f.pl} → a empresa se paga em ${f.pl} anos`,
    dy: `DY ${f.dy}% → paga ${f.dy}% ao ano`,
    divida: f.divida < 2
      ? "Dívida baixa → empresa saudável"
      : "Dívida alta → atenção",
    roe: `ROE ${f.roe}% → eficiência de lucro`,
    margem: `Margem ${f.margem}% → sobra de lucro`
  };
}
