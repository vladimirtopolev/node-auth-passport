const passportVK = require('passport-vkontakte');
const users = require('../users');
import config from '../config';
import passport from 'passport';

const passportConfig = {
    clientID: config.get('authentication.vk.clientId'),
    clientSecret: config.get('authentication.vk.clientSecret'),
    callbackURL: 'http://localhost:3000/api/authentication/vk/redirect'
};

passport.use(new passportVK.Strategy(passportConfig,
    function(accessToken, refreshToken, params, profile, done) {
        let user = users.getUserByExternalId('vk', profile.id);
        if (!user) {
            // They don't, so register them
            user = users.createUser(profile.displayName, 'vk', profile.id);
        }
        return done(null, user);
    }
));