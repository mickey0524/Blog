const articleAction = require('../model_rest/articleAction');
const api = require('../api/index');

let createArticle = async (ctx, next) => {
    let data = ctx.request.query;
    data.createdAt = api.getNowTime();
    data.updatedAt = data.createdAt;
    try {
        await articleAction.createArticle(data);
        ctx.body = { httpresult: 200 };
    }
    catch (err) {
        ctx.body = { httpresult: 400 };
    }
}

module.exports = {
    'POST /createArticle': createArticle
}
