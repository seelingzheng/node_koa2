/**
 * Created by zhengqj on 2017/5/26.
 */
const fs = require('../utils/fsex');
const path = require('path');

let register = async (app) => {
    let files = await fs.readdir(__dirname);
    files.forEach((file) => {
        if (!file.toLowerCase().endsWith('index.js')) {
            let r = require(path.resolve(__dirname, file))
            console.log(path.resolve(__dirname, file));
            app.use(r.routes());
            app.use(r.allowedMethods())
        }
    })

}
module.exports = register