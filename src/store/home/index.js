// 默认导出一个对象既一个模块
import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
    // 需要命名空间
    namespaced: true,
    state: {
        menus: []
    },
    mutations: {
        setMenus(state, data) {
            state.menus = data
        },
    },
    actions: {
        async getMenus({ commit }, params) {
            let res = await api.getMenus()
            if (res.meta.status === 200) {
                // Message.success(res.meta.msg)
                // 如果组件需要用到action请求的结果 就返回出去  如果不用 就不返回
                // return res
                console.log(res.data);
                commit('setMenus', res.data)
            }
        },
    },
    getters: {

    }
}