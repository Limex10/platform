const profileRepository = require('../dal/profileRepository')
const validationManager = require('../bll/validationManager')
const bcrypt = require('bcrypt')

exports.createProfile = function(email,password,repeatedPassword,callback){


    const validationErrors = validationManager.validateCreateProfile(email,password,repeatedPassword)

    
    if(validationErrors.emailError == undefined && validationErrors.passwordError == undefined){
        const saltRounds = 10

        bcrypt.hash(password, saltRounds, function (errors, hash) {
            if(errors){
                console.log(errors)
                
            }
            else{
            profileRepository.createProfile(email,hash,callback)
            }
        })
    }
    else{
        callback(validationErrors) 
    }
}

exports.getAllProfiles = function(callback){

    //validate
    profileRepository.getAllProfiles(callback)
}

exports.updateProfileInfo = function(city, country, firstname, lastname, id_interest1, id_interest2, id_interest3, id_interest4, profile_id, callback){

    const validationErrors = validationManager.validateUpdateProfileInfo(city, country, firstname, lastname, id_interest1, id_interest2, id_interest3, id_interest4)

    if(validationErrors.cityError == undefined && validationErrors.countryError == undefined && validationErrors.firstnameError == undefined &&
         validationErrors.lastnameError == undefined && validationErrors.interestError == undefined){
            
            profileRepository.updateProfileInfo(city, country, firstname, lastname, id_interest1, id_interest2, id_interest3, id_interest4, profile_id, callback)     
    }
    else{
        
        callback(validationErrors,profile_id)
    }
}

exports.getProfileById = function(profile_id,callback){

    profileRepository.getProfileById(profile_id, callback)

}

exports.updateAccountInfo = function(email,password,repeatedPassword, profile_id, callback){
    
    const validationErrors = validationManager.validateCreateProfile(email,password,repeatedPassword)

    if(validationErrors.emailError == undefined && validationErrors.passwordError == undefined){
        const saltRounds = 10

        bcrypt.hash(password,saltRounds,function(errors,hash){
            if(errors){
                console.log(errors)
            }
            else{
                
                profileRepository.updateAccountInfo(email,hash,profile_id, callback)
            }
        })
    }
    else{
        
        callback(validationErrors) 
    }

    
}

exports.deleteAccountById = function(id,callback){

    profileRepository.deleteAccountById(id,callback)
}
