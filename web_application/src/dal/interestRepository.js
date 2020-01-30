const db = require("./db")


exports.getAllInterests = function(callback){
	
	const query = `SELECT interest FROM myDB.interests`
	const values = []
	
	db.query(query, values, function(error, interests){
		if(error){
            console.log(error)
			callback(['databaseError'], null)
		}else{
            callback([], interests)
            console.log(interests)
		}
	})
	
}

exports.createInterest = function(interest, callback){

    const query = `INSERT INTO interests(interest) VALUES (?)`
    const values = interest

    db.query(query,values, function(error, results){
        if(error){
            callback(['databaseError'], null)
        }else{
            callback([], results)

        }
    })
}