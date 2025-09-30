import { addDays, differenceInDays } from 'date-fns';
import { formatInTimeZone, fromZonedTime } from 'date-fns-tz';
import { ENV } from '../../config/env';

export function serverToVM(b, userTZ) {
  const startUtc = new Date(b.startDateUtc); // gerçek UTC anı
  const endUtc = addDays(startUtc, b.numNights);
  const hotelTZ = b.hotelTimeZone;

  const startYmd_hotel = formatInTimeZone(startUtc, hotelTZ, 'yyyy-MM-dd');

  const endYmd_hotel = formatInTimeZone(endUtc, hotelTZ, 'yyyy-MM-dd');

  const endExUtc = fromZonedTime(new Date(`${endYmd_hotel}T00:00:00`), hotelTZ);

  const startYmd_user = formatInTimeZone(startUtc, userTZ, 'yyyy-MM-dd');
  const endYmd_user = formatInTimeZone(endUtc, userTZ, 'yyyy-MM-dd');

  return { ...b, startYmd_user, endYmd_user, startYmd_hotel, endYmd_hotel };
}

export function vmCreateToServer(newBooking) {
  const { pickedStart, pickedEnd, hotelTimeZone = ENV.TZ } = newBooking;

  const startYmdHotel = formatInTimeZone(
    pickedStart,
    hotelTimeZone,
    'yyyy-MM-dd',
  );
  const endYmdHotel = formatInTimeZone(pickedEnd, hotelTimeZone, 'yyyy-MM-dd');

  const startDateUtc = fromZonedTime(
    new Date(`${startYmdHotel}T00:00:00`),
    hotelTimeZone,
  ).toISOString();

  const endDateUtc = fromZonedTime(
    new Date(`${endYmdHotel}T00:00:00`),
    hotelTimeZone,
  );

  const numNights = differenceInDays(endDateUtc, startDateUtc);
  if (numNights <= 0) throw new Error('End must be after start.');

  return {
    ...newBooking,
    startDateUtc,
    numNights,
    hotelTimeZone,
  };
}
