/**
 * Created by zhengqj on 2017/5/26.
 */
const fs = require('fs');
module.exports = {
    get readdir() {
        return dir => {
            return new Promise(function (resolve, reject) {
                fs.readdir(dir, function (err, files) {
                    if (err) {
                        return reject(err)
                    }
                    resolve(files)
                })
            })
        }
    }
}