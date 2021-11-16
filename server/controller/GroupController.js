const express = require("express");
const GroupService = require("../services/GroupService");
const router = express.Router();

router.post('/search', async (req, res) => {
    let groups = await GroupService.search(req.body)
    res.json(groups)
})

router.post('/graph/:groupId', async (req, res) => {
    let statistic = await GroupService.graph(req.params.groupId, req.body)
    res.json(statistic)
})

router.get('/commentators/:groupId/:limit', async (req, res) => {
    let commentators = await GroupService.commentators(req.params.groupId, req.params.limit)
    res.json(commentators)
})

module.exports = router;
