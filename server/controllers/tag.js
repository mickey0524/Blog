const tagAction = require('../model_rest/tagAction');
const articleAction = require('../model_rest/articleAction');
const api = require('../api/index');

let createTag = async (ctx, next) => {
    let tagName = ctx.request.body.tagName;
    try {
        let tagResult = await tagAction.findTag(tagName);
        if (tagResult.length == 0) {
            let time = api.getNowTime();
            await tagAction.createTag({ name: tagName, createdAt: time });
            ctx.body = { tag: { name: tagName, createdAt: time }, httpresult: 200 };
        }
        else {
            ctx.body = { httpresult: 300 }
        }
    }
    catch (err) {
        ctx.body = { httpresult: 400 }
    }
    next();
}

let updateTag = async (ctx, next) => {
    try {
        let tagResult = await tagAction.findTag(ctx.request.body.newName);
        if (tagResult.length == 0) {
            let data = ctx.request.body;
            data.time = api.getNowTime();
            await tagAction.updateTag(data);
            ctx.body = { tag: { name: data.newName, createdAt: data.time }, httpresult: 200 };
        }
        else {
            ctx.body = { httpresult: 300 };
        }
    }
    catch (err) {
        console.log(err);
        ctx.body = { httpresult: 400 };
    }
    next();
}

let deleteTag = async (ctx, next) => {
    try {
        await tagAction.deleteTag(ctx.request.body._id);
        let articleList = await articleAction.getArticleList();
        for (let i in articleList) {
            if (articleList[i].tags.indexOf(ctx.request.body.name) !== -1) {
                if (articleList[i].tags.length === 1) {
                    articleAction.deleteArticle(articleList[i]._id);
                }
                else {
                    let tags = articleList[i].tags.splice(articleList[i].tags.indexOf(ctx.request.body.name), 1);
                    let article = articleList[i];
                    article.tags = tags;
                    articleAction.modifyArticle(article);
                }
            }
        }
        ctx.body = { httpresult: 200 };
    }
    catch (err) {
        ctx.body = { httpresult: 400 };
    }
    next();
}

let getAllTag = async (ctx, next) => {
    try {
        let result = await tagAction.getAllTag();
        ctx.body = { httpresult: 200, tagList: result };
    }
    catch (err) {
        console.log(err);
        ctx.body = { httpresult: 400 };
    }
    next();
}

// let getTagById = async (ctx, next) => {
//     try {
//         let result = await tagAction.getTagById(ctx.request.body._id);
//         ctx.body = { httpresult: 200, tag: result };
//     }
//     catch (err) {
//         ctx.body = { httpresult: 400 };
//     }
// }

module.exports = {
    'POST /createTag': createTag,
    'POST /updateTag': updateTag,
    'POST /deleteTag': deleteTag,
    'GET /getAllTag': getAllTag,
    // 'POST /getTagById': getTagById
}