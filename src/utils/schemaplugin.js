/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const schemaOptionsPlugin = function (schema) {
    // ✅ Customize JSON output
    schema.set('toJSON', {
        transform: function (doc, ret) {
            delete ret._id;        // Clean up MongoDB internal fields
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;

            // 🔒 Optionally hide sensitive fields like password, if present
            if (ret.password) {
                delete ret.password;
            }

            return ret;
        },
    });
};

export { schemaOptionsPlugin };