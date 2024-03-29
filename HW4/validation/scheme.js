const Joi = require('joi')

const userSchema = Joi.object({
    firstName: Joi.string().min(2).required(),
    secondName: Joi.string().min(2).required(),
    age: Joi.number().min(0).max(120).required(),
    sity: Joi.string().min(2),
})

module.exports = { userSchema }