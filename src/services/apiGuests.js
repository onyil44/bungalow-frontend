import axios from './axiosCRUDServer';

export const getGuets = async function (filter, sort, page, limit) {
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
      url: `guests?${queryString}`,
    });
    return { guests: data.data.docs, count: data.allDocsNumber };
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export async function updateGuest(guestId, dataObj) {
  try {
    if (dataObj._id) delete dataObj._id;
    await axios({
      method: 'PATCH',
      url: `guests/${guestId}`,
      data: dataObj,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function createGuest(data) {
  try {
    await axios({
      method: 'POST',
      url: `guests`,
      data: data,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function getGuset(id) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `guests/${id}`,
    });
    return data.data.doc;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function getGuestDropdown(search) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `guests?fullName[regex]=${search}`,
    });
    return data.data.docs;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function restoreGuests() {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `guests/reloadGuestsData`,
    });
    return data.message;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}
