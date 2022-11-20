import Joi from "joi";

const registerSchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required()
})

const deleteSchema = Joi.object({
    id: Joi.number().required()
})

const changeSchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required(),
    id: Joi.number().required()
})

export {
    registerSchema,
    deleteSchema,
    changeSchema
}