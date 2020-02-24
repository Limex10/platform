const mysql = require('mysql')

module.exports = function({}){


const connection = mysql.createConnection({
	host     : 'db',
	user     : 'root',
	password : 'abc123',
	database : 'myDB'
})
	return connection
}
//module.exports = connection