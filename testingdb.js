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

const fluffy = new Kitten({ name: 'Fluffy' });
console.log(fluffy.name); // 'Silence'




app.get('/', (req, res) => {
    
    res.send('Hello World isn\'t life great from Una!');
})

app.get('/addKitten', (req, res) => {
    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
    
      });
    res.send('fluffy was saved')
}
);

app.listen(port,  () => console.log(`Example app listening on 
  : ${port}!`))
