'use strict';

var sql = require('./db.js');

var Book = function(book) {
    this.book = book.book;
    this.status = Book.status;
    this.created_at = new Date();
};

Book.getAllBooks = function(sort, order, result) {
    sql.query("SELECT * FROM books ORDER BY " + sort + " " + order, function(err, res) {
        if (err) {
            console.log('Error: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Book.getBookByID = function(bookId, result) {
    sql.query("SELECT * FROM books WHERE uid = ? ", bookId, function(err, res) {
        if (err) {
            console.log('Error: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

module.exports = Book;
