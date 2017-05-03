const jwt = require('jsonwebtoken');
const expiresIn = 10;
const secret = 'test';

let createToken = (userName) => {
    let obj = { userName };
    const token = jwt.sign(obj, secret, {
        expiresIn
    });
    return token;
}

let verityToken = (token) => {
    if (!token) {
        return false;
    }
    try {
        let result = jwt.verify(token, secret);
        return result;
    }
    catch (err) {
        return false;
    }
}

module.exports = {
    createToken,
    verityToken
}