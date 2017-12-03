import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import config from '../config';
import users from '../users';

const passportConfig = {
    clientID: config.get('authentication.google.clientId'),
    clientSecret: config.get('authentication.google.clientSecret'),
    callbackURL: 'http://localhost:3000/api/authentication/google/redirect'
};

//console.log(passportConfig)

passport.use(new GoogleStrategy(passportConfig, function (accessToken, refreshToken, profile, done) {
    let user = users.getUserByExternalId('google', profile.id);
    if (!user) {
        // They don't, so register them
        user = users.createUser(profile.displayName, 'google', profile.id);
    }
    return done(null, user);
}));