const articleAction = require('../model_rest/articleAction');
const api = require('../api/index');

let createArticle = async (ctx, next) => {
    let data = ctx.request.body;
    data.createdAt = api.getNowTime();
    data.updatedAt = data.createdAt;
    try {
        await articleAction.createArticle(data);
        ctx.body = { httpresult: 200, article: data };
    }
    catch (err) {
        console.log(err);
        ctx.body = { httpresult: 400 };
    }
    next();
}

let modifyArticle = async (ctx, next) => {
    try {
        let data = ctx.request.body;
        data.updatedAt = api.getNowTime();
        data.createdAt = api.leftNum(data.createdAt);
        await articleAction.modifyArticle(data);
        ctx.body = { httpresult: 200, article: data };
    }
    catch (err) {
        ctx.body = { httpresult: 400 };
    }
    next();
}

let getArticleList = async (ctx, next) => {
    try {
        let articleList = await articleAction.getArticleList();
        ctx.body = { httpresult: 200, articleList };
    }
    catch (err) {
        console.log(err);
        ctx.body = { httpresult: 400 };
    }
    next();
}

let deleteArticle = async (ctx, next) => {
    try {
        await articleAction.deleteArticle(ctx.request.body._id);
        ctx.body = { httpresult: 200 };
    }
    catch (err) {
        ctx.body = { httpresult: 400 };
    }   
    next();
}

module.exports = {
    'POST /createArticle': createArticle,
    'POST /modifyArticle': modifyArticle,
    'GET /getArticleList': getArticleList,
    'POST /deleteArticle': deleteArticle
}
