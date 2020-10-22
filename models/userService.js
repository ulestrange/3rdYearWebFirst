import { User } from './userModel';
import crypto from 'crypto'

function readUser(req, res){
    const id = req.params.id;
    User.findById(id)
    .then((result) => res.json(result))
    .catch ((error) => res.status(404).json({error: 'not found' + error}))
}


// findByEmail = (email) => {
//     return User.find({email: email});
// };

// findById = (id) => {
//     return User.findById(id)
//         .then((result) => {
//             result = result.toJSON();
//             delete result._id;
//             delete result.__v;
//             return result;
//         });
// };

function createUser (req, res)  {

    // need to check that the password exists before doing this 
   
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512',salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;
    //req.body.permissionlevel = 1;

    const user = new User(req.body);
    user.save()
    .then((result) => {
        console.log('user created');
        res.location(result.id)
            .status(201)
            .json({ id: result.id })
    })
    .catch((error) => {
        res.status(412).json({ status: 'fail', message: 'not created ' + error })
    });
};


function readUsers (req, res) {
    User.find()
    .then((result) => {
        res.json(result)
    })
    .catch((error) =>
        res.status(500).json({ error: 'An error' + error }))
}
            

// patchUser = (id, userData) => {
//     return User.findOneAndUpdate({
//         _id: id
//     }, userData);
// };

function deleteUser(req, res) {
    const id = req.params.id;

    User.findByIdAndDelete(id).
        then((result) => {
            if (result) {
                res.status(203).send({ message: 'deleted' })
            }
            else {
                res.status(404).send({ message: 'not found' })
            }
        })
        .catch((error) =>
            res.status(404).send({ message: 'not found' + error }));
}


export default { readUsers, createUser, readUser, deleteUser}