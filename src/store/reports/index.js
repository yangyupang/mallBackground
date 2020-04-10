// 默认导出一个对象既一个模块
import api from '../../http/api'
import {
    Message
} from 'element-ui'
import router from '../../router'

export default {
    // 需要命名空间
    namespaced: true,
    state: {
        option: {},
    },
    mutations: {
        setOption(state, data) {
            state.option = data
        },
    },
    actions: {
        async getChart({
            commit
        }) {
            let res = await api.getChart()
            if (res.meta.status === 200) {
                // console.log(res.data);
                // return res
                commit('setOption', res.data)
                    // console.log(res.data);
            }
            // return res
        },
    },
    getters: {

    }
}