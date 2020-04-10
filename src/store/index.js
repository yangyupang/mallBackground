import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import login from './login'
import user from './user'
import reports from './reports'

Vue.use(Vuex)

// 只放公共的状态
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        home,
        login,
        user,
        reports
    }
})