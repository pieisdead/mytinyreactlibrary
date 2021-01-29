import $ from 'jquery';

export function getBooks(sort, order) {
    return new Promise((resolve, reject) => {
        const apiString = 'http://localhost:9000/books/' + sort + '/' + order;
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
                resolve(results);
            },
            error: (xhr, status, err) => {
                console.log('Falied to fetch book');
            }
        });
    });
}