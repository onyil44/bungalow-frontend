import axios from './axiosCRUDServer';

export const getCabins = async function (cabinIds = null) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `cabins?${cabinIds ? `_id=${cabinIds}` : ''}`,
    });
    return data.data.docs;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const getCabin = async function (cabinId) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `cabins/${cabinId}`,
    });
    return data.data.doc;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const deleteCabin = async function (id) {
  try {
    await axios({
      method: 'DELETE',
      url: `cabins/${id}`,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const createCabin = async function (formData) {
  try {
    const images = formData.getAll('images');
    const hasNewImage =
      images && images.length > 0 && images.some((file) => file.size > 0);

    const imageFormData = new FormData();

    if (hasNewImage) {
      images.forEach((el) => imageFormData.append('images', el));
      formData.delete('images');
    }

    const notFileContainsData = {};
    formData.forEach((value, key) => (notFileContainsData[key] = value));

    const newCabinData = await axios({
      method: 'POST',
      url: `cabins`,
      data: notFileContainsData,
    });

    if (hasNewImage) {
      const newCabinId = newCabinData.data.data.newDocument._id;

      await axios({
        method: 'PATCH',
        url: `cabins/${newCabinId}`,
        data: imageFormData,
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const updateCabin = async function (formData) {
  const cabinId = formData.get('cabinId');
  formData.delete('cabinId');

  const images = formData.getAll('images');
  const hasNewImage =
    images && images.length > 0 && images.some((file) => file.size > 0);

  let submitData;

  if (hasNewImage) {
    submitData = formData;
  } else {
    submitData = {};
    formData.forEach((value, key) => (submitData[key] = value));
  }

  try {
    await axios({
      method: 'PATCH',
      url: `cabins/${cabinId}`,
      data: submitData,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const restoreCabins = async function () {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `cabins/reloadCabinsData`,
    });
    return data.message;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};
