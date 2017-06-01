/**
 * Created by zhengqj on 2017/5/25.
 */

const request = require('request');
const promise = require('bluebird');
var util = require('util');
const db = require('./DB');

module.exports = {

    doGet(sql){
        return new promise(function (resolve, reject) {
            db.execSql(sql, function (data) {
                resolve(data);
            })
        })
    },

    get getOutProvMap() {
        return async function (data) {
            var sql = " SELECT  * from event_report WHERE reportTime >= '%s 00:00:00' AND reportTime < '%s 23:59:59' ";
            sql = util.format(sql, data.day,data.day);

            console.log(sql);

            return await this.doGet(sql);

        }

    },
}
