import Joi from "joi";

const createProjectSchema = Joi.object({
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow('').optional(),
        referenceLinks: Joi.array().items(Joi.string()).optional(),
        tags: Joi.array().items(Joi.string()).optional()
    }),
    headers: Joi.object({
        'x-auth': Joi.string().required()
    })
});

export { createProjectSchema };