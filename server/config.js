import convict from 'convict';


const config = convict({

    app: {
        host: {
            doc: 'app host name',
            default: 'localhost'
        },
        port:{
            doc: 'app port',
            default: 3000
        },
    },

    authentication: {
        google: {
            "clientId": {
                "doc": "The Client ID from Google to use for authentication",
                "default": "214370443344-1ohaqa1pm7v6lh83qe0prct6evi2atgp.apps.googleusercontent.com",
                "env": "GOOGLE_CLIENTID"
            },
            "clientSecret": {
                "doc": "The Client Secret from Google to use for authentication",
                "default": "WQ9MoGlqtUfA-2-ct5ogRc3G",
                "env": "GOOGLE_CLIENTSECRET"
            }
        },
        vk: {
            "clientId": {
                "doc": "The Client ID from VK to use for authentication",
                "default": "6281743",
                "env": "GOOGLE_CLIENTID"
            },
            "clientSecret": {
                "doc": "The Client Secret from VK to use for authentication",
                "default": "2zENc5qnfTRxBcv6z7JK",
                "env": "GOOGLE_CLIENTSECRET"
            }
        },

        facebook: {
            "clientId": {
                "doc": "The Client ID from Facebook to use for authentication",
                "default": "541593536182463",
                "env": "FACEBOOK_CLIENTID"
            },
            "clientSecret": {
                "doc": "The Client Secret from Facebook to use for authentication",
                "default": "1e6d8a028c98a31092ff438bffabbb36",
                "env": "FACEBOOK_CLIENTSECRET"
            }
        },
        token: {
            secret: {
                doc: 'The signing key for the JWT',
                default: 'mySuperSecretKey',
                env: 'JWT_SIGNING_KEY'
            },
            issuer: {
                doc: 'The issuer for the JWT',
                default: 'social-logins-spa'
            },
            audience: {
                doc: 'The audience for the JWT',
                default: 'social-logins-spa'
            }
        }
    }
});

config.validate();

export default config;