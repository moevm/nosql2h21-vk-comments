const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService')
const GroupService = require('../services/GroupService')
const CommentService = require('../services/CommentService')

router.post('/import', async (req, res) => {
    let usersStatus = await UserService.importUsers(req.body.users)
    let groupStatus = await GroupService.importGroups(req.body.groups)
    let commentStatus = await CommentService.importComments(req.body.comments)
    if (usersStatus && groupStatus && commentStatus)
        res.json({status: 'ok'})
    else
        res.json({status: 'error'})
})

router.get('/export', async (req, res) => {
    let groups = await GroupService.exportGroups()
    let comments = await CommentService.exportComments()
    let users = await UserService.exportUsers()
    res.json({
        users: users,
        groups: groups,
        comments: comments
    })
})

module.exports = router;
