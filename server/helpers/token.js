const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtkey = process.env.ACCESS_TOKEN_SECRET;

    return jwt.sign({_id}, jwtkey, {expiresIn: "2h"})
}

module.exports = createToken;