import Joi from "joi";

const createProjectSchema = Joi.object({
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow('').optional(),
        refLinks: Joi.array()
            .items(
                Joi.string()
                    .pattern(/^https?:\/\/.+\..+/)
                    .message('Each reference link must be a valid URL')
            )
            .messages({
                'array.base': 'refLinks must be an array of URLs.',
            }),
        tags: Joi.array().items(Joi.string()).optional()
    }),
    headers: Joi.object({
        'x-auth': Joi.string().required()
    })
});

const getProjectSchema = Joi.object({
    params: Joi.object({
        id: Joi.string().guid().optional()
    })
});

export { createProjectSchema, getProjectSchema };