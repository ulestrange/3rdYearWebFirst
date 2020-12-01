
import jwt from 'jsonwebtoken';
import crypto  from 'crypto';


let secret =  'unasverySecretSecret' // would normally import this from a config file


function login (req, res)  {
    try {
        let refreshId = res.locals.auth.userId + secret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        res.locals.auth.refreshKey = salt;
        let token = jwt.sign(res.locals.auth, secret ,{expiresIn: 15 * 60});
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({token: token, refreshToken: refresh_token});
        console.log('login success');
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

// for testing purposes the timeout can be set
// to different value

const minutes = 5;

function facebookLogin (req, res) {
    let token = jwt.sign(res.locals.auth, secret, {expiresIn: minutes * 60 });
    res.send({token: token})
}

function refresh_token (req, res) {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, secret);
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

export default { login, refresh_token , facebookLogin}