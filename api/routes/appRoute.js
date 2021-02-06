'use strict';

module.exports = function(app) {
    var controller = require('../controllers/controller');
    
    app.route('/books/:sort/:order').get(controller.list_all_books);
    app.route('/book/:bookId').get(controller.read_book);
    app.route('/search/:term').get(controller.search_books);
    app.route('/advanced/:term/:title/:author/:genre').get(controller.advanced_search);
}