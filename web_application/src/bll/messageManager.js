const messageRepository = require('../dal/messageRepository')

exports.createMessage = function(message, profile_id, callback){
    //validate

    messageRepository.createMessage(message, profile_id, callback)

}