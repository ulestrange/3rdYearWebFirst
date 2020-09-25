const express = require ('express');

const router = express.Router();

let books = [];


router.post('/book', (req, res) => {
    const book = req.body;
    books.push(book);

    res.send ('book has been added to the database');
    console.log(`book name is ${book.name} number of book is ${books.length}`);

});

router.get('/books', (req, res) => {
    res.send(books);
})

router.get('/books/:id', (req,res) => {

   let id = req.params.id;
    res.json(books[id]);
})

router.delete('/books/:id',(req, res) => {
  let id = req.params.id; 
  console.log(`removing book ${books[id].name}`)
  books.splice(req.params.id, 1);
  res.send(books);

})


module.exports = router;