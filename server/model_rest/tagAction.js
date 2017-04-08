const tag = require('../model/mongo').tag;

module.exports = {
    createTag: async (data) => {
        tag.create(data);
    },
    findTag: async (tagName) => {
        return tag.find({ name: tagName });
    },
    updateTag: async (data) => {
        tag.update({ name: data.oldName }, { name: data.newName, createdAt: data.time }).exec();
    },
    deleteTag: async (id) => {
        tag.findByIdAndRemove(id).exec();
    },
    getAllTag: async () => {
        return tag.find({}, { _id: true, name: true, createdAt: true }, { sort: { updatedAt: -1 }});
    },
    // getTagById: async (id) => {
    //     return tag.findById(id, { _id: false, name: true, createdAt: true });
    // }
}