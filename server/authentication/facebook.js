const passportFacebook = require('passport-facebook');
const users = require('../users');
import config from '../config';
import passport from 'passport';

const passportConfig = {
    clientID: config.get('authentication.facebook.clientId'),
    clientSecret: config.get('authentication.facebook.clientSecret'),
    callbackURL: 'http://localhost:3000/api/authentication/facebook/redirect'
};

passport.use(new passportFacebook.Strategy(passportConfig, function(accessToken, refreshToken, profile, done) {
    let user = users.getUserByExternalId('facebook', profile.id);
    if (!user) {
        // They don't, so register them
        user = users.createUser(profile.displayName, 'facebook', profile.id);
    }
    return done(null, user);
}));