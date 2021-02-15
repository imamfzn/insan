const axios = require('axios');
const error = require('../lib/error');

const autan = axios.create({
  baseURL: process.env.AUTAN_URL,
  timeout: 5000,
  auth: {
    username: process.env.AUTAN_BASIC_USER,
    password: process.env.AUTAN_BASIC_PASSWORD,
  },
});

async function register(payload) {
  try {
    const { data } = await autan.post('/users', payload);
    return data;
  } catch (err) {
    if (!err.response) {
      throw new error.InsanError('Can\'t create new user');
    }

    if (err.response.status === 409) {
      throw new error.UserAlreadyUsedError();
    }

    throw new error.InsanError(
      err.response.data.message || err.response.data,
      err.response.status,
    );
  }
}

async function get(id) {
  try {
    const { data } = await autan.get(`/users/${id}`);
    return data;
  } catch (err) {
    if (!err.response) {
      throw new error.InsanError('Can\'t reterive user');
    }

    if (err.response.status === 404) {
      throw new error.UserNotFoundError();
    }

    throw new error.InsanError(
      err.response.data.message || err.response.data,
      err.response.status,
    );
  }
}

async function remove(id) {
  try {
    await autan.delete(`/users/${id}`);
  } catch (err) {
    if (!err.response) {
      throw new error.InsanError('Can\'t remove user');
    }

    throw new error.InsanError(
      err.response.data.message || err.response.data,
      err.response.status,
    );
  }
}

module.exports = {
  get,
  register,
  remove,
};
