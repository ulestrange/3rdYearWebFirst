
const books =
[{"name":"War and Peace","quantity":5, "id": "isbn001"},
{"name":"James and the Giant Peach","quantity":5 , "id": "isbn002"},
{"name":"Gansta Granny","quantity":5,  "id": "isbn003"},
{"name":"The Slap","quantity":5 , "id": "isbn004"},
{"name":"Coding for Dummies","quantity":5 , "id": "isbn001"},
{"name":"Watermelon","quantity":5 , "id": "isbn001"}
];



function readBooks (options = [])  {
    return books;
}

function readBook (id, options = []) {
    return books[id];
}

function createBook (book) {
    books.push (book);
}

function deleteBook  (id) {
    console.log(`removing book ${books[id].name}`)

    if (id < books.length) {
        books.splice(id, 1);
        return books;
    }
    else{
        return false;
    }

    };


export default {createBook, deleteBook, readBooks,  readBook}
