import passport from 'passport';
import  {Strategy, ExtractJwt} from 'passport-jwt';

import config from '../config'
import users from '../users';

console.log(config.get('authentication.token.secret'), config.get('authentication.token.issuer'), config.get('authentication.token.audience'))

const extractToken = (req) => {
    const authorizationHeader = req.headers['authorization'];

    let token = null;
    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }
    console.log(token);
    return token;
}

const jwtOptions = {
    // Get the JWT from the "Authorization" header.
    // By default this looks for a "JWT " prefix
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    // The secret that was used to sign the JWT
    secretOrKey: config.get('authentication.token.secret'),
    // The issuer stored in the JWT
    issuer: config.get('authentication.token.issuer'),
    // The audience stored in the JWT
    audience: config.get('authentication.token.audience')
};

passport.use(new Strategy(jwtOptions, (payload, done) => {
    const user = users.getUserById(parseInt(payload.sub));
    if (user) {
        return done(null, user, payload);
    }
    return done();
}));


