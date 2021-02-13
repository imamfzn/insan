const axios = require('axios');

const autan = axios.create({
  baseURL: "http://localhost:3000/_internal/",
  timeout: 5000,
  auth: {
    username: process.env.AUTAN_BASIC_USER,
    password: process.env.AUTAN_BASIC_PASSWORD,
  }
});

async function register(payload){
  try {
    const res = await autan.put('/users', payload);

    return res.data;
  } catch (err) {
    if (err.response) {
      let error;

      if (err.response.status == 422) {
        error = new Error("user aleady taken.");
        error.statusCode = 422;
      } else {
        error = new Error(err.response.data.message || err.response.data);
        error.statusCode = err.response.status;
      }

      throw error;
    }

    throw new Error("can't create new user.");
  }
}

module.exports = {
  register,
};
