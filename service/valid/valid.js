const Joi = require("joi");

const userValid = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name:Joi.string().optional(),
  subscription: Joi.string().optional(),
  token: Joi.string().optional(),
});



module.exports = {
  userValid,
};