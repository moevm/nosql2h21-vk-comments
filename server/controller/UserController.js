const express = require('express');
const UserService = require("../services/UserService");
const router = express.Router();


router.get('/comments/:userId', async (req, res) => {
    let comments = await UserService.comments(req.params.userId)
    res.json(comments)
})

router.get('/friends/:userId', async (req, res) => {
    let friends = await UserService.friends(req.params.userId)
    res.json(friends)
})

router.get('/commentators/:userId', async (req, res) => {
    let commentators = await UserService.commentators(req.params.userId)
    res.json(commentators)
})

module.exports = router;