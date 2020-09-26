const express = require ('express');

const bookControllers = require('../controllers/bookControllers');

const router = express.Router();

let books = [];


router.post('/book', bookControllers.postBookController);


router.get('/books', bookControllers.getBooksController );

router.get('/books/:id', bookControllers.getBookController );

router.delete('/books/:id', bookControllers.deleteBookController );


module.exports = router;