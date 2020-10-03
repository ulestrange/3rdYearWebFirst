
const  bookModel = require('../models/models');


const express = require ('express');



const router = express.Router();

let books = [];


router.post('/', (req, res) => {
    const book = req.body;
    bookModel.addBook (book);
    res.send ('book has been added to the database');
    console.log(`book name is ${book.name}`);
});


router.get('/', (req, res) => {
    books = bookModel.getBooks();
    res.send(books); 
});


router.get('/:id', (req, res) =>{
    let id = req.params.id;
    books = bookModel.getBooks();
    if (id < books.length || id < 0){
    res.json(books[id])
    }
    else {
        res.send("error");
    }
} );

router.delete('/:id', (req, res) => {

    let id = req.params.id; 

    bookModel.removeBook(id);

    res.send("book may have been deleted");
} );

// note there is no validation of the request body here
// this is a security risk


module.exports = router;


