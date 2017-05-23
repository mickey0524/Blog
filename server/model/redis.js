const redis = require('redis');
const log = require('../utils/log');
const RDS_PORT = 6379;               //端口号
const RDS_HOST = '127.0.0.1';        //服务器IP
const RDS_OPTS = {};                 //设置项
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.on('ready', (res) => {
    console.log('redis ready');
    log.info('redis缓存正常开启!');
});

client.on('end', (err) => {
    console.log('redis end');
});

module.exports = client;