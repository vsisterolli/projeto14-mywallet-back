import Joi from "joi";

const registerSchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required()
})

export default registerSchema;