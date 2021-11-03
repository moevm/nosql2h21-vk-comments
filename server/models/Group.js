const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const GroupSchema = new Schema(
    {
        _id: Number,
        title: String,
        users_count: Number
    },{
        versionKey: false
    },
);

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;