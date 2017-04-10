const accountAction = require('../model_rest/accountAction');

let loginIn = async (ctx, next) => {
    try {
        let user = await accountAction.getPassWord(ctx.request.body.userName);
        if (user[0].passWord === ctx.request.body.passWord) {
            ctx.body = { login: true };
        }
        else {
            ctx.body = { login: false };
        }
    }
    catch (err) {
        ctx.body = { login: false };
    }
    next();
}

let changePassWord = async (ctx, next) => {
    try {
        await accountAction.changePassWord(ctx.request.body);
        ctx.body = { httpresult: 200 };
    }
    catch (err) {
        ctx.body = { httpresult: 400 };
    }
    next();
}

module.exports = {
    'POST /loginIn': loginIn,
    'POST /changePassWord': changePassWord
}