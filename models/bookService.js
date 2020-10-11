
import mongoose from 'mongoose';



//import Book from "./bookModel";


//import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const BookSchema = new Schema(
    {
        title: { type: String, required: true },
        summary: { type: String, required: true },
        isbn: { type: String, required: true },

    }
);




const Book = mongoose.model('Book', BookSchema);








function readBooks(req, res, options = []) {
    Book.find()
        .then((result) =>
            res.json(result))
        .catch((error) =>
            res.status(500).json({ error: 'An error' }))
}


//

function readBook(req, res) {
    const id = req.params.id;
    Book.findById(id)
        .then((result) =>
            res.json(result))
        .catch((error) =>
            res.status(404).json({ error: 'not found' }))
}


function createBook(req, res) {
    let bookDoc = new Book(req.body);
    bookDoc.save()
        .then((result) => {
            res.status(201).json({ id: result._id, uri: `/books/${result._id}` })
        })
        .catch((error) => {
            res.status(412).json({ status: 'fail', message: 'not created' })
        })
}


function deleteBook(req, res) {
    const id = req.params.id;

    Book.findByIdAndDelete(id).
        then((result) =>{
            if (result) {
                res.status(203).send({ message: 'deleted' })
            }
            else {
                res.status(404).send({message: 'not found'})
            }
        })
        .catch((error) =>
            res.status(404).send({ message: 'not found' }));
}



export default { createBook, deleteBook, readBooks, readBook }
