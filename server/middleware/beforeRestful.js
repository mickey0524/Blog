const tokenService = require('./token');
const redisClient = require('../model/redis');
const checkUrl = [ '/createTag', '/updateTag', '/deleteTag', '/createArticle', '/modifyArticle', '/deleteArticle', '/changePassWord' ];

module.exports = async (ctx, next) => {
    const isCheckUrl = checkUrl.indexOf(ctx.url);
    console.log(ctx.url);
    if (isCheckUrl === -1) {
        return next();
    }
    let token = ctx.request.headers['authorization'];
    console.log(token);
    if (!token) {
        ctx.body = {
            status: 'fail'
        }
    }
    let result = tokenService.verityToken(token);
    if (!result) {
        ctx.body = {
            status: 'fail'
        }
    }
    let reply = await new Promise((resolve, reject) => {
        redisClient.get('token', (err, res) => {
            resolve(res);
        });
    });
    if (reply === token) {
        return next();
    }
    else {
        ctx.body = {
            status: 'fail'
        }
    }
}