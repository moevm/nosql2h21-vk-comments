const Group = require("./../models/Group");

function addGroups(groups){
    Group.deleteMany({})
        .catch(err => {
            console.error(err)
        })
        .then(() => {
            Group.insertMany(groups, (err) => {
                if (err) return console.error(err)
                console.log('Groups imported')
            })
        });
}

module.exports = {
    addGroups: addGroups
};