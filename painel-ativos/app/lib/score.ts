export function calcularScore(f: any) {
  let score = 0;

  if (f.pl < 10) score += 2;
  else if (f.pl < 20) score += 1;

  if (f.roe > 15) score += 2;
  else if (f.roe > 8) score += 1;

  if (f.dy > 6) score += 2;
  else if (f.dy > 3) score += 1;

  if (f.divida === 0) score += 2;

  return score;
}
