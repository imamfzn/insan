const Joi = require('joi');
const validateRequest = require('../validate-request');

module.exports = validateRequest(
  Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    address: Joi.string(),
    phone: Joi.string(),
  })
);
