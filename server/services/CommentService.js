const Comment = require("../models/Comment");

function addComments(comments){
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

function getComments() {
    return new Promise(resolve => {
        Comment.find({}, (err, comments) => {
            if (err) console.error(err)
            resolve(comments)
        })
    })
}

module.exports = {
    addComments: addComments,
    getComments: getComments
};