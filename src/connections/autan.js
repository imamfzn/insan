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

    if (res.status != 201){
      throw new Error("Can't create new user to autan");
    }

    return res.data;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  register,
};
