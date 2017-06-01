/**
 * Created by zhengqj on 2017/5/26.
 */
const Router = require('koa-router');

let router = new Router();

router.get('/', async (ctx) => {
    await ctx.render('index', {})
})
    .get('/ss', async (ctx) => {
        ctx.body = 'ss'
    })

module.exports = router;