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

const updateProjectSchema = Joi.object({
    body: Joi.object({
        id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        refLinks: Joi.object({
            action: Joi.string().valid('append', 'replace').required(),
            values: Joi.array()
                .items(
                    Joi.string()
                        .pattern(/^https?:\/\/.+\..+/)
                        .message('Each reference link must be a valid URL')
                )
                .messages({
                    'array.base': 'refLinks must be an array of URLs.',
                })
                .min(1) // 👈 ensures array is not empty
                .required(),
        }).optional(),
        tags: Joi.object({
            action: Joi.string().valid('append', 'replace').required(),
            values: Joi.array().items(Joi.string()).min(1).required()
        }).optional()
    })
})

export { createProjectSchema, getProjectSchema, updateProjectSchema};