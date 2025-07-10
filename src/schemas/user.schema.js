import Joi from "joi";

const getUserSchema = Joi.object({
    query: Joi.object({
        username: Joi.string().required()
    })
})

const createUserSchema = Joi.object({
    body: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        phonenumber: Joi.string().required()
    })
})

const updateUserSchema = Joi.object({
    body: Joi.object({
        id: Joi.string().required(),
        username: Joi.string(),
        firstname: Joi.string(),
        lastname: Joi.string(),
        phonenumber: Joi.string(),
        skils: Joi.array().items(Joi.string()),
        project: Joi.array().items(Joi.string()),
        refLinks: Joi.array().items(Joi.string()),
        avatar: Joi.string().uri(),
    })
})

export { getUserSchema, createUserSchema, updateUserSchema };