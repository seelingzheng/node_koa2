/**
 * Created by zhengqj on 2016-12-13.
 */

const config = require('./config');
const log4JS = require('log4js');
//初始化日志文件
log4JS.configure(__dirname + '/log4js_conf.json');

module.exports = {

    sqlInfo: log4JS.getLogger('sqlInfo'),
    logInfo: log4JS.getLogger('logInfo')

}