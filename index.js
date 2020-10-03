import express from 'express';
const bodyParser = require('body-parser');

const books = require('./routes/books.js')
const app = express();

const port = 3000;


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/books',books)




app.get('/', (req, res) =>
  res.send('hello world, Una is using Express this has changed'));

app.get('/bananas', (req, res) =>
  res.send('hello world, this is bananas'));



//   app.post('/book', (req, res) => {
//       const book = req.body;
//       books.push(book);

//       res.send ('book has been added to the database');
//       console.log(`book name is ${book.name} number of book is ${books.length}`);

//   });



app.listen(port,  () => console.log(`Example app listening on 
  ${port}!`))