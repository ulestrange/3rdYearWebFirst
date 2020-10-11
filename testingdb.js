import mongoose from 'mongoose';
import express from 'express';



const app = express();


const port = 3000




mongoose.connect('mongodb://localhost:27017/test2DB', {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
 });


 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', ()  => {
   console.log("DB connected")
 });


 const kittySchema = new mongoose.Schema({
    name: String
  });


const Kitten = mongoose.model('Kitten', kittySchema);







app.get('/', (req, res) => {
    
    res.send('Hello World isn\'t life great from Una!');
})

app.get('/addKitten/:name', (req, res) => {
    
    const aKitten = new Kitten({ name: req.params.name });
    
    aKitten.save((err, aKitten) => {
        if (err) return console.error(err);   
      });
    res.send(`${req.params.name} was saved`)
}
);

app.listen(port,  () => console.log(`Example app listening on 
  : ${port}!`))