
import express from 'express';


const router = express.Router();

let books = [];

router.post('/', (req, res) => {
    const book = req.body;
    books.push(book);

    res.send ('book has been added to the database');
    console.log(`book name is ${book.name} number of book is ${books.length}`);

});

router.get('/', (req, res) => {
    res.send(books);
})

router.get('/:id', (req,res) => {

   let id = req.params.id;
    res.json(books[id]);
})

router.delete('/:id',(req, res) => {
  let id = req.params.id; 
  console.log(`removing book ${books[id].name}`)
  books.splice(req.params.id, 1);
  res.send(books);

})

export default router;