const {Schema} = require('mongoose');
const mongoose = require('mongoose');
const UserShortSchema = require("./UserShort");
const GroupShortSchema = require("./GroupShort");

const CommentSchema = new Schema(
    {
        _id: Number,
        user: UserShortSchema,
        group: GroupShortSchema,
        text: String,
        time: Date,
        likes: [Number]
    },
    {versionKey: false},
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;