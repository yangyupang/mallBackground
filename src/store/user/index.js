import api from "../../http/api"
import {
    Message
} from "element-ui"
import router from "../../router"

export default {
    namespaced: true,
    state: {
        users: [],
        total: 0,
        rolesList: [],
        userMessage: {}
    },
    mutations: {
        getUsers(state, data) {
            state.users = data
        },
        getTotal(state, data) {
            state.total = data
        },
        getRolesList(state, data) {
            state.rolesList = data
        },
        getUserMessage(state, data) {
            state.userMessage = data
        }
    },
    actions: {
        // 获取用户列表
        async getUserList({
            commit
        }, {
            pagenum,
            pagesize,
            query
        }) {
            try {
                let res = await api.getUserList(pagenum, pagesize, query)
                    // console.log(res);
                if (res.meta.status === 200) {
                    commit("getUsers", res.data.users)
                    commit("getTotal", res.data.total)
                } else {
                    Message.warning(res.meta.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 添加用户
        async addUser({
            commit
        }, params) {
            try {
                let res = await api.addUser(params)
                let arr = []
                if (res.meta.status === 201) {
                    arr.push(res.data)
                    commit("getUsers", arr)
                    Message.success(res.meta.msg)
                        // Notification({
                        //     title: res.meta.msg,
                        //     type: 'success'
                        // });
                } else {
                    Message.warning(res.meta.msg)
                        // Notification({
                        //     title: res.meta.msg,
                        //     type: 'warning'
                        // });
                }
            } catch (err) {
                console.log(err);
            }
        },
        //删除用户
        async delUser({
            commit
        }, uId) {
            try {
                let res = await api.delUser(uId)
                    // console.log(res.meta.status);
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },
        //编译用户
        async editUser({
            commit
        }, {
            uId,
            email,
            mobile
        }) {
            try {
                let res = await api.editUser({
                    uId,
                    email,
                    mobile
                })
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },
        //获取角色列表
        async getRoleList({
            commit
        }) {
            try {
                let res = await api.getRoleList()
                if (res.meta.status === 200) {
                    // Message.success(res.data)
                    commit("getRolesList", res.data)
                        // console.log(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        },
        //分配用户角色
        async assignRoles({
            commit
        }, {
            uId,
            rid
        }) {
            try {
                let res = await api.assignRoles({
                    uId,
                    rid
                })
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },
        //设置用户状态
        async alterUserType({ commit }, { uId, type }) {
            try {
                let res = await api.alterUserType({ uId, type })
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                }
            } catch (err) {
                console.log(err);
            }
        },
        //获取用户信息
        async getUserInfo({ commit }, uId) {
            try {
                let res = await api.getUserInfo(uId)
                if (res.meta.status === 200) {
                    console.log(res.data);
                    commit("getUserMessage", res.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
}