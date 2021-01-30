import $ from 'jquery';

export function getBooks(sort, order, term) {
    return new Promise((resolve, reject) => {
        var apiString = '';
        if (term === '') {
            apiString = 'http://localhost:9000/books/' + sort + '/' + order;
        } else {
            apiString = 'http://localhost:9000/search/' + term;
        }
        $.ajax({
            url: apiString,
            success: (latestResults) => {
                const results = JSON.parse(latestResults);
                resolve(results);
            },
            error: (xhr, status, err) => {
                console.log('Failed to fetch books');
            }
        });
    });
}

export function getBookById(bookId) {
    return new Promise((resolve, reject) => {
        const apiString = 'http://localhost:9000/book/' + bookId;
        $.ajax({
            url: apiString,
            success: (latestResult) => {
                const result = JSON.parse(latestResult);
                resolve(result);
            },
            error: (xhr, status, err) => {
                console.log('Falied to fetch book');
            }
        });
    });
}

export function searchBooks(term) {
    return new Promise((resolve, reject) => {
        const apiString = 'http://localhost:9000/search/' + term;
        $.ajax({
            url: apiString,
            success: (latestResults) => {
                const results = JSON.parse(latestResults);
                resolve(results);
            },
            error: (xhr, status, err) => {
                console.log('Search failed');
            }
        });
    });
}