//const db = require("./db")

module.exports = function ({ db }) {
    return {


        createMessage: function (message, profile_id, callback) {

            db.model("profilemessages").create({
                message: message,
                profile_id: profile_id

            }).then(function () {
                callback(null)
            }).catch(function (error) {
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
   
        getMessageByProfileId: function(profile_id, callback){
            db.model("profilemessages").findAll({
                raw: true,
                where: {
                    profile_id: profile_id
                }
            }).then(function(message){
            
                    callback(null, message[0].message)
                
              
            }).catch(function(error){
                callback(null, null)
            })
        }
        ,
        updateMessageByProfileId: function (message, profile_id, callback) {
            db.model("profilemessages").update({
                message: message
            }, {
                where: {
                    profile_id: profile_id
                }
            }).then(function(){
                callback(null)
            }).catch(function(error){
                callback(['databaseError'])
            })
        },
        deleteMessageByProfileId: function(profile_id, callback){
            db.model("profilemessages").destroy({
                where:{
                    profile_id: profile_id
                }
            }).then(function(){
                callback(null)
            }).catch(function(error){
                callback(['Could not delete message!'])
            })
        }
    }
}