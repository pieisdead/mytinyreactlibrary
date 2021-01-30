"use strict";

var Book = require('../models/model');

exports.list_all_books = function(req, res) {
    Book.getAllBooks(req.params.sort, req.params.order, function(err, books) {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(books));
        }
    });
}

exports.read_book = function(req, res) {
    Book.getBookByID(req.params.bookId, function(err, book) {
        if (err) {
            res.send(err);
        } else {
            res.json(JSON.stringify(book));
        }
    });
}

exports.search_books = function(req, res) {
    Book.searchBooks(req.params.term, function(err, books) {
        if (err) {
            res.send(err);
        } else {
            res.json(JSON.stringify(books));
        }
    });
}
