const express = require ('express');

const bookControllers = require('../controllers/bookController');

const router = express.Router();

let books = [];


router.post('/book', (req, res) => {
    const book = req.body;
    books.push(book);

    res.send ('book has been added to the database');
    console.log(`book name is ${book.name} number of book is ${books.length}`);

});

router.get('/books', bookControllers.getBooksController );

router.get('/books/:id', bookControllers.getBookController );


router.delete('/books/:id',(req, res) => {
  let id = req.params.id; 
  console.log(`removing book ${books[id].name}`)
  books.splice(req.params.id, 1);
  res.send(books);

})


module.exports = router;