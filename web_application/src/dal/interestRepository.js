//const db = require("./db")


module.exports = function({db}){

    return{

getAllInterests: function (callback) {

    const query = `SELECT * FROM myDB.interests`

    db.query(query, function (error, interests) {
        if (error) {
            callback(['databaseError'], null)
        } else {
            if (interests.length == 0) {
                callback(["Something went wrong."], null)
            } else {
                callback(null, interests)
            }

        }
    })

}
,
createInterest: function (interest, callback) {

    const query = `INSERT INTO myDB.interests(interest) VALUES (?)`
    const values = interest

    db.query(query, values, function (error) {
        if (error) {
            callback(['Interest already exists.'])
        } else {

            callback(null)


        }
    })
}
,
getInterestsById: function (id_interest1, id_interest2, id_interest3, id_interest4, callback) {
    const query = `select interest FROM myDB.interests i WHERE i.interests_id IN (?, ?, ?, ?)`
    const values = [id_interest1, id_interest2, id_interest3, id_interest4]

    db.query(query, values, function (error, interest) {
        if (error) {
            callback(['databaseError'], null)
        } else {
            if (interest.length == 0) {
                callback(["Something went wrong"], null)
            } else {
                callback(null, interest)
            }
        }
    })
}
,
filterInterestsById: function (id_interest1, id_interest2, id_interest3, id_interest4,profile_id, callback) {
    console.log(profile_id)
    const query = `Select * FROM myDB.profiles p WHERE profile_id <> ? and ((id_interest1 = ? and id_interest2 = ? and id_interest3 = ? and id_interest4 = ?) or (id_interest1 = ? and id_interest2 = ? and id_interest3 = ?) or (id_interest2 = ? and id_interest3 = ? and id_interest4 = ?) or (id_interest1 = ? and id_interest3 = ? and id_interest4 = ?) or (id_interest1 = ? and id_interest2 = ? and id_interest4 = ?))`
    const values = [profile_id, id_interest1, id_interest2, id_interest3, id_interest4, id_interest1, id_interest2, id_interest3, id_interest2, id_interest3, id_interest4, id_interest1, id_interest3, id_interest4, id_interest1, id_interest2, id_interest4]

    db.query(query, values, function (error, filteredInterest) {
        console.log(filteredInterest)
        if (error) {
            callback(['databaseError'], null)
        } else {

            callback(null, filteredInterest)

        }
    })

}
}
}