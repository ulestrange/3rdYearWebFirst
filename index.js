import express from 'express';

const app = express();

const port = 3000;


// Configuring the built-in express body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());






app.get('/', (req, res) =>
  res.send('hello world, Una is using Express this has changed'));

app.get('/bananas', (req, res) =>
  res.send('hello world, this is bananas'));



app.listen(port,  () => console.log(`Example app listening on 
  ${port}!`))
