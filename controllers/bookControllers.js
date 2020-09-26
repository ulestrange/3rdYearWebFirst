

const  bookModel = require('../models/models');


exports.getBooksController =  (req, res) =>{
    books = bookModel.getBooks();
    res.send(books);
}


exports.getBookController = (req, res) =>{
    let id = req.params.id;
    books = bookModel.getBooks();
    if (id < books.length || id < 0){
    res.json(books[id])
    }
    else {
        res.send("error");
    }
}

// note there is no validation of the request body here
// this is a security risk

exports.postBookController = (req, res) => {
    const book = req.body;
    bookModel.addBook (book);
    res.send ('book has been added to the database');
    console.log(`book name is ${book.name}`);
}

exports.deleteBookController = (req, res) => {

    let id = req.params.id; 

    bookModel.removeBook(id);

    res.send("book may have been deleted");
}