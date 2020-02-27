//const db = require("./db")

module.exports = function({db}){
    return{

    
createMessage: function (message, profile_id, callback) {

    db.model("profilemessages").create({
        message: message,
        profile_id: profile_id
        
    }).then(function(){
        callback(null)
    }).catch(function(error){
        callback(['Something went wrong.'])
    })
    /*
    const query = `insert into myDB.profilemessages(message, profile_id) values(?,?)`
    const values = [message, profile_id]

    db.query(query, values, function (error) {
        if (error) {
            callback(['Something went wrong.'])
        }
        else {
            
                callback(null)
            
        }
    })*/
}
,
getAllMessagesByProfileId: function (profile_id, callback) {

    db.model("profilemessages").findAll({
        raw: true,
        where: {
            profile_id: profile_id
        }

    }).then(function(result){

        callback(null, result)


    }).catch(function(error){
        callback(['databaseError'], null)
    })
        
    
/*
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
    */
}
}
}