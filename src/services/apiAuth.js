import axios from './axiosAuthServer';
import axiosCRUD from './axiosCRUDServer';

export const login = async function ({ email, password }) {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `auth/login`,
      data: { email, password },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const getCurrentUser = async function () {
  try {
    const { data } = await axiosCRUD({
      method: 'GET',
      url: `users/me`,
    });

    return data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const logout = async function () {
  try {
    await axios({
      method: 'POST',
      url: `auth/logout`,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const activateAccount = async function ({
  password,
  passwordConfirm,
  token,
}) {
  try {
    await axios({
      method: 'PATCH',
      url: `auth/createNewPasswordAndActivateUser/${token}`,
      data: { password, passwordConfirm },
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const updateMe = async function (formData) {
  try {
    await axios({
      method: 'PATCH',
      url: 'auth/updateMe',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const updatePassword = async function (data) {
  try {
    await axios({
      method: 'PATCH',
      url: 'auth/updatePassword',
      data: data,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const receptionistAutoLogin = async function () {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `auth/receptionistAutoLogin`,
      data: { email: '', password: '' },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};

export const managerAutoLogin = async function () {
  try {
    const { data } = await axios({
      method: 'POST',
      url: `auth/managerAutoLogin`,
      data: { email: '', password: '' },
    });

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
  }
};
