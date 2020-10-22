
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';



const Schema = mongoose.Schema;


const BookSchema = new Schema(
    {
        title: { type: String, required: true },
        starRating: {type: Number, min: 0, max: 5},
        summary: { type: String, required: true },
        keywords: [ String],
        isbn: { type: String, required: true, index :{unique: true} },
    },
    { toJSON: { virtuals: true } }) // include virtuals when document is converted to JSON


// this creates a get property uri which can be used but does not
// get stpred om the database

BookSchema.virtual('uri').get(function()  {
    return `/books/${this._id}` ;
});

BookSchema.plugin(uniqueValidator);

let Book = mongoose.model('Book', BookSchema);


export { Book }