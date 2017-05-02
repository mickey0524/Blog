const articleAction = require('../model_rest/articleAction');
const redisClient = require('../model/redis');
const api = require('../api/index');

let createArticle = async (ctx, next) => {
    let data = ctx.request.body;
    data.createdAt = api.getNowTime();
    data.updatedAt = data.createdAt;
    try {
        await articleAction.createArticle(data);
        ctx.body = { httpresult: 200, article: data };
        let articleList = await redisGetArticleList();
        articleList.unshift(data);
        redisClient.set('articleList', JSON.stringify(articleList));
        redisClient.expire('articleList', 60 * 10);
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
        let articleList = await redisGetArticleList();
        for (let i = 0; i < articleList.length; i++) {
            if (articleList[i].title == data.title) {
                articleList.splice(i, 1);
                articleList.unshift(data);
                break;
            }
        }
        redisClient.set('articleList', JSON.stringify(articleList));
        redisClient.expire('articleList', 60 * 10);      
    }
    catch (err) {
        console.log(err);
        ctx.body = { httpresult: 400 };
    }
    next();
}

let getArticleList = async (ctx, next) => {
    try {
        // let articleList = await articleAction.getArticleList();
        let articleList = await redisGetArticleList();
        ctx.body = { httpresult: 200, articleList };
        redisClient.set('articleList', JSON.stringify(articleList));
        redisClient.expire('articleList', 60 * 10);
    }
    catch (err) {
        console.log(err);
        ctx.body = { httpresult: 400 };
    }
    next();
}

let deleteArticle = async (ctx, next) => {
    try {
        await articleAction.deleteArticle(ctx.request.body._id, ctx.request.body.title);
        ctx.body = { httpresult: 200 };
        let articleList = await redisGetArticleList();
        for (let i = 0; i < articleList.length; i++) {
            if (articleList[i].title == ctx.request.body.title) {
                articleList.splice(i, 1);
                break;
            }
        }
        redisClient.set('articleList', JSON.stringify(articleList));
        redisClient.expire('articleList', 60 * 10);
    }
    catch (err) {
        ctx.body = { httpresult: 400 };
    }   
    next();
}

let redisGetArticleList = async () => {
    let articleList = await new Promise((resolve, reject) => {
        redisClient.get('articleList', async (err, res) => {
            if (res) {
                resolve(JSON.parse(res));
            }
            else {
                resolve(await articleAction.getArticleList());
            }
        });
    });
    return articleList;
}

module.exports = {
    'POST /createArticle': createArticle,
    'POST /modifyArticle': modifyArticle,
    'GET /getArticleList': getArticleList,
    'POST /deleteArticle': deleteArticle
}
