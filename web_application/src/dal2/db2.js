const Sequelize = require('sequelize')

const sequelize = new Sequelize('myDB2', 'lundgrens', 'abc123', {

  host: 'db2',
  dialect: "postgres",
  database: "myDB2"

})

const profiles = sequelize.define('profiles', {

  profile_id: {

    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true
    
  },

  email: {

    type: Sequelize.STRING,
    allowNull: false,
    unique: true

  },

  password: {

    type: Sequelize.STRING,
    allowNull: false

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

  }
}, {
  // options
});

const interests = sequelize.define('interests', {

  interests_id: {

    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true

  },

  interest: {

    type: Sequelize.STRING,
    unique: true

  }
})

const profilemessages = sequelize.define('profilemessages', {

  profilemessages_id: {

    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true

  },

  message: {

    type: Sequelize.STRING

  },

  profile_id: {

    unique: true,
    type: Sequelize.INTEGER

  }
})

profilemessages.belongsTo(profiles, {

  foreignKey: "profile_id"

})

profiles.belongsTo(interests, {

  foreignKey: 'id_interest1'

})
profiles.belongsTo(interests, {

  foreignKey: 'id_interest2'

})

profiles.belongsTo(interests, {

  foreignKey: 'id_interest3'

})

profiles.belongsTo(interests, {

  foreignKey: 'id_interest4'

})

function authenticate(sequelize, connected) {

  if (!connected) {

    setTimeout(function () {

      sequelize.authenticate()
        .then(() => {

          return sequelize.sync()

        }).then(() => {

          interests.bulkCreate([

            { interest: 'Fishing' },
            { interest: "Gaming" },
            { interest: "Cooking" },
            { interest: "Cocktails" },
            { interest: "Coding" },
            { interest: "Icehockey" },
            { interest: "Golf" },
            { interest: "Cars" },
            { interest: "Traveling" },
            { interest: "Training" },
            { interest: "Hiking" },
            { interest: "Skiing" },
            { interest: "Horseriding" },
            { interest: "Hunting" },
            { interest: "Reading" },
            { interest: "Movies" },
            { interest: "Padel" },
            { interest: "Shopping" },
            { interest: "FoodLover" },
            { interest: "Socializing" }],

            { returning: true }

          )
          console.log("connected")

        }).catch(error => {

          console.log("not connected")
          authenticate(sequelize, connected = false)

        })
    }, 5000);
  }
}

authenticate(sequelize, connected = false)

module.exports = sequelize