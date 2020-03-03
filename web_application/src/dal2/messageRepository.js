//const db = require("./db")

module.exports = function ({ db }) {
    return {


        createMessage: function (message, profile_id, callback) {

            db.models.profilemessages.create({
                message: message,
                profile_id: profile_id

            }).then(function () {
                callback(null)
            }).catch(function (error) {
                callback(['You have already created a message. If you want to change message go to update message.'])
            })
            
        }
        ,
   
        getMessageByProfileId: function(profile_id, callback){
            db.models.profilemessages.findAll({
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
            db.models.profilemessages.update({
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
            db.models.profilemessages.destroy({
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