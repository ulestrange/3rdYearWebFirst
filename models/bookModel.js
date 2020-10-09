
import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const bookSchema = new Schema({
   iban: St
    name: {
      type: String,
      required: true
   },
   quantity: {
      type: Number,
      default: 0
   },
   dateAdded: {
      type: Date,
      default: Date.now
   }
});

module.exports = bookSchema;