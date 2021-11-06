const express = require("express");
const CommentService = require("../services/CommentService");
const router = express.Router();

router.get('/search/:groupId', async (req, res) => {
    let comments = await CommentService.search(req.params.groupId, req.body.text)
    res.json(comments)
})

router.get('/likers/:commentId', async (req, res) => {
    let likers = await CommentService.likers(req.params.commentId)
    res.json(likers)
})

module.exports = router;