
const books =
[{"name":"War and Peace","quantity":5},
{"name":"James and the Giant Peach","quantity":5},
{"name":"Gansta Granny","quantity":5},
{"name":"The Slap","quantity":5},
{"name":"Coding for Dummies","quantity":5},
{"name":"Watermelon","quantity":5}
];



exports.getBooks = async (options = []) => {
    return books;
}

exports.addBook = async (book) =>
{
    books.push (book);
}

exports.removeBook = async (id) =>
{
    if (id < books.length) {
        books.splice(req.params.id, 1);
        return books;
    }
    else{
        return false;
    }

    }






 