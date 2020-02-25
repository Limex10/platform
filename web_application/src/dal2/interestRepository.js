//const db = require("./db")


module.exports = function({db}){

    return{

getAllInterests: function (callback) {

    const query = `SELECT * FROM interests`

    db.query(query, function (error, interests) {
        if (error) {
            callback(['databaseError'], null)
        } else {
            if (interests.length == 0) {
                callback(["Something went wrong."], null)
            } else {
                callback(null, interests.rows)
            }

        }
    })

}
,
createInterest: function (interest, callback) {

    const query = `INSERT INTO interests(interest) VALUES (?)`
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
    const query = `select interest FROM interests i WHERE i.interests_id IN ($1, $2, $3, $4)`
    const values = [id_interest1, id_interest2, id_interest3, id_interest4]

    db.query(query, values, function (error, results) {
        if (error) {
            callback(['databaseError'], null)
        } else {
            if (results.length == 0) {
                callback(["Something went wrong"], null)
            } else {
                callback(null, results)
            }
        }
    })
}
,
filterInterestsById: function (id_interest1, id_interest2, id_interest3, id_interest4,profile_id, callback) {
    const query = `Select * FROM profiles WHERE profile_id <> $1 and ((id_interest1 = $2 and id_interest2 = $3 and id_interest3 = $4 and id_interest4 = $5) or (id_interest1 = $6 and id_interest2 = $7 and id_interest3 = $8) or (id_interest2 = $9 and id_interest3 = $10 and id_interest4 = $11) or (id_interest1 = $12 and id_interest3 = $13 and id_interest4 = $14) or (id_interest1 = $15 and id_interest2 = $16 and id_interest4 = $17))`
    const values = [profile_id, id_interest1, id_interest2, id_interest3, id_interest4, id_interest1, id_interest2, id_interest3, id_interest2, id_interest3, id_interest4, id_interest1, id_interest3, id_interest4, id_interest1, id_interest2, id_interest4]

    db.query(query, values, function (error, results) {
       
        if (error) {
            callback(['databaseError'], null)
        } else {

            callback(null, results)

        }
    })

}
}
}