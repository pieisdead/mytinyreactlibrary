var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xlM569z003',
    database: 'mytinylibrary'
});

connection.connect(function(err) {
    if (err) {
        throw err;
    }
});

module.exports = connection;