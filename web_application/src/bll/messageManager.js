//const messageRepository = require('../dal/messageRepository')
//const validationManager = require('../bll/validationManager')

module.exports = function ({ messageRepository, validationManager }) {

    return {
        createMessage: function (message, profile_id, callback) {

            const validationErrors = validationManager.validateMessage(message)

            if (validationErrors.messageError == undefined) {
                messageRepository.createMessage(message, profile_id, callback)
            }
            else {
                callback(validationErrors)
            }


        }
        ,
        updateMessageByProfileId: function (message, profile_id, callback) {

            const validationErrors = validationManager.validateMessage(message)

            if (validationErrors.messageError == undefined) {
                messageRepository.updateMessageByProfileId(message, profile_id, callback)
            }
            else {
                callback(validationErrors)
            }
        }
        ,
        deleteMessageByProfileId: function (profile_id, callback) {

            messageRepository.deleteMessageByProfileId(profile_id, callback)
        },
        getMessageByProfileId: function(profile_id, callback){
            messageRepository.getMessageByProfileId(profile_id, callback)
        }
    }
}