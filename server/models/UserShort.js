const {Schema} = require('mongoose');

const UserShortSchema = new Schema(
    {
        _id: Number,
        first_name: String,
        last_name: String,
    },
    {versionKey: false},
);

module.exports = UserShortSchema
