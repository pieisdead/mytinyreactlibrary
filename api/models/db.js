var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xlM569z003',
    database: 'mytinylibrary'
});

connection.connect(function(err) {
    if (err) {
        if (!err.fatal) {
            return;
        }
        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }
        
    }
    
});

module.exports = connection;