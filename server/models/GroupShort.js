const {Schema} = require('mongoose');

const GroupShortSchema = new Schema(
    {
        _id: Number,
        title: String,
    },
    {versionKey: false},
);

module.exports = GroupShortSchema