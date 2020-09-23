var mysql = require('mysql')

var connectMySQL = function() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mapet'
    })
}

module.exports = function() {
    return connectMySQL
}