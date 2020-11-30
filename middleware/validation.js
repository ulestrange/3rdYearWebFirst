import jwt from 'jsonwebtoken'

import crypto from 'crypto';

import config from '../config'


let secret = config.secret;  // would normally import this from a config file

function verifyRefreshBodyField (req, res, next) {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
};

function validRefreshNeeded  (req, res, next)  {
   

    let refresh_token = req.body.refresh_token;
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64");
    
    let b = Buffer.from(hash);
    let token = b.toString('base64');
    if (token === refresh_token) {
        res.locals.auth = req.jwt;
        return next();
    } else {
        return res.status(400).send({error: 'Invalid refresh token'});
    }
};


function validJWTNeeded (req, res, next) {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};

export default { validRefreshNeeded, validJWTNeeded, verifyRefreshBodyField}