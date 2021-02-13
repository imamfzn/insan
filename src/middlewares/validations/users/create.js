const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required().min(4),
    password: Joi.string().required().min(8),
    email: Joi.string().email(),
    address: Joi.string(),
    phone: Joi.string(),
  })
});
