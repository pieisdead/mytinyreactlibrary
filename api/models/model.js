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
    sql.query("SELECT * FROM books WHERE uid = ?", bookId, function(err, res) {
        if (err) {
            console.log('Error: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Book.searchBooks = function(term, result) {
    sql.query("select * from books WHERE (`title` like '%" + term + "%' OR `subtitle` like '%" + term + "%' OR `author_surname` like '%" + term + "%' OR `description` like '%" + term + "%' OR `category` like '%" + term + "%' OR `tags` like '%" + term + "%')", function(err, res) {
        if (err) {
            console.log('Error: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

Book.advancedSearch = function(term, title, author, genre, result) {
    var sqlString = '';
    var t = (title === 'true');
    var a = (author === 'true');
    var g = (genre === 'true');
    if (!t && !a && !g) {
        sqlString = "select * from books WHERE (`title` like '%" + term + "%' OR `subtitle` like '%" + term + "%' OR `author_surname` like '%" + term + "%' OR `description` like '%" + term + "%' OR `category` like '%" + term + "%' OR `tags` like '%" + term + "%')";
    } else if (t && !a && !g) {
        sqlString = "select * from books WHERE (`title` like '%" + term + "%')";
    } else if (t && a && !g) {
        sqlString = "select * from books WHERE (`title` like '%" + term + "%' OR `author_surname` like '%" + term + "%')";
    } else if (t && a && g) {
        sqlString = "select * from books WHERE (`title` like '%" + term + "%' OR `author_surname` like '%" + term + "%' AND `category` like '%" + term + "%')";
    } else if (!t && a && g) {
        sqlString = "select * from books WHERE (`author_surname` like '%" + term + "%' OR `category` like '%" + genre + "%')";
    } else if (!t && !a && g) {
        sqlString = "select * from books WHERE (`category` like '%" + term + "%')";
    } else if (!t && a && !g) {
        sqlString = "select * from books WHERE (`author_surname` like '%" + term + "%')";
    } else {
        sqlString = "select * from books WHERE (`title` like '%" + term + "%' OR `subtitle` like '%" + term + "%' OR `author_surname` like '%" + term + "%' OR `description` like '%" + term + "%' OR `category` like '%" + term + "%' OR `tags` like '%" + term + "%')";
    }
    sql.query(sqlString, function(err, res) {
        if (err) {
            console.log('Error: ' + err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
}

module.exports = Book;
