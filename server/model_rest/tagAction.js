const tag = require('../model/mongo').tag;

module.exports = {
    createTag: async (data) => {
        tag.create(data);
    },
    findTag: async (tagName) => {
        return tag.find({ name: tagName }).exec();
    },
    updateTag: async (data) => {
        tag.update({ name: data.oldName }, { name: data.newName, createdAt: data.time }).exec();
    }
}