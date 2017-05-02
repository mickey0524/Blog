const post = require('../model/mongo').post;

module.exports = {
    createArticle: async (data) => {
        post.create(data);
    },
    modifyArticle: async (data) => {
        if (data._id) {
            post.findByIdAndUpdate(data._id, data, { new: true }).exec();
        }
        else {
            post.update({ title: data.title }, data).exec();
        }
    },
    getArticleList: async () => {
        return post.find({}, { __v: false }, { sort: { updatedAt: -1 } });
    },
    deleteArticle: async (_id, title) => {
        if (_id) {
            post.findByIdAndRemove(_id).exec();
        }
        else {
            post.remove({ title: title }).exec();
        }
    }
}