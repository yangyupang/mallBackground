// 默认导出一个对象既一个模块
import api from '../../http/api'
import {
    Message
} from 'element-ui'
import router from '../../router'

export default {
    // 需要命名空间
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        async login({
            commit
        }, {
            username,
            password
        }) {
            let res = await api.login({
                username,
                password
            })
            if (res.meta.status === 200) {
                // Message.success(res.meta.msg)
                // 如果组件需要用到action请求的结果 就返回出去  如果不用 就不返回
                // return res
                localStorage.setItem('adminUser', JSON.stringify(res.data))
                localStorage.setItem('adminToken', res.data.token)
                router.push('/')
                Message.success('登录成功')
                    // commit('setMsg', res.data)
            }
            return res
        },
    },
    getters: {

    }
}