import {
  addDays,
  differenceInDays,
  eachDayOfInterval,
  formatDistance,
  parseISO,
} from 'date-fns';
import { trMidnightUtc } from './tz-helpers';
import { getUserTimeZone, userPickToHotelUtcMidnight } from './time';
import { anyOverlapUtc } from './time-overlap';

export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value,
  );

export function getDisabledDates(bookings, { disableCheckInDay = false } = {}) {
  return bookings.flatMap((b) => {
    const start0 = trMidnightUtc(b.startDate);
    const first = addDays(start0, disableCheckInDay ? 0 : 1);
    const lastInclusive = addDays(start0, b.numNights - 1);

    return eachDayOfInterval({ start: first, end: lastInclusive });
  });
}

export function anyOverLappingDaysWithOccupaidDays({
  bookings,
  startDate,
  endDate,
}) {
  const selStart0 = trMidnightUtc(startDate);
  const selEnd0 = trMidnightUtc(endDate);

  return bookings.some((b) => {
    const bStart0 = trMidnightUtc(b.startDate);
    const bEnd0 = addDays(bStart0, b.numNights);
    return bStart0 < selEnd0 && selStart0 < bEnd0;
  });
}

export function isUserRangeOverlapping(
  pickStart,
  pickEnd,
  userTZ,
  hotelTZ,
  existingUtc,
) {
  const startUtc = userPickToHotelUtcMidnight(pickStart, userTZ, hotelTZ);
  const endUtc = userPickToHotelUtcMidnight(pickEnd, userTZ, hotelTZ);
  const numNights = Math.round((+endUtc - +startUtc) / (24 * 3600 * 1000));

  const candidate = { startDateUtc: startUtc, numNights };

  const normalized = existingUtc.map((b) => ({
    startDateUtc: new Date(b.startDateUtc),
    numNights: b.numNights,
  }));

  return anyOverlapUtc(normalized, candidate);
}

export const safeParseDate = function (dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
};

export const createNumGuestArray = function (cabin = {}) {
  return cabin
    ? [
        ...Array.from({ length: cabin.maxCapacity }).map((_, i) => {
          return { value: i + 1, label: `${i + 1}` };
        }),
      ]
    : [];
};

export function calculateDayCount(pickedStart, pickedEnd) {
  return pickedStart && pickedEnd
    ? differenceInDays(
        userPickToHotelUtcMidnight(
          new Date(pickedEnd),
          getUserTimeZone(),
          process.env.TZ,
        ),
        userPickToHotelUtcMidnight(
          new Date(pickedStart),
          getUserTimeZone(),
          process.env.TZ,
        ),
      )
    : null;
}

export function calculateDailyPrice(cabin) {
  return cabin
    ? cabin.discount
      ? Number(cabin.regularPrice) - Number(cabin.discount)
      : Number(cabin.regularPrice)
    : 0;
}

export function calculateCabinPrice(dayCount, dailyPrice) {
  return dayCount && dailyPrice ? dailyPrice * dayCount : 0;
}

export function calculateExtraPrice(
  dayCount,
  numGuests,
  breakfastPrice,
  hasBreakfast = false,
) {
  return (hasBreakfast ? Number(breakfastPrice) : 0) * numGuests * dayCount;
}

export function calculateTotalPrice(
  dayCount,
  numGuests,
  dailyPrice,
  breakfastPrice,
  hasBreakfast = false,
) {
  const cabinPirce = calculateCabinPrice(dayCount, dailyPrice);
  const extraPrice = calculateExtraPrice(
    dayCount,
    numGuests,
    breakfastPrice,
    hasBreakfast,
  );
  return cabinPirce + extraPrice;
}
