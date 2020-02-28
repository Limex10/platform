//const db = require("./db")

module.exports = function({db}){
    return{

    
createMessage: function (message, profile_id, callback) {

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
,
getMessageByProfileId: function (profile_id, callback) {

    const query = `SELECT message FROM myDB.profilemessages WHERE profile_id = ?`
    const value = profile_id

    db.query(query, value, function (error, message) {
        if (error) {
            callback(['databaseError'], null)
        }
        else {

            callback(null, message)

        }
    })
},
deleteAccountById: function(id,callback){

    const query = 'DELETE FROM myDB.profilemessages WHERE profile_id = ?'
    const values = [id]

    db.query(query,values,function(error){
        if(error){
            callback(['Could not delete Message.'])
        }
        else{
            callback(null)
        }
    })
    
    
}
}
}