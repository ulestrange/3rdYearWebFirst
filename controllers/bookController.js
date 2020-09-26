

const  bookModel = require('../models/models');


exports.getBooksController =  async (req, res) =>{
    books = getBooks();
    res.send(books);
}


exports.getBookController = async (req, res) =>{
    let id = req.params.id;
    books = getBooks();
    if (id < books.length){
    res.json(books[id])
    }
    else {
        res.send("error - make this a real error");
    }
}
