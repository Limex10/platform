const postgres = require('pg').Pool
const Sequelize = require('sequelize')
const initDatabase = require("./initPostGresDb")


module.exports = function({}){

/*
const connection = new postgres({
	host     : 'db2',
	user     : 'lundgrens',
	password : 'abc123',
	database : 'myDB2',
	port : "5432"
})
*/

const sequelize = new Sequelize('myDB2','lundgrens','abc123',{
    host: 'db2',
    dialect: "postgres",
	database: "myDB2"
})

	sequelize
	.authenticate()
	.then(() => {

		initDatabase.profiles()
		

		sequelize.sync
		/*
		const User = sequelize.define('user', {
			// attributes
			firstName: {
			  type: Sequelize.STRING,
			  allowNull: false
			},
			lastName: {
			  type: Sequelize.STRING
			  // allowNull defaults to true
			}
		  }, {
			// options
		  });

		  User.sync({ force: true }).then(() => {
			// Now the `users` table in the database corresponds to the model definition
			return User.create({
			  firstName: 'John',
			  lastName: 'Hancock'
			});
		  });*/
		  console.log({User})
	
	
	console.log('Connection has been established successfully.');
	})
	.catch(err => {
	console.error('Unable to connect to the database:', err);
	});

	


	return sequelize
}
//module.exports = connection