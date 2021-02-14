const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    address: Joi.string(),
    phone: Joi.string(),
  })
});
