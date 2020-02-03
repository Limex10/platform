const interestRepository = require('../dal/interestRepository')

exports.getAllInterests = function(callback){
	interestRepository.getAllInterests(callback)
}


exports.createInterest = function(interest, callback){
	
	// Validate the text of interests !!!.
	interestRepository.createInterest(interest, callback)
	
}

exports.getInterestsById = function(id_interest1, id_interest2, id_interest3, id_interest4, callback){

	//validate the text
	interestRepository.getInterestsById(id_interest1, id_interest2, id_interest3, id_interest4, callback)
}
