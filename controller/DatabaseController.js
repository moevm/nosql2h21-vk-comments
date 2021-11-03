const express = require('express');
const router = express.Router();
const UserService = require('./../services/UserService')
const GroupService = require('./../services/GroupService')
const CommentService = require('./../services/CommentService')

router.post('/import', async (req, res) => {
    UserService.addUsers(req.body.users)
    GroupService.addGroups(req.body.groups)
    CommentService.addComments(req.body.comments)
    res.json();
})

module.exports = router;