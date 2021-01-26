import $ from 'jquery';

export function getBooks() {
    return new Promise((resolve, reject) => {
        const apiString = 'http://localhost:9000/books';
        $.ajax({
            url: apiString,
            success: (latestResults) => {
                const results = JSON.parse(latestResults);
                console.log(results);
                resolve(results);
            },
            error: (xhr, status, err) => {
                console.log('Failed to fetch books');
            }
        });
    });
}