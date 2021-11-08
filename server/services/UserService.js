const User = require("../models/User");
const Comment = require("../models/Comment");


function importUsers(users){
    return new Promise((resolve, reject) => {
        User.deleteMany({})
            .catch(err => {
                console.error(err)
                reject('error while importing users')
            })
            .then(() => {
                User.insertMany(users, (err) => {
                    if (err){
                        console.error(err)
                        reject('error while importing users')
                    }
                    console.log('Users imported')
                    resolve(true)
                })
            });
    })
}

function exportUsers() {
    return new Promise(resolve => {
        User.find({}, (err, users) => {
            if (err) console.error(err)
            resolve(users)
        })
    })
}

function getUsers(params) {
    let first_name = params.first_name ? params.first_name : ''
    let last_name = params.last_name ? params.last_name : ''
    let town = params.town ? params.town : ''
    let min_age = params.min_age ? parseInt(params.min_age) : Number.MIN_VALUE
    let max_age = params.max_age ? parseInt(params.max_age): Number.MAX_VALUE
    return new Promise(resolve => {
        User.aggregate([
            {
                $project: {
                    first_name : 1,
                    last_name : 1,
                    town : 1,
                    age: {$subtract:[
                            {$subtract:[{$year:"$$NOW"},{$year:"$birthdate"}]},
                            {$cond:[
                                    {$gt:[0, {$subtract:[{$dayOfYear:"$$NOW"},
                                                {$dayOfYear:"$birthdate"}]}]},
                                    1,
                                    0
                                ]}
                        ]}
                }
            }, {
                $match: {
                    first_name: {
                        $regex: first_name,
                        $options: 'i'
                    },
                    last_name: {
                        $regex: last_name,
                        $options: 'i'
                    },
                    town: {
                        $regex: town,
                        $options: 'i'
                    },
                    age: {
                        $gte: min_age,
                        $lte: max_age
                    }
                }
            }
        ])
            .exec((err, users) => {
                if (err)
                    console.error(err)
                else
                    resolve(users)
        })
    })
}

function comments(userId) {
    userId = parseInt(userId)
    return new Promise(resolve => {
        Comment.aggregate([
            {
                $project: {
                    user_id: "$user._id",
                    group: 1,
                    date: {$dateToString: {format: "%Y-%m-%d", date: "$time"}},
                    time: {$dateToString: {format: "%H:%M:%S", date: "$time"}},
                    text: 1,
                    likes_count: {$size: "$likes"},
                }
            },
            {
                $match: {
                    user_id: userId
                }
            },
            {
                $project: {
                    user_id: 0
                }
            }
        ]).exec((err, comments) => {
            if (err)
                console.error(err)
            else
                resolve(comments)

        })
    })
}


module.exports = {
    importUsers: importUsers,
    exportUsers: exportUsers,
    getUsers: getUsers,
    comments: comments
};
