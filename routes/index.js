const express = require ('express');

const router = express.Router();

router.post('/book', (req, res) => {
    const book = req.body;
    books.push(book);

    res.send ('book has been added to the database');
    console.log(`book name is ${book.name} number of book is ${books.length}`);

});

module.exports = router;