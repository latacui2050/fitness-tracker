const { GraphQLError} = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'secretcodesshhsh';
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('User could not be authenticated.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),
    authMiddleware: function({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token
            .split(' ')
            .pop()
            .trim();
        }

        if (!token) {
            return req;
        }

        try {
            // decode and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // return updated request object
        return req;
    },

    signToken: function({ email, firstName, _id }) {
        const payload = { email, firstName, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};