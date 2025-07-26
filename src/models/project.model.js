import { Schema, model } from 'mongoose';
import { schemaOptionsPlugin } from '../utils/schemaplugin.js';

const projectSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        refLinks: {
            type: [String],
            validate: {
                validator: function (links) {
                    return links.every(link => /^https?:\/\/.+\..+/.test(link));
                },
                message: 'All reference links must be valid URLs.',
            },
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

projectSchema.plugin(schemaOptionsPlugin);

export const Project = model('Project', projectSchema);