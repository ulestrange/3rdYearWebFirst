
import express from 'express';

import db from '../models/bookService';

const router = express.Router();


router.post('/', (req, res) => {
    db.createBook(req, res);
});


// To add: a put request to update a book.
//

router.get('/', (req, res) => {
   db.readBooks(req, res);
})

router.get('/:id', (req,res) => {
    
    db.readBook(req,res);

})

router.delete('/:id',(req, res) => {
 
  db.deleteBook(req, res);

})

export default router;