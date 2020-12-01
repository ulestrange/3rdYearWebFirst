

import userService from '../models/userService';
import crypto from 'crypto';
import { format } from 'path';
import FacebookTokenStragegy from 'passport-facebook-token'
import config from '../config'

import { User } from '../models/userModel';
import { profile } from 'console';


import axios from 'axios'



function hasAuthValidFields(req, res, next) {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({ errors: errors.join(',') });
        } else {
            return next();
        }
    } else {
        return res.status(400).send({ errors: 'Missing email and password fields' });
    }
};




function isPasswordAndUserMatch(req, res, next) {
    userService.findUserByEmail(req.body.email)
        .then((user) => {
            if (!user[0]) {
                res.status(404).send({});
            } 
            else {
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    res.locals.auth = {
                        id: user[0]._id,
                        email: user[0].email,
                        permissionLevel: user[0].permissionLevel,
                        name: user[0].name,
                    };
                    return next();
                } else {
                    return res.status(400).send({ errors: ['Invalid e-mail or password'] });
                }
            }
        });
};

// send the token to facebook to check if it is valid and
// get the data we need back.
// this data is then added to the request for processing
// further down the line.

function isValidFaceBookUser(req, res, next) {
    const accessToken = req.body.accessToken;
    console.log('access token from client: ' + accessToken)

    getFacebookData(accessToken).then(
        (data) => {
            console.log (' facebook data '+ JSON.stringify(data));
         
            res.locals.auth = {
                authId: data.id, // the facebook id
                name: data.name,
            }
            return next();
        })
        .catch((error) => {
            return res.status(401).send({ errors: 'Unauthorized -couldn\'t save' })
        });
}

function facebookLogin(req, res) {
    let token = jwt.sign(res.locals.auth, secret, { expiresIn: minutes * 60 });
    res.send({ token: token })
}

// this uses axios which is a package for making http requests from
// a server (the server is acting like a client)


async function getFacebookData(access_token) {
    const { data } = await axios({
        url: 'https://graph.facebook.com/v8.0/me/',
        method: 'get',
        params: {
            access_token: access_token,
            //  fields: ['id','name', 'email'] - not working why????
        }
    });
    return data;
};

function findOrCreateFaceBookUser(req, res, next) {
    User.findOne({ authId: res.locals.auth.authId })
        .then((user) => {
            if (user) {
                res.locals.auth = {
                    id: user._id,
                    permissionLevel: user.permissionLevel,
                };
            }
            else {
                const newUser = new User(res.locals.auth);
                newUser.permissionLevel = 1;
                res.locals.auth = {
                    id: newUser._id,
                    permissionLevel: newUser.permissionLevel,
                };

                newUser.save()
                    .then((result) => {
                        console.log('user created from facebook');
                    })
                    .catch((error) => {
                        res.status(401).json({ status: 'fail', message: 'not authorized ' + error })
                    });
            }
            next();
        })
}

export default {
    isPasswordAndUserMatch, hasAuthValidFields, isValidFaceBookUser,
    findOrCreateFaceBookUser
}
