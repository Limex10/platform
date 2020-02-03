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

exports.getInterestsById = function(id_interest1, id_interest2, id_interest3, id_interest4, callback){
    const query = `select interest FROM myDB.interests i WHERE i.interests_id IN (?, ?, ?, ?)`
    const values = [id_interest1, id_interest2, id_interest3, id_interest4]

    db.query(query,values, function(error, results){
        if(error){
            callback(['databaseError'], null)
        }else{
            console.log(results)
            callback(null, results)

        }
    })
}