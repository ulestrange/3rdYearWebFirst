
import express from 'express';

import db from '../models/books';

const router = express.Router();





router.post('/', (req, res) => {
    const book = req.body;
// note: there is no validation of the request data here.
// to be added later

    db.addBook(book);

    res.send ('book has been added to the database');
   

});

router.get('/', (req, res) => {
    const books = db.getBooks();
    res.send(books);
})

router.get('/:id', (req,res) => {

   let id = req.params.id;
   const book = db.getBook(id);
   res.json(book);
})

router.delete('/:id',(req, res) => {
  let id = req.params.id; 
  db.removeBook(id);
  res.json("done");
})

export default router;