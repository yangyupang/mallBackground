import api from "../../http/api"
import { Message } from "element-ui"
import router from "../../router"
export default {
    namespaced: true,
    state: {
        orders: [],
        total: null,
        logistics: [],
        reports: {}
    },
    mutations: {
        setOrders(state, data) {
            state.orders = data
        },
        setTotal(state, data) {
            state.total = data
        },
        setLogistics(state, data) {
            state.logistics = data
        },
        setReports(state, data) {
            state.reports = data
        },

    },
    actions: {
        // 角色列表
        async getOrders({ commit }, { query, pagenum, pagesize }) {
            try {
                let res = await api.getOrders(query, pagenum, pagesize)
                if (res.meta.status === 200) {
                    commit("setOrders", res.data.goods)
                    commit("setTotal", res.data.total)
                    return true
                } else {
                    Message.warning(res.meta.msg)
                    return false
                }
            } catch (err) {
                return false
            }
        },
        // 查看物流信息
        async findExpress({ commit }, id) {
            try {
                let res = await api.findExpress(id)
                if (res.meta.status === 200) {
                    commit("setLogistics", res.data)
                    return true
                } else {
                    Message.warning(res.meta.msg)
                    return false
                }
            } catch (err) {
                return false
            }
        },
    }
}