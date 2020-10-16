
import mongoose from 'mongoose';



const Schema = mongoose.Schema;


const BookSchema = new Schema(
    {
        title: { type: String, required: true },
        summary: { type: String, required: true },
        isbn: { type: String, required: true },
    },
    { toJSON: { virtuals: true } }) // include virtuals when document is converted to JSON


// working now 

BookSchema.virtual('uri').get(function()  {
    return `/books/${this._id}` ;
});

let Book = mongoose.model('Book', BookSchema);


export { Book }