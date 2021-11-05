const User = require("../models/User");

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

module.exports = {
    importUsers: importUsers,
    exportUsers: exportUsers,
    getUsers: getUsers
};
