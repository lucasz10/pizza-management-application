const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  signToken: function ({ email, username, _id, isOwner, owner_id }) {
    const payload = { email, username, _id, isOwner, owner_id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
