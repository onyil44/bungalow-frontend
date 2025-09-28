import axios from './axiosCRUDServer';
import { getTodayUtc, getUserTimeZone } from '../utils/time';

export const getBookings = async function (filter, sort, page, limit) {
  try {
    const sortQueryString = sort ? `sort=${sort}` : '';
    const limitQueryString = limit ? `limit=${limit}` : '';
    const pageQueryString = page ? `page=${page}` : '';
    const queryString = [
      filter,
      sortQueryString,
      limitQueryString,
      pageQueryString,
    ]
      .filter((el) => el !== '')
      .join('&');

    const { data } = await axios({
      method: 'GET',
      url: `bookings?${queryString}&populate=cabinId:name;guestId:fullName,email,nationalId`,
    });
    return { bookings: data.data.docs, count: data.allDocsNumber };
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

// The occupaid days data of a cabin is important as a new booking is being created or an booking being updated. The occupaid days will be shown as disabled on the calendar. When a booking updating, the actual booking days of current booking should not be shown as disabled.
export const getCabinOccupaidDays = async function (cabinId) {
  if (!cabinId) return null;
  try {
    const { data } = await axios({
      method: 'GET',
      url: `bookings?cabinId=${cabinId}&fields=startDateUtc,numNights&populate=guestId:fullName`,
    });
    return data.data.docs;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const getCabinOccupaidDaysForGuests = async function (cabinId) {
  if (!cabinId) return null;
  try {
    const { data } = await axios({
      method: 'GET',
      url: `bookings/getOccupaidDays/${cabinId}`,
    });
    return data.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export async function getBooking(id) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `bookings/${id}?populate=cabinId:name;guestId:fullName,email,nationalId`,
    });
    return data.data.doc;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function getBookingWithPnr(pnrCode, email, nationalId) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `bookings/bookingFromPnr?email=${email}&nationalId=${nationalId}&pnrCode=${pnrCode}`,
    });

    return data.data.booking;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function updateBooking(bookingId, dataObj) {
  try {
    if (dataObj._id) delete dataObj._id;
    await axios({
      method: 'PATCH',
      url: `bookings/${bookingId}`,
      data: dataObj,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function deleteBooking(bookingId) {
  try {
    await axios({
      method: 'DELETE',
      url: `bookings/${bookingId}`,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `bookings?createdAt[gte]=${date}&createdAt[lte]=${getTodayUtc(getUserTimeZone(), true)}&fields=createdAt,totalPrice,extraPrice`,
    });

    return data.data.docs;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `bookings?startDateUtc[gte]=${date}&startDateUtc[lte]=${getTodayUtc(getUserTimeZone())}&populate=guestId:fullName`,
    });

    return data.data.docs;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

// Daily booking statics requested from back end. The data created via aggregation pipeline.
export async function getDailyBookingStats(date) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `bookings/getDailyStats?firstDate=${date}&lastDate=${getTodayUtc(getUserTimeZone(), true)}`,
    });

    return data.data.stats;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `bookings?filter={"$or":[{"status":"unconfirmed","startDateUtc":{"$gte":"${getTodayUtc(process.env.TZ).toISOString()}","$lte":"${getTodayUtc(process.env.TZ, true).toISOString()}"}},{"status":"checked-in","endDateUtc":{"$gte":"${getTodayUtc(process.env.TZ).toISOString()}","$lte":"${getTodayUtc(process.env.TZ, true).toISOString()}"}}]}&populate=guestId:fullName`,
    });
    return data.data.docs;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function createBooking(data) {
  try {
    const guestData = {
      fullName: data.fullName,
      email: data.email,
      nationality: data.nationality,
      nationalId: data.nationalId,
    };

    const { data: guest } = await axios({
      method: 'POST',
      url: 'guests',
      data: guestData,
    });

    const bookingData = {
      startDateUtc: data.startDateUtc,
      numNights: data.numNights,
      numGuests: data.numGuests,
      hotelTimeZone: data.hotelTimeZone,
      hasBreakfast: data.hasBreakfast,
      observations: data.observations,
      cabinId: data.cabinId,
      guestId: guest.data.guest._id,
    };

    const { data: booking } = await axios({
      method: 'POST',
      url: 'bookings',
      data: bookingData,
    });
    return booking.data.populatedNewBooking;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function restoreBookings() {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `bookings/reloadBookingsData`,
    });
    return data.message;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}
