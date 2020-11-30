import passport from 'passport'
import facebookTokenStrategy from ('passport-facebook-token';
import User from '../models/user';
import config from '../config'


// set up passport for use
// should be in a config file maybe

const facebookOptions =  {
    clientID: config.facebook.AppID,
    clientSecret: config.facebook.clientSecret,
    fbGraphVersion: 'v8.0'
}



setUpPassport = function () {
    passport.use('facebookToken', new facebookTokenStrategy({
        facebookOptions
    }, async (accessToken, refreshToken, profile, done) => {
        try {
           const existingUser = await User.findOne({ 'facebook.id': profile.id });

            if(existingUser) {
                return done(null, existingUser);
            }

            const newUser = new User({
                method: 'facebook',
                facebook: {
                    id: profile.id,
                    email: profile.emails[0].value,
                    token: accessToken
                }
            });

            await newUser.save();
            done(null, newUser);

        } catch(error) {
            done(error, false);
        }
    }));
};

export default {setUpPassport}