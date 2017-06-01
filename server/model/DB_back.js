/**
 * Created by seelingzheng on 2017/4/18.
 */
const log4JS = require('../utils/logPlus');
const config = require('../utils/config');
const promise = require('bluebird');
var mysqlconn = require('../utils/mysqlConn');
var util = require('util');

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


function execSql(sql, cb) {

    mysqlconn.execsql(conn, sql).then(function (data) {
            cb && cb(data);
        }
    )
}

function _getNewData() {
    return new promise(function (resolve, reject) {
        var sql = 'SELECT id,mnc,lac,cell_id,lat_dec as lat ,long_dec as lng FROM `st_egypt_cell_all` t where  t.accuracy is null and lac is not null and cell_id is not null  LIMIT 5 ';
        log4JS.sqlInfo.info('getNewData:', sql);
        execSql(sql, function (data) {
            resolve(data);
        });
    })
}

function _getNewErrorData() {
    return new promise(function (resolve, reject) {
        var sql = 'SELECT id,mnc,lac,cell_id,lat_dec as lat ,long_dec as lng FROM `st_egypt_cell_all` t where  t.accuracy = -1000  ';
        log4JS.sqlInfo.info('getNewErrorData:', sql);
        execSql(sql, function (data) {
            resolve(data);
        });
    })
}
function _getGoogleLatlngData(data) {
    return new promise(function (resolve, reject) {
        var sql = " select g_lat as lat ,g_lng as lng ,id from st_egypt_cell_all t where t.g_lat <>-1000 and t.g_lng<>-1000 and (grid_%d is null or grid_%d ='' ) limit %d ;";
        sql = util.format(sql, data.level, data.level, data.limit)
        execSql(sql, function (data) {
            resolve(data);
        })
    })
}

function _getLatlngData(data) {
    return new promise(function (resolve, reject) {
        var sql = " SELECT lat_dec as lat ,long_dec as lng,id from st_egypt_cell_all where g_lat =-1000 and g_lng = -1000 and  lat_dec is not null and long_dec is not null and (grid_%d is null or grid_%d ='' ) limit %d ;";
        sql = util.format(sql, data.level, data.level, data.limit)
        execSql(sql, function (data) {
            resolve(data);
        })
    })
}


function _getGoogleLatLng_pip(data) {
    return new promise(function (resolve, reject) {
        var sql = " select g_lat as lat ,g_lng as lng ,id from st_egypt_cell_all t where t.g_lat <>-1000 and t.g_lng<>-1000 and  city_id_new is null  limit %d ;";
        if (data.isDesc) {
            sql = " select g_lat as lat ,g_lng as lng ,id from st_egypt_cell_all t where t.g_lat <>-1000 and t.g_lng<>-1000 and  city_id_new is null order by id desc  limit %d ;";
        }
        sql = util.format(sql, data.limit)
        execSql(sql, function (data) {
            resolve(data);
        })
    })
}

function _getLatlngData_pip(data) {
    return new promise(function (resolve, reject) {
        var sql = " SELECT lat_dec as lat ,long_dec as lng,id from st_egypt_cell_all where g_lat=-1000 and g_lng =-1000 and  city_id_new is null and lat_dec is not null and long_dec is not null  limit %d ;";
        if (data.isDesc) {
            sql = " SELECT lat_dec as lat ,long_dec as lng,id from st_egypt_cell_all where g_lat=-1000 and g_lng =-1000 and  city_id_new is null and lat_dec is not null and long_dec is not null order by id desc limit %d ;";
        }
        sql = util.format(sql, data.limit)
        execSql(sql, function (data) {
            resolve(data);
        })
    })
}


function _getGridInfo(data) {
    return new promise(function (resolve, reject) {
        _getGridCount(function (countData) {
            var sql = " select id, hashstring   from st_grid where `level` = %d order by id desc ;";
            sql = util.format(sql, data.level);
            execSql(sql, function (data) {
                if (countData[0]['count'] > 0)
                    data.unshift({id: countData[0]['count']});//在数据中添加总条数
                resolve(data);
            })
        })
    })
}

function _getGridCount(cb) {
    // return new promise(function (resolve, reject) {
    var sql = " select count(*) as count from st_grid  ;";
    execSql(sql, function (data) {
        cb && cb(data);
    })
    // })
}


function _getCellTable(data) {
    return new promise(function (resolve, reject) {
        var sql = " select id,grid_4,grid_5,grid_6,grid_7 from st_egypt_cell_all_new t where (t.flag is null or t.flag =0) and t.grid_4 is not null and t.grid_5 is not null   ORDER BY id limit %d;";
        if (data.isDesc) {
            sql = "select id,grid_4,grid_5,grid_6,grid_7 from st_egypt_cell_all_new t where (t.flag is null  or t.flag =0) and t.grid_4 is not null and t.grid_5 is not null  ORDER BY id order by id desc limit %d ;";
        }
        sql = util.format(sql, data.limit)
        execSql(sql, function (data) {
            resolve(data);
        })
    })
}


function _updateDatas(datas, callback) {
    console.log(datas);
    if (datas && datas.length > 0) {

        datas.forEach(function (data) {
            _updateData(data);
        })
    }
    callback && callback();
}

function _updateData(data, cb) {
    var sql = "update st_egypt_cell_all set g_lat =%d , g_lng =%d , g_distance_data = %d ,accuracy=%d  where id = %d;";
    sql = util.format(sql, data.lat, data.lng, data.distance, data.accuracy, data.id);
    log4JS.sqlInfo.info('updateData:', sql);
    log4JS.updateInfo.info(sql);
    execSql(sql, cb);
}

function _updateContryCenter(data) {
    var sql = "update st_country set lat_center =%d , lng_center =%d    where country_id = %d;";
    sql = util.format(sql, data.lat, data.lng, data.id);
    log4JS.sqlInfo.info(sql);
    console.log(sql);
    execSql(sql);
}

function _updateGeohash(data, cb) {
    var sql = "update st_egypt_cell_all set grid_%s ='%s' ,grid_%s_id =%d where id=%d";
    sql = util.format(sql, data.level, data.geohash, data.level, data.g_id, data.id);
    log4JS.sqlInfo.info(sql);
    // console.log(sql);
    execSql(sql, cb);
}

function _updateProvCity(data, cb) {
    var sql = "update st_egypt_cell_all set  city_id_new=%d , prov_id_new =%d where id=%d";
    sql = util.format(sql, data.city_id_new, data.prov_id_new, data.id);
    log4JS.sqlInfo.info(sql);
    execSql(sql, cb);
}

function _updateCellTable(data, cb) {
    var sql = "update st_egypt_cell_all_new t SET t.grid_4_id =%d , t.grid_5_id =%d , t.grid_6_id =%d , t.grid_7_id =%d ,flag= 1 where id =%d ";
    sql = util.format(sql, data.g4, data.g5, data.g6, data.g7, data.id);
    log4JS.sqlInfo.info(sql);
    execSql(sql, cb);
}


function _insertGrid(data, cb) {
    var sql = "insert into st_grid (id,hashstring,level,c_lat,c_lng) value(%d,'%s',%d,%d,%d)";
    sql = util.format(sql, data.id, data.geohash, data.level, data.lat, data.lng);
    log4JS.sqlInfo.info(sql);
    console.log(sql);
    execSql(sql, cb);
}


module.exports = {
      init: _init,
    getNewData: _getNewData,
    getNewErrorData: _getNewErrorData,
    getLatlngData: _getLatlngData,//获取非google 经纬度 列表数据用于更新 geohash
    getGoogleLatlngData: _getGoogleLatlngData, //获取google 经纬度 列表数据用于更新 geohash
    getGridInfo: _getGridInfo,//获取hash表
    getGoogleLatLng_pip: _getGoogleLatLng_pip,//获取google下经纬度用于判断所在省市
    getLatlngData_pip: _getLatlngData_pip,//获取非google下经纬度用于判断所在省市
    getCellTable: _getCellTable,
    updateData: _updateData,
    updateDatas: _updateDatas,
    updateContryCenter: _updateContryCenter,//更新全球城市中心点，根据提供的json数据
    updateGeohash: _updateGeohash,
    updateProvCity: _updateProvCity,//更新城市和省id
    updateCellTable: _updateCellTable,
    insertGrid: _insertGrid//更新数据grid表数据

}
