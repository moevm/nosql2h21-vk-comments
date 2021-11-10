const Group = require("../models/Group");

function importGroups(groups){
    return new Promise((resolve, reject) => {
        Group.deleteMany({})
            .catch(err => {
                console.error(err)
                reject('error while importing groups')
            })
            .then(() => {
                Group.insertMany(groups, (err) => {
                    if (err){
                        console.error(err)
                        reject('error while importing groups')
                    }
                    console.log('Groups imported')
                    resolve(true)
                })
            })
    })
}

function exportGroups() {
    return new Promise(resolve => {
        Group.find({}, (err, groups) => {
            if (err) console.error(err)
            resolve(groups)
        })
    })
}

function getGroups(params){
    let title = params.title ? params.title : ''
    let min_users_count = params.min_users_count ? parseInt(params.min_users_count) : Number.MIN_VALUE
    let max_users_count = params.max_users_count ? parseInt(params.max_users_count) : Number.MAX_VALUE
    let min_comments_count = params.min_comments_count ? parseInt(params.min_comments_count) : Number.MIN_VALUE
    let max_comments_count = params.max_comments_count ? parseInt(params.max_comments_count) : Number.MAX_VALUE
    return new Promise(resolve => {
        Group.aggregate([
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "group._id",
                    as: "comments"
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    users_count: 1,
                    comments_count: {$size: "$comments"}
                }
            },
            {
                $match: {
                    title: {
                        $regex: title,
                        $options: 'i'
                    },
                    users_count: {
                        $gte: min_users_count,
                        $lte: max_users_count
                    },
                    comments_count: {
                        $gte: min_comments_count,
                        $lte: max_comments_count
                    }
                }
            },
        ]).exec((err, groups) => {
            if (err)
                console.error(err)
            else
                resolve(groups);
        })
    })
}

function search(params){
    let title = params.title ? params.title : ''
    return new Promise(resolve => {
        Group.aggregate([
            {
                $match: {
                    title: {
                        $regex: title,
                        $options: 'i'
                    }
                }
            },
            {
                $project: {
                    users_count: 0
                }
            }
        ]).exec((err, groups) => {
            if (err)
                console.error(err)
            else
                resolve(groups);
        })
    })
}

function graph(group_id, params){
    group_id = parseInt(group_id)
    let text = params.text ? params.text : ''
    let min_date = params.min_date ? params.min_date : '1900-01-01'
    let max_date = params.max_date ? params.max_date : '3000-01-01'
    let min_time = params.min_time ? params.min_time : '00:00:00'
    let max_time = params.max_time ? params.max_time : '24:00:00'
    return new Promise(resolve => {
        Group.aggregate([
            {
                $match: {
                    _id: group_id
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "group._id",
                    as: "comments"
                }
            },
            {
                $unwind: "$comments"
            },
            {
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$comments.time" } },
                    time: { $dateToString: { format: "%H:%M:%S", date: "$comments.time" } },
                    text: "$comments.text"
                }
            },
            {
                $match: {
                    text: {
                        $regex: text,
                        $options: 'i'
                    },
                    date: {
                        $gte: min_date,
                        $lte: max_date
                    },
                    time: {
                        $gte: min_time,
                        $lte: max_time
                    }
                }
            },
            {
                $group: {
                    _id: "$date",
                    count_comments: {$sum: 1}
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]).exec((err, groups) => {
            if (err)
                console.error(err)
            else
                resolve(groups);
        })
    })
}

function commentators(group_id, limit){
    group_id = parseInt(group_id)
    limit = parseInt(limit)
    return new Promise(resolve => {
        Group.aggregate([
            {
                $match: {
                    _id: group_id
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "group._id",
                    as: "comments"
                }
            },
            {
                $unwind: "$comments"
            },
            {
                $group: {
                    _id: "$comments.user",
                    count_comments: {$sum: 1}
                }
            },
            {
                $sort: {
                    count_comments: -1
                }
            },
            {
                $limit: limit
            }
        ]).exec((err, commentators) => {
            if (err)
                console.error(err)
            else
                resolve(commentators);
        })
    })
}

module.exports = {
    importGroups: importGroups,
    getGroups: getGroups,
    exportGroups: exportGroups,
    search: search,
    graph: graph,
    commentators: commentators
};
