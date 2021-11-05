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
    let min_users_count = params.min_users_count ? params.min_users_count : Number.MIN_VALUE
    let max_users_count = params.max_users_count ? params.max_users_count : Number.MAX_VALUE
    let min_comments_count = params.min_comments_count ? params.min_comments_count : Number.MIN_VALUE
    let max_comments_count = params.max_comments_count ? params.max_comments_count : Number.MAX_VALUE
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

module.exports = {
    importGroups: importGroups,
    getGroups: getGroups,
    exportGroups: exportGroups
};