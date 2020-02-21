const db = require("./db")

exports.createMessage = function (message, profile_id, callback) {

    const query = `insert into myDB.profilemessages(message, profile_id) values(?,?)`
    const values = [message, profile_id]

    db.query(query, values, function (error) {
        if (error) {
            callback(['Something went wrong.'])
        }
        else {
            
                callback(null)
            
        }
    })
}

exports.getAllMessagesByProfileId = function (profile_id, callback) {

    const query = `SELECT message FROM myDB.profilemessages WHERE profile_id = ?`
    const value = profile_id

    db.query(query, value, function (error, result) {
        if (error) {
            callback(['databaseError'], null)
        }
        else {

            callback(null, result)

        }
    })
}