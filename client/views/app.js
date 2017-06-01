/**
 * Created by zhengqj on 2017/5/26.
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import router from './../router'

Vue.use(ElementUI);

const app = new Vue(Vue.util.extend({
    router
}, App));

app.$mount('#app')
