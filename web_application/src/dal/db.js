const mysql = require('mysql')

module.exports = function ({ }) {

  const connection = mysql.createConnection({

    host: 'db',
    user: 'lundgrens',
    password: 'abc123',
    database: 'myDB'

  })

  return connection

}