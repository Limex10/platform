const profileRepository = require('../dal/profileRepository')

exports.createProfile = function(email,password,repeatedPassword,callback){


    //validate the thext for emial and password

    profileRepository.createProfile(email,password,callback)
}