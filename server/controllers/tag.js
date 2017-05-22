const tagAction = require('../model_rest/tagAction');
const articleAction = require('../model_rest/articleAction');
const redisClient = require('../model/redis');
const api = require('../api/index');

let createTag = async (ctx, next) => {
    let tagName = ctx.request.body.tagName;
    try {
        let tagResult = await isTagExist(tagName);
        if (!tagResult) {
            let time = api.getNowTime();
            let createResult = await tagAction.createTag({ name: tagName, createdAt: time });
            ctx.body = { tag: { name: tagName, createdAt: time }, httpresult: 200 };
            // let tagList = await new Promise((resolve, reject) => {
            //     redisClient.get('tagList', (err, res) => {
            //         resolve(JSON.parse(res));
            //     })
            // });
            let tagList = await redisGetTagList();
            tagList.unshift({
                name: tagName,
                createdAt: time
            });
            redisClient.set('tagList', JSON.stringify(tagList));     
            redisClient.expire('tagList', 60 * 10);  
        }
        else {
            ctx.body = { httpresult: 300 }
        }
    }
    catch (err) {
        console.log(err);
        ctx.body = { httpresult: 400 }
    }
    next();
}

let updateTag = async (ctx, next) => {
    try {
        let tagResult = await isTagExist(ctx.request.body.newName);
        if (!tagResult) {
            let data = ctx.request.body;
            data.time = api.getNowTime();
            await tagAction.updateTag(data);
            let articleList = await redisGetArticleList();
            ctx.body = { tag: { name: data.newName, createdAt: data.time }, httpresult: 200 };
            for (let i in articleList) {
                if (articleList[i].tags.indexOf(ctx.request.body.oldName) !== -1) {
                    articleList[i].tags.splice(articleList[i].tags.indexOf(ctx.request.body.oldName), 1);
                    articleList[i].tags.push(ctx.request.body.newName);
                    articleAction.modifyArticle(articleList[i]);
                }
            }
            // let tagList = await tagAction.getAllTag();
            //console.log(tagList);
            let tagList = await redisGetTagList();
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i].name === ctx.request.body.oldName) {
                    let newTag = { name: data.newName, createdAt: data.time };
                    if (tagList[i]._id) {
                        newTag._id = tagList[i]._id;
                    }
                    tagList.splice(i, 1);
                    tagList.unshift(newTag);
                    break;
                } 
            }
            redisClient.set('tagList', JSON.stringify(tagList));
            redisClient.expire('tagList', 60 * 10);
            articleList = await articleAction.getArticleList();
            redisClient.set('articleList', JSON.stringify(articleList));
            redisClient.expire('articleList', 60 * 10);
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
        await tagAction.deleteTag(ctx.request.body._id, ctx.request.body.name);
        ctx.body = { httpresult: 200 };
        let articleList = await redisGetArticleList();
        for (let i in articleList) {
            if (articleList[i].tags.indexOf(ctx.request.body.name) !== -1) {
                if (articleList[i].tags.length === 1) {
                    articleAction.deleteArticle(articleList[i]._id, articleList[i].title);
                }
                else {
                    let tags = articleList[i].tags.splice(articleList[i].tags.indexOf(ctx.request.body.name), 1);
                    let article = articleList[i];
                    article.tags = tags;
                    articleAction.modifyArticle(article);
                }
            }
        }
        let tagList = await redisGetTagList();
        for (let i = 0; i < tagList.length; i++) {
            if (tagList[i].name === ctx.request.body.name) {
                tagList.splice(i, 1);
                break;
            } 
        }
        // let tagList = await tagAction.getAllTag();
        redisClient.set('tagList', JSON.stringify(tagList));
        redisClient.expire('tagList', 60 * 10);
        articleList = await articleAction.getArticleList();
        redisClient.set('articleList', JSON.stringify(articleList));
        redisClient.expire('articleList', 60 * 10);
    }
    catch (err) {
        ctx.body = { httpresult: 400 };
    }
    next();
}

let getAllTag = async (ctx, next) => {
    try {
        // let tagList = await new Promise((resolve, reject) => {
        //     redisClient.get('tagList', async (err, res) => {
        //         if (res) {
        //             console.log('redis');
        //             redisClient.expire('tagList', 60 * 10);
        //             resolve(JSON.parse(res));
        //         }
        //         else {
        //             let result = await tagAction.getAllTag();
        //             redisClient.set('tagList', JSON.stringify(result));
        //             redisClient.expire('tagList', 60 * 10);
        //             resolve(result);
        //         }
        //     })
        // });
        let tagList = await redisGetTagList();
        // let tagList = await tagAction.getAllTag();
        ctx.body = { httpresult: 200, tagList: tagList };   
        redisClient.set('tagList', JSON.stringify(tagList));
        redisClient.expire('tagList', 60 * 10);
    }
    catch (err) {
        console.log(err + 'tag');
        ctx.body = { httpresult: 400 };
    }
    next();
}

let isTagExist = async (name) => {
    let tagResult = await new Promise((resolve, reject) => {
        redisClient.get('tagList', async (err, res) => {
            if (res) {
                let obj = JSON.parse(res);
                for (let i = 0; i < obj.length; i++) {
                    if (obj[i].name === name) {
                        resolve([obj[i]]);
                    }
                }
                resolve([]);
            }
            else {
                resolve(await tagAction.findTag(name));
            }
        });
    });
    if (tagResult.length === 0) {
        return false;
    }   
    else {
        return true;
    }
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
        })
    });
    return articleList;  
}

let redisGetTagList = async () => {
    let tagList = await new Promise((resolve, reject) => {
        redisClient.get('tagList', async (err, res) => {
            if (res) {
                resolve(JSON.parse(res));
            }
            else {
                resolve(await tagAction.getAllTag());
            }
        })
    });
    return tagList;
}

module.exports = {
    'POST /createTag': createTag,
    'POST /updateTag': updateTag,
    'POST /deleteTag': deleteTag,
    'GET /getAllTag': getAllTag
}