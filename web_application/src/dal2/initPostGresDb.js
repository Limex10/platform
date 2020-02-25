
module.exports = function({sequelize, Sequelize}){
   

    return{

    profiles: function(){
        
        
    const profiles = sequelize.define('profiles', {
        // attributes
        profile_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull:false
        },
        city: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        }, 
        
        firstname: {
            type: Sequelize.STRING
        }, 
        
        lastname: {
            type: Sequelize.STRING
        },

          
    
      }, {
        // options
      });

    const interests = sequelize.define('interests',{

        interests_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        interest: {
            type: Sequelize.STRING,
            unique: true
        }

    })
    
    const profilemessages = sequelize.define('profilemessages',{

        profilemessages_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING
        }
    })

    

    }
    }
     

}
