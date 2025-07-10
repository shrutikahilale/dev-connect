/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const schemaOptionsPlugin = function (schema) {
    // ✅ Add created_at and updated_at timestamps
    schema.set('timestamps', {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    // ✅ Customize JSON output
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;      // Add 'id' for frontend
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