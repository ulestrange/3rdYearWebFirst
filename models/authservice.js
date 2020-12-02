
import jwt from 'jsonwebtoken';
import crypto  from 'crypto';
import config from '../config';


let secret =  config.secret; // would normally import this from a config file


function login (req, res)  {
    try {
        let refreshId = res.locals.auth.id + secret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        res.locals.auth.refreshKey = salt;
        let appToken = jwt.sign(res.locals.auth, secret ,{expiresIn: 15 * 60});
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({appToken: appToken, refreshToken: refresh_token});
        console.log('login success');
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

// for testing purposes the timeout can be set
// to different value

const minutes = 5;


// Not working yet.

function refresh_token (req, res) {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, secret);
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

// no refresh token needed for facebooklogin that
// is handled by the facebook auth service.

function facebookLogin (req, res) {
    let appToken = jwt.sign(res.locals.auth, secret ,{expiresIn: 2 * 60});
    res.send({appToken: appToken})
}

export default { login, refresh_token, facebookLogin }