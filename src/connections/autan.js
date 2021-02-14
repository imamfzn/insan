const axios = require('axios');

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
    const res = await autan.put('/users', payload);

    return res.data;
  } catch (err) {
    if (err.response) {
      let error;

      if (err.response.status === 409) {
        error = new Error('user aleady taken.');
        error.statusCode = 409;
      } else {
        error = new Error(err.response.data.message || err.response.data);
        error.statusCode = err.response.status;
      }

      throw error;
    }

    throw new Error("can't create new user.");
  }
}

async function get(id) {
  try {
    const { data } = await autan.get(`/users/${id}`);
    return data;
  } catch (err) {
    if (err.response) {
      const error = new Error(err.response.data.message || err.response.data);
      error.statusCode = err.response.status;
      throw error;
    }

    console.error(err);
    throw new Error("can't get user.");
  }
}

async function destroy(id) {
  try {
    await autan.delete(`/users/${id}`);
  } catch (err) {
    if (err.response) {
      const error = new Error(err.response.data.message || err.response.data);
      error.statusCode = err.response.status;
      throw error;
    }

    console.error(err);
    throw new Error("can't delete user.");
  }
}

module.exports = {
  get,
  register,
  destroy,
  delete: destroy,
};
