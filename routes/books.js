
import express from 'express';

import db from '../models/bookService';

const router = express.Router();


router.put('/', (req, res) => {
    const book = req.body;
// note: there is no validation of the request data here.
// to be added later

    db.createBook(book);

    res.send ('book has been added to the database');
   
});


// To add: a post request to update a book.
//

router.get('/', (req, res) => {
    const books = db.readBooks();
    res.send(books);
})

router.get('/:id', (req,res) => {

   let id = req.params.id;
   const book = db.readBook(id);
   res.json(book);
})

router.delete('/:id',(req, res) => {
  let id = req.params.id; 
  db.deleteBook(id);
  res.json("done");
})

export default router;