const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = new Schema(
    {
        _id: Number,
        first_name: String,
        last_name: String,
        town: String,
        birthdate: Date,
        friends: [Number]
    },
);

const User = mongoose.model('User', UserSchema);

module.exports = User;