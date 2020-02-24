//const messageRepository = require('../dal/messageRepository')
//const validationManager = require('../bll/validationManager')

module.exports = function({messageRepository,validationManager}){

    return {
    createMessage: function(message, profile_id, callback){
   
    const validationErrors = validationManager.validateMessage(message)

    if(validationErrors.messageError == undefined){
        messageRepository.createMessage(message, profile_id, callback)
    }
    else{
        callback(validationErrors)
    }
    

}
,
getAllMessagesByProfileId: function(profile_id, callback){

    //validate

    messageRepository.getAllMessagesByProfileId(profile_id, callback)

}
}
}