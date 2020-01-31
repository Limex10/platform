const db = require("./db")



exports.createProfile = function(email,password, callback){

    const query = `INSERT INTO Profiles(email, password) VALUES (?, ?)`
    const values = [email, password]

    db.query(query,values, function(error, results){
        if(error){
            callback(['databaseError'], null)
        }else{
            callback([], results)

        }
    })
}