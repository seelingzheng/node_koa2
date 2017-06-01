/**
 * Created by zhengqj on 2017/5/25.
 */
const Router = require('koa-router');
const apiPorxy = require('./../model/index');

const router = new Router({
    prefix: '/api'
});

router.get('/', async (ctx) => {
    ctx.body = 'api';
})

router.get('/getOutProvMap/:day', async (ctx) => {
    console.log(ctx.params.day);

    let data = await apiPorxy.getOutProvMap({
        day: ctx.params.day
    })

    ctx.body = data;
    console.dir(data);
})


module.exports = router;