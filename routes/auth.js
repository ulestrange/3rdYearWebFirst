import express from 'express'



import VerifyUserMiddleware from '../middleware/verifyuser';
import ValidationMiddleware from '../middleware/validation'
import AuthService from '../models/authservice';
import config from '../config'


let secret =  config.secret; // would normally import this from a config file


const router = express.Router();


// Handle the endpoint /auth
// verify that the necessary fields are there.
// then check the correct password is used.
// then login them in by giving them a JWT

router.post('/', 
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthService.login
)


// Handle the endpoint /auth/refresh
// verifty that a valid JWT is present
// verify that the refresh token is present
// give them a  a JWT 

router.post('/refresh', 
    ValidationMiddleware.validJWTNeeded,
    ValidationMiddleware.verifyRefreshBodyField,
    ValidationMiddleware.validRefreshNeeded,
    AuthService.login
);


// Handle the endpoint /auth/facebook
// Verify with facebook that a valid facebook token is present.
// Then check if a user exists with the facebook id, if not
// create a new user.
// then return a JWT 


router.post('/facebook', 
VerifyUserMiddleware.isValidFaceBookUser,
VerifyUserMiddleware.findOrCreateFaceBookUser,
AuthService.facebookLogin );

export default router;