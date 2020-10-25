import express from 'express'



import VerifyUserMiddleware from '../middleware/verifyuser';
import AuthService from '../models/authservice';

let secret =  'unasverySecretSecret' // would normally import this from a config file


const router = express.Router();


// Handle the endpoint /auth
// verify that the necessary fields are there.
// then check the correct password is used.
// then login them in by giving them a JWT

router.post('/', [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthService.login
])


router.post('/refesh',  )

// Handle the endpoint auth/refresh

// (req, res) => {
//     userDB.readUsers(req, res);
// }





export default router;