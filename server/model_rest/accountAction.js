const account = require('../model/mongo').account;

module.exports = {
    getPassWord: async (userName) => {
        return account.find({ userName: userName }, null);
    },
    changePassWord: async ({ userName, passWord }) => {
        account.update({ userName }, { passWord }).exec();
    }
}