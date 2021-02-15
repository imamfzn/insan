const Joi = require('joi');
const validateRequest = require('../validate-request');

module.exports = validateRequest(
  Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required().min(4),
    password: Joi.string().required().min(8),
    email: Joi.string().email(),
    address: Joi.string(),
    phone: Joi.string(),
  })
);
