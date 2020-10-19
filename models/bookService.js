
import { Book } from "./bookModel";


function readBooks(req, res, options = []) {

    // this uses object deconstruction to extract the data from the query string
    // it is equivalent to writing
    // const title = req.query.title
    // const isbn = req.query.isbn
    // const limit = req.query.limit

    const { title, isbn, limit } = req.query;
    let filter = {};

    if (title) {
        console.log(title);
        filter.title = title;
    }

    if (isbn) {
        console.log(isbn);
        filter.isbn = isbn
    }

    const limitNumber = parseInt(limit)

    Book.find(filter)
        .limit(limitNumber)
        .then((result) => {
            res.json(result)
        })
        .catch((error) =>
            res.status(500).json({ error: 'An error' + error}))


}

function readBook(req, res) {
    const id = req.params.id;
    Book.findById(id)
        .then((result) => {
            console.log('result' + result.uri);

            res.json(result)
        })
        .catch((error) =>
            res.status(404).json({ error: 'not found' }))
}


function createBook(req, res) {
    let bookDoc = new Book(req.body);
    bookDoc.save()
        .then((result) => {
            console.log('booked saved');
            res.location(result.uri)
                .status(201)
                .json({ id: result._id, uri: result.uri })
        })
        .catch((error) => {
            res.status(412).json({ status: 'fail', message: 'not created' })
        });
    console.log('Promising to save');
}


function deleteBook(req, res) {
    const id = req.params.id;

    Book.findByIdAndDelete(id).
        then((result) => {
            if (result) {
                res.status(203).send({ message: 'deleted' })
            }
            else {
                res.status(404).send({ message: 'not found' })
            }
        })
        .catch((error) =>
            res.status(404).send({ message: 'not found' }));
}



export default { createBook, deleteBook, readBooks, readBook }
