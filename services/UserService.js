const User = require("./../models/User");

function addUsers(users){
    User.deleteMany({})
        .catch(err => {
            console.error(err)
        })
        .then(() => {
            User.insertMany(users, (err) => {
                if (err) return console.error(err)
                console.log('Users imported')
            })
        });
}

module.exports = {
    addUsers: addUsers
};
