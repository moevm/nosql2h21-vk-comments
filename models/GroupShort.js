const {Schema} = require('mongoose');

const GroupShortSchema = new Schema(
    {
        _id: Number,
        title: String,
    },
);

module.exports = GroupShortSchema