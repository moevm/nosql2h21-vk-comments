const Comment = require("./../models/Comment");

function addComments(comments){
    Comment.deleteMany({})
        .catch(err => {
            console.error(err)
        })
        .then(() => {
            Comment.insertMany(comments, (err) => {
                if (err) return console.error(err)
                console.log('Comments imported')
            })
        });
}

module.exports = {
    addComments: addComments
};