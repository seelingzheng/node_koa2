/**
 * Created by zhengqj on 2016-10-29.
 */

const mysql = require('mysql');
const Promise = require('bluebird');

const exportsFunc = {};


exportsFunc.conn = function (database, option, cb) {
    let client;
    client = mysql.createConnection({
        host: option && option.host || '127.0.0.1',
        port: option && option.port || 3306,
        user: option && option.user || 'root',
        password: option && option.password || ''
    });
    client.connect(function (err) {
            if (err) {
                cb(err);
                return null;
            }
            client.query("use " + database);
            cb();
        }
    );

    return client
}

exportsFunc.execsql = function (conn, sql) {
    return new Promise(function (resovel, reject) {
        conn.query(sql, function (err, results, fields) {
            if (err) {
                reject(err);
            } else {
                resovel(results);
            }
        })
    })
}

exportsFunc.execsqlParams = function (conn, sql, params) {
    return new Promise(function (resovel, reject) {
        conn.query(sql, params, function (err, results, fields) {
            if (err) {
                reject(err);
            } else {
                resovel(results);
            }
        })
    })
}

module.exports = exportsFunc;