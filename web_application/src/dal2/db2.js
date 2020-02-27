const postgres = require('pg').Pool
const Sequelize = require('sequelize')
const initDatabase = require("./initPostGresDb")


module.exports = function ({ }) {

	/*
	const connection = new postgres({
		host     : 'db2',
		user     : 'lundgrens',
		password : 'abc123',
		database : 'myDB2',
		port : "5432"
	})
	*/

	const sequelize = new Sequelize('myDB2', 'lundgrens', 'abc123', {
		host: 'db2',
		dialect: "postgres",
		database: "myDB2"
		
	})

	return sequelize
		.authenticate()
		.then(() => {

			const profiles = sequelize.define('profiles', {
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
					allowNull: false
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
					allowNull: false
				},
				message: {
					type: Sequelize.STRING
				}
			})

			profilemessages.belongsTo(profiles)

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



			sequelize.sync().catch(error => {

				console.log(error)
			})



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



			const model = {
				sequelize,
				profiles,
				interest,
				profilemessages

			}


			console.log('Connection has been established successfully.');

			return () => model

		})
		.catch(err => {
			console.error('Unable to connect to the database:', err);
			return sequelize
		});

		
}



function keepTrying(promise) {
	promise = promise||new Promise();
	
	return promise
		.then(() =>{
			return promise
		}).catch(error => {
			console.log("error, trying again soon...")
			console.log(error)
			setTimeout(function() {
				keepTrying(promise);
			}, 5000);

		}) 
	
}
//module.exports = connection