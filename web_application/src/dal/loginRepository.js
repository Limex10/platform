const db = require("./db")

exports.getAccountInfoByEmail = function (email, callback) {
    const query = `SELECT password, email, profile_id FROM myDB.profiles WHERE email = ?`
    const values = email

    db.query(query, values, function (error, results) {
        if (error) {
            callback(['databaseError'], null)
        }
        else {
            if(results.length == 0){
                callback(["Email does not exists!"], null)
            }else{
                callback(null, results)
            }
        }
    })

}
/*
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

}*/