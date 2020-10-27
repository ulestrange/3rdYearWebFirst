
import jwt from 'jsonwebtoken';
import crypto  from 'crypto';


let secret =  'unasverySecretSecret' // would normally import this from a config file


function login (req, res)  {
    try {
        let refreshId = req.body.userId + secret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(res.locals.auth, secret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({accessToken: token, refreshToken: refresh_token});
        console.log('login success');
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

function refresh_token (req, res) {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, secret);
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

export default { login, refresh_token }