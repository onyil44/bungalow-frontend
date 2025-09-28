import axios from './axiosCRUDServer';

export const getSettings = async function (isActive = false) {
  try {
    const query = isActive ? 'isActive=true' : '';
    const { data } = await axios({
      method: 'GET',
      url: `settings?${query}`,
    });
    return data.data.docs;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const createSettings = async function (settingsData) {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `settings`,
      data: settingsData,
    });
    return data.data.docs;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const deleteNotActiveSettings = async function () {
  try {
    await axios({
      method: 'DELETE',
      url: `settings`,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};
