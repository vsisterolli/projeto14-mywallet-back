import Joi from "joi"

const newUserSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    repeatPassword: Joi.ref('password')
})

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export {
    userSchema,
    newUserSchema
}