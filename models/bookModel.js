
import mongoose from 'mongoose';



const Schema = mongoose.Schema;


const BookSchema = new Schema(
    {
        title: { type: String, required: true },
        summary: { type: String, required: true },
        isbn: { type: String, required: true },
    })
    


let Book = mongoose.model('Book', BookSchema);






export  {Book }