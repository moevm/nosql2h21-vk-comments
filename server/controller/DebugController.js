const express = require("express");
const GroupService = require("../services/GroupService");
const CommentService = require("../services/CommentService");
const UserService = require("../services/UserService");
const router = express.Router();

router.get('/groups', async (req, res) => {
    let groups = await GroupService.getGroups(req.body)
    res.json(groups)
})

router.get('/comments', async (req, res) => {
    let comments = await CommentService.getComments(req.body)
    res.json(comments)
})

router.post('/users', async (req, res) => {
    let users = await UserService.getUsers(req.body)
    res.json(users)
})

module.exports = router;
