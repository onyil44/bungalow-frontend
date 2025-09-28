import { addDays, eachDayOfInterval } from 'date-fns';
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';

export function getUserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}

export function toHotelYmdFromUserPick(d, hotelTZ) {
  return formatInTimeZone(d, hotelTZ, 'yyyy-MM-dd');
}

export function hotelYmdToUtcMidnight(hotelYmd, hotelTZ) {
  return fromZonedTime(`${hotelYmd}T00:00:00`, hotelTZ);
}

export function userPickToHotelUtcMidnight(d, userTZ, hotelTZ) {
  const ymd = toHotelYmdFromUserPick(d, hotelTZ);
  return hotelYmdToUtcMidnight(ymd, hotelTZ);
}

export function utcMidnightToYmdInZone(utcMid, tz) {
  const d = typeof utcMid === 'string' ? new Date(utcMid) : utcMid;
  return formatInTimeZone(d, tz, 'yyyy-MM-dd');
}

export function daysInStayUtc(startUtc, numNights) {
  if (!startUtc || numNights <= 0) return [];
  return eachDayOfInterval({
    start: startUtc,
    end: addDays(startUtc, numNights - 1),
  });
}

export function ymdInZoneToUtcDate(ymd, tz) {
  // new Date("YYYY-MM-DD") kullanma!
  return fromZonedTime(new Date(`${ymd}T00:00:00`), tz);
}

export function daysInStayInTimeZone(startUtc, numNights, userTZ) {
  const daysUtc = daysInStayUtc(startUtc, numNights);
  return daysUtc.map((d) => formatInTimeZone(d, userTZ, 'yyyy-MM-dd'));
}

export function daysNotAvaliableInTimeZone(startUtc, numNights, userTZ) {
  if (!startUtc || numNights <= 0) return [];
  const daysUtc = eachDayOfInterval({
    start: addDays(startUtc, 1),
    end: addDays(startUtc, numNights - 1),
  });
  return daysUtc.map((d) => formatInTimeZone(d, userTZ, 'yyyy-MM-dd'));
}

export function getTodayUtc(userTZ, end = false) {
  const now = new Date();
  const local = new Date(now);

  if (end) local.setHours(23, 59, 59, 999);
  else local.setHours(0, 0, 0, 0);

  return fromZonedTime(local, userTZ);
}

export function disabledDatesForDatePicker(startUtc, numNights, userTZ) {
  const daysUtc = daysInStayUtc(startUtc, numNights);
  const ymdKeys = daysUtc.map((d) => formatInTimeZone(d, userTZ, 'yyyy-MM-dd'));
  return ymdKeys.map((k) => fromZonedTime(new Date(`${k}T00:00:00`), userTZ));
}
