import axios from './axiosCRUDServer';

export const getUsers = async function (filter, sort, page, limit) {
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
      url: `users?${queryString}`,
    });
    return { users: data.data.docs, count: data.allDocsNumber };
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export async function updateUser(userId, dataObj) {
  try {
    if (dataObj._id) delete dataObj._id;
    await axios({
      method: 'PATCH',
      url: `users/${userId}`,
      data: dataObj,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function createUser(data) {
  try {
    await axios({
      method: 'POST',
      url: `users`,
      data: data,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function resetUserPassword(userId) {
  try {
    await axios({
      method: 'PATCH',
      url: `users/resetUserPassword/${userId}`,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}

export async function deleteUser(userId) {
  try {
    await axios({
      method: 'DELETE',
      url: `users/${userId}`,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
}
