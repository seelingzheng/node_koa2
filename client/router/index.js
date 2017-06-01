/**
 * Created by zhengqj on 2017/5/25.
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Home from '../views/App.vue'

export default new Router({
    // scrollBehavior: () => ({y: 0}),
    routes: [
        {path: '/', component: Home},
        {path: '*', redirect: '/'}
    ]
})