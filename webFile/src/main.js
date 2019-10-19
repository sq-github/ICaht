import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import commonScss from '../static/css/common.scss'
import axios from 'axios'
import { Dialog, Notify } from 'vant';
import Vconsole from 'vconsole'
Vue.use(Dialog, Notify);

Vue.use(commonScss);
Vue.config.productionTip = false
Vue.prototype.$http = axios

//用于调试
// let vConsole = new Vconsole();

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
