const redis = require('redis');
const RDS_PORT = 6379;               //端口号
const RDS_HOST = '127.0.0.1';        //服务器IP
const RDS_OPTS = {};                 //设置项

const client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

client.on('ready', (res) => {
    console.log('redis ready');
});

client.on('end', (err) => {
    console.log('redis end');
});

// client.on('connect', () => {
    //client.set('author', 'baihao', redis.print);
    // let name = client.get('author');
    // console.log(`author: ${name}`);
    //client.get('author', redis.print);
//client.hmset('short1', { 'js': 'javascript', 'c#': 'C sharp' }, redis.print);
// client.hgetall('short2', (err, res) => { console.log(res); });
// })

module.exports = client;