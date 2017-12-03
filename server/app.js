import express from 'express';
import http from 'http';
import passport from 'passport';
import config from './config';
import mustacheExpress from 'mustache-express';
import token from './token';
import bodyParser from 'body-parser';



require('./authentication/jwt');
require('./authentication/google');
require('./authentication/facebook');
require('./authentication/vk');



// Generate the Token for the user authenticated in the request
function generateUserToken(req, res) {
    const accessToken = token.generateAccessToken(req.user.id);
    res.send({
        token: accessToken
    });
}

let app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/public');

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(passport.initialize());


app.get('/api/secure',
    // This request must be authenticated using a JWT, or else we will fail
    passport.authenticate(['jwt'], { session: false }),
    (req, res) => {
        res.send('Secure response from ' + JSON.stringify(req.user));
    }
);

app.get('/api/authentication/google/start',
    passport.authenticate('google', { session: false, scope: ['profile'] }));
    app.get('/api/authentication/google/redirect',
    passport.authenticate('google', { session: false }),
    generateUserToken);

app.get('/api/authentication/facebook/start',
    passport.authenticate('facebook', { session: false }));
app.get('/api/authentication/facebook/redirect',
    passport.authenticate('facebook', { session: false }),
    generateUserToken);

app.get('/api/authentication/vk/start',
    passport.authenticate('vkontakte', { session: false }));
app.get('/api/authentication/vk/redirect',
    passport.authenticate('vkontakte', { session: false }),
    generateUserToken);






const port = config.get('app.port');
app.listen(port , () => {
    console.log('Server listening on port ' + port);

    //console.log('JWT for demo: ' + token.generateAccessToken(0));
});