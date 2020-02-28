const Sequelize = require('sequelize')


module.exports = function({db}){

    return{

createProfile: function(email,password, callback){

    
    db.model("profiles").create({
        email: email,
        password: password

    }).then(function(id){

        
        callback(null, id.profile_id)

    }).catch(function(error){

        callback(['Account already exists.'], null)
    })
/*
    const query = 'INSERT INTO profiles(email, password, id_interest1, id_interest2, id_interest3, id_interest4) VALUES ($1, $2, 1, 2, 3, 4) RETURNING profile_id'
    const values = [email, password]


    db.query(query,values, function(error, results){
        if(error){
            callback(['Account already exists.'], null)
        }
        else
        {
            callback(null, results.rows[0].profile_id)

        }
    })
    */
}
,
getAllProfiles: function(profile_id,callback){


    db.model("profiles").findAll({
        raw: true,
        where: {
            profile_id: {
                [Sequelize.Op.not]: profile_id}
        }

    })
    .then(function(profiles){

        if(profiles.length == 0){
            callback(["There are no profiles"], null)
        }
        else{
            callback(null, profiles)
        }

    }).catch(function(error){

        callback(['databaseError'], null)
    })
/*
    const query = 'SELECT * FROM profiles WHERE profile_id <> $1;'
    const values = [profile_id]
    db.query(query,values, function(error, profiles){
        if(error){
            callback(['databaseError'], null)
        }
        else
        {
            if(profiles.rows.length == 0){
                callback(["There are no profiles"], null)
            }
            else{
                callback(null, profiles.rows)
            }
        }
    })*/
}
,
updateProfileInfo: function(city, country, firstname, lastname, id_interest1, id_interest2, id_interest3, id_interest4, profile_id, callback){

    
    db.model("profiles").update({
        city: city,
        country: country,
        firstname: firstname,
        lastname: lastname,
        id_interest1: id_interest1,
        id_interest2: id_interest2,
        id_interest3: id_interest3,
        id_interest4: id_interest4
        
        },{
        where:{
        profile_id: profile_id
        }
        }).then(function(){

            callback(null, profile_id)

        }).catch(function(error){
            callback(['databaseError'], null)
        })
        /*
    const query = "UPDATE profiles SET city = $1,country = $2,firstname = $3,lastname = $4,id_interest1 = $5,id_interest2 = $6,id_interest3 = $7,id_interest4 = $8 WHERE profile_id = $9"
    const values = [city, country, firstname, lastname, id_interest1, id_interest2, id_interest3, id_interest4, profile_id]
    db.query(query,values, function(error){
        if(error){
            callback(['databaseError'], null)
        }
        else
        {
          
            callback(null, profile_id)
        }
    })*/
}
,
getProfileById: function(profile_id,callback){

    db.model("profiles").findAll({
        raw: true,
        where: {
            profile_id: profile_id
        }
    }).then(function(profile){

        if(profile.length == 0){
            callback(["Something went wrong"], null)
        }
        else{
            callback(null,profile)
        }

    }).catch(function(errors){

        callback(['databaseError'], null)

    })
/*
    const query = 'select * FROM profiles WHERE profile_id = $1'
    const values = [profile_id]

    db.query(query,values, function(error,profile){
        console.log(error)
        if(error){
            callback(['databaseError'], null)
        }
        else
        {
            if(profile.rows.length == 0){
                callback(["Something went wrong"], null)
            }
            else{
                callback(null,profile.rows)
            }
            

        }
    })
*/
}
,
updateAccountInfo: function(email,password, profile_id, callback){

   db.model("profiles").update({
    email: email,
    password: password},
    {
        where:{
            profile_id: profile_id
        }
    }

   ).then(function(){

    callback(null)

   }).catch(function(error){

    callback(['Email already exists!'])

   })


/*
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
    })*/
}
,
deleteAccountById: function(id,callback){

    db.model("profiles").destroy({
        where: {
            profile_id: id
        }

    }).then(function(){
        callback(null)
    }).catch(function(error){
        callback(['Could not delete account!'])
    })
/*
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
    */
    
}
}
}



