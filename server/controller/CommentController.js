const express = require("express");
const CommentService = require("../services/CommentService");
const router = express.Router();

router.get('/search/:groupId', async (req, res) => {
    let comments = await CommentService.search(req.params.groupId, req.body.text)
    res.json(comments)
})

module.exports = router;