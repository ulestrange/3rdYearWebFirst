
import express from 'express';

import userDB from '../models/userService';
import ValidationMiddleware from '../middleware/validation';

const router = express.Router();


router.post('/', [ ValidationMiddleware.validJWTNeeded, (req, res) => {
    
    userDB.createUser(req, res);}]
);


router.get('/', (req, res) => {
    userDB.readUsers(req, res);
});

router.get('/:id', (req, res) => {

    userDB.readUser(req, res);

})

router.delete('/:id', (req, res) => {

    userDB.deleteUser(req, res);

})

router.put('/:id', (req, res) => {

  //  db.updateBook(req, res)
})

export default router;