const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const cors = require('koa-cors');
const controller = require('./controller');
const app = new Koa();

app.use(convert(cors()));

app.use(bodyParser());

app.use(controller);

app.listen(3000);

console.log('app started at port 3000...');