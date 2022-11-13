const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        owner_id: {
            type: String,
        },
        chef_id: {
            type: String,
        },
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
);

userSchema.virtual('isOwner').get(function () {
    return this.owner_id !== undefined;
})

const User = model('User', userSchema);

module.exports = User;