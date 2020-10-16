
import mongoose from 'mongoose';



const Schema = mongoose.Schema;


const BookSchema = new Schema(
    {
        title: { type: String, required: true },
        summary: { type: String, required: true },
        isbn: { type: String, required: true },
    })


    // not working - anyone know why?
// BookSchema.virtual('uri').get(() => {
//     return '\\books' + this._id;
// });

let Book = mongoose.model('Book', BookSchema);









export { Book }