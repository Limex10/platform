const db = require("./db")


exports.getAllInterests = function(callback){
	
	const query = `SELECT * FROM myDB.interests`
	
	db.query(query, function(error, interests){
		if(error){
            
			callback(['databaseError'], null)
		}else{
            callback(null, interests)
            
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
            callback(null, results)

        }
    })
}