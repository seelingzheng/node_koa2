/**
 * Created by zhengqj on 2017/5/25.
 */
const path = require('path');
const Koa = require('koa');
const app = new Koa();

const onerror = require('koa-onerror');
const views = require('koa-views');
const json = require('koa-json');
const static = require('koa-static');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const router = require('./router/index');

//route
// const clientR = require('./client/router/clients')
// const serverR = require('./server/router/server')


//error handler
onerror(app);

//middlewares
app.use(bodyparser());
app.use(json());
app.use(logger());
app.use(static(path.resolve(__dirname, 'dist')));
app.use(views(path.resolve(__dirname, 'dist')));

//自定义错误
app.use(async (ctx, next) => {
    console.log("ctx.url", ctx.url);

    if (ctx.url === "/favicon.ico")return;

    try {
        await next();
        if (ctx.status === 404) {
            await ctx.render('404', {
                msg: '页面未找到'
            })
        }
    } catch (err) {
        let status = err.status || 500;
        await ctx('500', {
            status,
            msg: '服务器内部错误' + err.body || err.message
        })
        console.log(err);
    }
})

// x-response-time
app.use(async function (ctx, next) {
    const start = new Date()
    await next()
    const ms = new Date() - start
    ctx.set('X-Response-Time', `${ms}ms`)
})

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//router

router(app);


app.on('error', (err, ctx) => {
    console.log('error url:' + ctx.url)
    console.log('error detail:' + err)
    console.log('error stack:' + err.stack)
})


module.exports = app;