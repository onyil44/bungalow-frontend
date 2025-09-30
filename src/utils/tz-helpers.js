// utils/tz.ts
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';
import { ENV } from '../../config/env';

export const TZ = ENV.TZ || 'Europe/Istanbul';

export function ymdTR(dateLike) {
  return formatInTimeZone(new Date(dateLike), TZ, 'yyyy-MM-dd');
}

export function trMidnightUtc(dateLike) {
  const ymd = ymdTR(dateLike);
  return fromZonedTime(`${ymd}T00:00:00`, TZ);
}
