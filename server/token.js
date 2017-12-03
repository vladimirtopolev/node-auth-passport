import jwt from 'jsonwebtoken';
import config from './config';

// Generate an Access Token for the given User ID
function generateAccessToken(userId) {
    const expiresIn = '1 hour';
    const audience = config.get('authentication.token.audience');
    const issuer = config.get('authentication.token.issuer');
    const secret = config.get('authentication.token.secret');

    return jwt.sign({}, secret, {
        expiresIn: expiresIn,
        audience: audience,
        issuer: issuer,
        subject: userId.toString()
    });
}

export default {
    generateAccessToken: generateAccessToken
};