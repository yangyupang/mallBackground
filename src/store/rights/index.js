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
        roles: [],
        rightsList: [],
        userMessage: {}
    },
    mutations: {
        setRoles(state, data) {
            state.roles = data
        },
        setRightsList(state, data) {
            state.rightsList = data
        },
        getUserMessage(state, data) {
            state.userMessage = data
        }
    },
    actions: {
        async getRoleList({
            commit
        }) {
            let res = await api.getRoleList()
            if (res.meta.status === 200) {
                // console.log(res.data);
                // return res
                commit('setRoles', res.data)
                    // console.log(res.data);
            }
            // return res
        },
        async addRole({
            commit
        }, params) {
            let res = await api.addRole(params)
            if (res.meta.status === 201) {
                Message.success(res.meta.msg)
            }
        },
        async editRole({
            commit
        }, {
            rid,
            roleName,
            roleDesc
        }) {
            let res = await api.editRole({
                rid,
                roleName,
                roleDesc
            })
            if (res.meta.status === 200) {
                Message.success("修改成功")
            }
        },
        async delRole({
            commit
        }, rid) {
            let res = await api.delRole(rid)
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
            }
        },
        async getRightsList({
            commit
        }, type) {
            let res = await api.getRightsList(type)
            if (res.meta.status === 200) {
                commit('setRightsList', res.data)
            }
        },
        async roleAuthorization({
            commit
        }, {
            rid,
            rids
        }) {
            let res = await api.roleAuthorization({
                rid,
                rids
            })
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
            }
        },
        async delRoleAuthorization({
            commit
        }, {
            rid,
            rightId
        }) {
            let res = await api.delRoleAuthorization({
                rid,
                rightId
            })
            if (res.meta.status === 200) {
                // Message.success(res.meta.msg)
                Message.success("删除权限成功")
                    // console.log(res.data);
            }
        },
        //获取用户信息
        async getRole({
            commit
        }, uId) {
            try {
                let res = await api.getRole(uId)
                if (res.meta.status === 200) {
                    // console.log(res.data);
                    commit("getUserMessage", res.data)
                }
            } catch (err) {
                console.log(err);
            }
        }

    },
    getters: {

    }
}