import { addDays } from 'date-fns';

export function getEndExclusive(startDateUtc, numNights) {
  return addDays(startDateUtc, numNights);
}

export function overlapsUtc(a, b) {
  const aStart = a.startDateUtc;
  const aEnd = getEndExclusive(a.startDateUtc, a.numNights);
  const bStart = b.startDateUtc;
  const bEnd = getEndExclusive(b.startDateUtc, b.numNights);

  return !(aEnd <= bStart || bEnd <= aStart);
}

export function anyOverlapUtc(existing, candidate) {
  return existing.some((stay) => overlapsUtc(stay, candidate));
}
