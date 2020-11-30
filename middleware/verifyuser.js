
  
import userService from '../models/userService';
import crypto from 'crypto';
import { format } from 'path';
import FacebookTokenStragegy  from 'passport-facebook-token'
import config from '../config'

import { User } from '../models/userModel';
import { profile } from 'console';


import axios from 'axios'



function hasAuthValidFields  (req, res, next) {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};



function isPasswordAndUserMatch (req, res, next)  {
    userService.findUserByEmail (req.body.email)
        .then((user)=>{
            if(!user[0]){
                res.status(404).send({});
            }else{
                let passwordFields = user[0].password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    res.locals.auth = {
                        userId: user[0]._id,
                        email: user[0].email,
                        permissionLevel: user[0].permissionLevel,
                        provider: 'email',
                        name: user[0].firstName + ' ' + user[0].lastName,
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid e-mail or password']});
                }
            }
        });
};

// send the token to facebook to check if it is valid and
// get the data we need back.
// then we check if user exists or is new - save the details
// and send data back to the client.

function isValidFaceBookUser (req, res, next)
{
    const accessToken = req.body.accessToken;
    console.log ('access token from client: ' + accessToken)

    getFacebookUserData(accessToken).then(
        (data) => {
            res.locals.auth = data;
            console.log(res.locals.auth);
            return next();
        })
        .catch((error) => {
        return res.status(401).send({errors: 'Unauthorized'})
        });
    }
    


// this uses axios which is a package for making http requests from
// a server (the server is acting like a client)


async function getFacebookUserData(access_token) {
    const { data } = await axios({
      url: 'https://graph.facebook.com/v8.0/me',
      method: 'get',
      params: { access_token: access_token}
    //   params: {
    //     fields: ['id', 'email', 'first_name', 'last_name'].join(','),
    //     access_token: accesstoken,
    //   },
    });
    return data;
  };

export default { isPasswordAndUserMatch, hasAuthValidFields, isValidFaceBookUser }

