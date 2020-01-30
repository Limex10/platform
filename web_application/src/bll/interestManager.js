const interestRepository = require('../dal/interestRepository')

exports.getAllInterests = function(callback){
	interestRepository.getAllInterests(callback)
}


exports.createInterest = function(interest, callback){
	
	// Validate the text of interests !!!.
	interestRepository.createInterest(interest, callback)
	
}