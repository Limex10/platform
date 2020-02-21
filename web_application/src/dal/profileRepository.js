const db = require("./db")

exports.createProfile = function(email,password, callback){

    const query = 'INSERT INTO myDB.profiles (email, password, id_interest1, id_interest2, id_interest3, id_interest4) VALUES (?,?,1,2,3,4)'
    const values = [email, password]


    db.query(query,values, function(error, results){
        if(error){
            callback(['Account already exists.'], null)
        }
        else
        {
            callback(null, results.insertId)

        }
    })
}

exports.getAllProfiles = function(profile_id,callback){

    const query = 'SELECT * FROM myDB.profiles p WHERE p.profile_id <> ?;'
    const values = [profile_id]
    console.log(profile_id)
    db.query(query,values, function(error, profiles){
        if(error){
           
            callback(['databaseError'], null)
        }
        else
        {
            console.log(profiles.length)
            if(profiles.length == 0){
                callback(["Something went wrong"], null)
            }
            else{
                callback(null, profiles)
            }
        }
    })
}

exports.updateProfileInfo = function(city, country, firstname, lastname, id_interest1, id_interest2, id_interest3, id_interest4, profile_id, callback){

    const query = "UPDATE myDB.profiles SET city = ?,country = ?,firstname = ?,lastname = ?,id_interest1 = ?,id_interest2 = ?,id_interest3 = ?,id_interest4 = ? WHERE profile_id = ?"
    const values = [city, country, firstname, lastname, id_interest1, id_interest2, id_interest3, id_interest4, profile_id]
    db.query(query,values, function(error){
        if(error){
            callback(['databaseError'], null)
        }
        else
        {
          
            callback(null, profile_id)
        }
    })
}

exports.getProfileById = function(profile_id,callback){

    const query = 'select * FROM myDB.profiles p WHERE p.profile_id = ?'
    const values = profile_id

    db.query(query,values, function(error,profile){
        if(error){
            callback(['databaseError'], null)
        }
        else
        {
            if(profile.length == 0){
                callback(["Something went wrong"], null)
            }
            else{
                callback(null,profile)
            }
            

        }
    })

}

exports.updateAccountInfo = function(email,password, profile_id, callback){

   
    const query = 'UPDATE myDB.profiles SET email = ?, password = ? WHERE profile_id = ?'
    const values = [email, password, profile_id]

   

    db.query(query,values, function(error){
        if(error){
            callback(['Email already exists!'])
        }
        else
        {
            
            callback(null)

        }
    })
}
exports.deleteAccountById = function(id,callback){

    const query = 'DELETE FROM myDB.profiles WHERE profile_id = ?'
    const values = [id]

    db.query(query,values,function(error){
        if(error){
            callback(['Could not delete account.'])
        }
        else{
            callback(null)
        }
    })
    
    
}




