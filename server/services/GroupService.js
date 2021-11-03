const Group = require("../models/Group");

function addGroups(groups){
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

function getGroups() {
    return new Promise(resolve => {
        Group.find({}, (err, groups) => {
            if (err) console.error(err)
            resolve(groups)
        })
    })
}

module.exports = {
    addGroups: addGroups,
    getGroups: getGroups
};