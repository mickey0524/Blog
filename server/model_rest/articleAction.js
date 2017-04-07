const post = require('../model/mongo').post;

module.exports = {
    createArticle: async (data) => {
        post.create(data);
    },
    modifyArticle: async (data) => {
        post.findByIdAndUpdate(data._id, data, { new: true }).exec();
    },
    getArticleList: async () => {
        return post.find({}, { __v: false }, { sort: { updatedAt: 1 } });
    },
    deleteArticle: async (_id) => {
        post.findByIdAndRemove(_id).exec();
    }
}