const tag = require('../model/mongo').tag;

module.exports = {
    createTag: async (data) => {
        tag.create(data);
        return true;
    },
    findTag: async (tagName) => {
        return tag.find({ name: tagName }, { _id: true });
    },
    updateTag: async (data) => {
        tag.update({ name: data.oldName }, { name: data.newName, createdAt: data.time }).exec();
    },
    deleteTag: async (id, name) => {
        if (id) {
            tag.findByIdAndRemove(id).exec();
        }
        else {
            tag.remove({ name: name }).exec();
        }
    },
    getAllTag: async () => {
        return tag.find({}, { _id: true, name: true, createdAt: true }, { sort: { createdAt: -1 }});
    }
}