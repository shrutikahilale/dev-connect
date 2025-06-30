import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    projects: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }],
        default: []
    },
    refLinks: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.every(url => /^https?:\/\/.+/.test(url));
            },
            message: props => `${props.value} is not a valid URL!`
        },
        default: []
    },
    avatar: {
        type: String,
        default: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

export const User = model('User', userSchema);