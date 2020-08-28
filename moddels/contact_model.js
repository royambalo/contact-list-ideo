const mongoose = require("mongoose");
const Joi = require("@hapi/joi")

let contactSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 99
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 99
  },
  email: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 99
  },
  areaCode: {
    type: String,
    required: true,
    maxLength: 10
  },
  phoneNumber: {
    type: String,
    required: true,
    maxLength: 9
  },
  date: { type: Date, default: Date.now() }
})

exports.contactSchema = mongoose.model("contacts", contactSchema);

const validcontact = (_contact) => {
  let JoiSchema = Joi.object({
    _id: Joi.string(),
    firstName: Joi.string().min(2).max(99).required(),
    lastName: Joi.string().min(2).max(99).required(),
    email: Joi.string().min(2).max(99).required().email(),
    areaCode: Joi.string().max(10).required(),
    phoneNumber: Joi.string().length(9).required(),
  })

  return JoiSchema.validate(_contact);
}

exports.validcontact = validcontact;