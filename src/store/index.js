import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import login from './login'
Vue.use(Vuex)

// 只放公共的状态
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        home,
        login
    }
})