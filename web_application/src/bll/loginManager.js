const loginRepository = require('../dal/loginRepository')

exports.getPasswordByEmail = function(email, callback){
    //validate

    loginRepository.getPasswordByEmail(email, callback)

}

exports.getIdByEmail = function(email, callback){
    //validate

    loginRepository.getIdByEmail(email, callback)

}