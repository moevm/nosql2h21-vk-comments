const User = require("../models/User");

function addUsers(users){
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

function getUsers() {
    return new Promise(resolve => {
        User.find({}, (err, users) => {
            if (err) console.error(err)
            resolve(users)
        })
    })
}

module.exports = {
    addUsers: addUsers,
    getUsers: getUsers
};
