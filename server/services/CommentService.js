const Comment = require("../models/Comment");

function importComments(comments){
    return new Promise( (resolve, reject) => {
        Comment.deleteMany({})
            .catch(err => {
                console.error(err)
                reject('error while importing comments')
            })
            .then(() => {
                Comment.insertMany(comments, (err) => {
                    if (err) {
                        console.error(err)
                        reject('error while importing comments')
                    }
                    console.log('Comments imported')
                    resolve(true)
                })
            });
    })
}

function exportComments() {
    return new Promise(resolve => {
        Comment.find({}, (err, comments) => {
            if (err) console.error(err)
            resolve(comments)
        })
    })
}

function getComments(params){
    let first_name = params.first_name ? params.first_name : ''
    let last_name = params.last_name ? params.last_name : ''
    let text = params.text ? params.text : ''
    let min_date = params.min_date ? params.min_date : '1900-01-01'
    let max_date = params.max_date ? params.max_date : '3000-01-01'
    let min_time = params.min_time ? params.min_time : '00:00:00'
    let max_time = params.max_time ? params.max_time : '24:00:00'
    let min_likes_count = params.min_likes_count ? parseInt(params.min_likes_count) : Number.MIN_VALUE
    let max_likes_count = params.max_likes_count ? parseInt(params.max_likes_count) : Number.MAX_VALUE
    return new Promise(resolve => {
        Comment.aggregate([
            {
                $project: {
                    first_name: "$user.first_name",
                    last_name: "$user.last_name",
                    text: 1,
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$time" } },
                    time: { $dateToString: { format: "%H:%M:%S", date: "$time" } },
                    likes_count: { $size: "$likes"}
                }
            },
            {
                $match: {
                    first_name: {
                        $regex: first_name,
                        $options: 'i'
                    },
                    last_name: {
                        $regex: last_name,
                        $options: 'i'
                    },
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
                    },
                    likes_count: {
                        $gte: min_likes_count,
                        $lte: max_likes_count
                    },
                }
            }
        ]).exec((err, comments) => {
            if (err)
                console.error(err)
            else
                resolve(comments);
        })
    })
}

module.exports = {
    importComments: importComments,
    exportComments: exportComments,
    getComments: getComments
};