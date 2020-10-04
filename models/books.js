
const books =
[{"name":"War and Peace","quantity":5},
{"name":"James and the Giant Peach","quantity":5},
{"name":"Gansta Granny","quantity":5},
{"name":"The Slap","quantity":5},
{"name":"Coding for Dummies","quantity":5},
{"name":"Watermelon","quantity":5}
];



function getBooks (options = [])  {
    return books;
}

function getBook (id, options = []) {
    return books[id];
}

function addBook (book) {
    books.push (book);
}

function removeBook  (id) {
    console.log(`removing book ${books[id].name}`)

    if (id < books.length) {
        books.splice(id, 1);
        return books;
    }
    else{
        return false;
    }

    };


export default {addBook, removeBook, getBooks, getBook}
