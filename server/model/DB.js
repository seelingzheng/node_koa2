/**
 * Created by seelingzheng on 2017/4/18.
 */
const log4JS = require('../utils/logPlus');
const config = require('../utils/config');

var mysqlconn = require('../utils/mysqlConn');


var conn;

function _init(cb) {

    //连接到mysql数据库
    conn = mysqlconn.conn(config.mysql.database, config.mysql, function (err) {
        if (err != null) {
            log4JS.sqlInfo.error("数据库", config.mysql.database, "连接失败");
            log4JS.sqlInfo.error('[query] - :', err)
        } else {
            log4JS.sqlInfo.info("数据库", config.mysql.database, "连接成功");
        }
        cb && cb(err);
    });

}


function _execSql(sql, cb) {

    mysqlconn.execsql(conn, sql).then(function (data) {
            cb && cb(data);
        }
    )
}


module.exports = {
    init: _init,
    execSql: _execSql
}
