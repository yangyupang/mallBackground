import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global'
import './filters'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './bus'
// import Router from 'vue-router'

Vue.use(ElementUI)
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onResolve, onReject) {
//     if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//     return originalPush.call(this, location).catch(err => err)
// }
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')