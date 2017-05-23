const log4js = require('log4js');
const log4js_config = require('../log4js.json');
log4js.configure(log4js_config);

let log = log4js.getLogger('log_file');

module.exports = log;