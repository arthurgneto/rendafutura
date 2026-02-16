export function analisarFundamentos(f: any) {
  let score = 0;

  if (f.pl < 12) score++;
  if (f.dy > 5) score++;
  if (f.roe > 15) score++;
  if (f.divida < 2) score++;
  if (f.margem > 10) score++;

  if (score >= 4) return "🟢";
  if (score >= 2) return "🟡";
  return "🔴";
}
