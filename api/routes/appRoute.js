'use strict';

module.exports = function(app) {
    var controller = require('../controllers/controller');
    
    app.route('/books').get(controller.list_all_books);
    app.route('/book/:bookID').get(controller.read_book);
    
}