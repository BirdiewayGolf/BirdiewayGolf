export function formatScore(score: number | undefined): string {
  if (typeof score !== 'number' || isNaN(score)) return '-';
  return score.toString();
}

export function formatRelativeToPar(score: number | undefined, coursePar: number): string {
  if (typeof score !== 'number' || isNaN(score)) return '-';
  const relativeToPar = score - coursePar;
  if (relativeToPar === 0) return 'E';
  return relativeToPar > 0 ? `+${relativeToPar}` : relativeToPar.toString();
}

export function getScoreClass(score: number | undefined, coursePar: number): string {
  if (typeof score !== 'number' || isNaN(score)) return 'text-gray-500';
  const relativeToPar = score - coursePar;
  if (relativeToPar === 0) return 'text-gray-900';
  return relativeToPar > 0 ? 'text-red-600' : 'text-green-600';
}