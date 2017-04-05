const tagAction = require('../model_rest/tagAction');
const api = require('../api/index');

let createTag = async (ctx, next) => {
    let tagName = ctx.request.query.tagName;
    try {
        let tagResult = await tagAction.findTag(tagName);
        if (tagResult.length == 0) {
            let time = api.getNowTime();
            await tagAction.createTag({ name: tagName, createdAt: time });
            ctx.body = { httpresult: 200 }
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
        let data = ctx.request.query;
        data.time = api.getNowTime();
        await tagAction.updateTag(data);
        ctx.body = { httpresult: 200 };
    }
    catch (err) {
        ctx.body = { httpresult: 400 };
    }
    next();
}

module.exports = {
    'POST /createTag': createTag,
    'POST /updateTag': updateTag
}