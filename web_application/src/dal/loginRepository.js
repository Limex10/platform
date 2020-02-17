const db = require("./db")

exports.getPasswordByEmail = function (email, callback) {
    const query = `SELECT password FROM myDB.profiles WHERE email = ?`
    const values = email

    db.query(query, values, function (error, results) {
        if (error) {
            callback(['databaseError'], null)
        }
        else {

            callback(null, results)

        }
    })

}

exports.getIdByEmail = function (email, callback) {
    const query = `SELECT profile_id FROM myDB.profiles WHERE email = ?`
    const values = email

    db.query(query, values, function (error, results) {
        if (error) {
            callback(['databaseError'], null)
        }
        else {

            callback(null, results)

        }
    })

}