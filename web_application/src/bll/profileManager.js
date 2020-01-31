const profileRepository = require('../dal/profileRepository')

exports.createProfile = function(email,password,repeatedPassword,callback){


    //validate the thext for emial and password

    profileRepository.createProfile(email,password,callback)
}

exports.getAllProfiles = function(callback){

    //validate
    profileRepository.getAllProfiles(callback)
}

exports.updateProfileInfo = function(city, country, firstname, lastname, id_interest1, id_interest2, id_interest3, id_interest4, profile_id, callback){

    profileRepository.updateProfileInfo(city, country, firstname, lastname, id_interest1, id_interest2, id_interest3, id_interest4, profile_id, callback)
}

exports.getProfileById = function(profile_id,callback){

    profileRepository.getProfileById(profile_id, callback)

}
