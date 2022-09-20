const Joi = require("joi");

const userValid = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name:Joi.string().optional(),
  subscription: Joi.string().optional(),
  token: Joi.string().optional(),
});

const cardValid = Joi.object({
  title: Joi.string().email().required(),
  difficulty: Joi.string().required(),
  category:Joi.string().optional(),
  date: Joi.string().optional(),
  time: Joi.string().optional(),
});


module.exports = {
  userValid,
  cardValid,
};