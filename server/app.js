const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const cors = require('koa-cors');
const controller = require('./controller');
// const beforeRestful = require('./middleware/beforeRestful');
const log = require('./utils/log');
const app = new Koa();

// app.use(async (ctx, next) => {
//     console.log(ctx.url);
//     await next();
// })

app.use(convert(cors()));

app.use(bodyParser());

// app.use(beforeRestful);

app.use(controller);

app.listen(3000);

console.log('app started at port 3000...');

