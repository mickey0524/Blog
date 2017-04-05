const post = require('../model/mongo').post;

module.exports = {
    createArticle: async (data) => {
        post.create(data);
    }
}