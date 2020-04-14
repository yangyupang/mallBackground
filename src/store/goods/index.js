import api from "../../http/api"
import {
    Message
} from "element-ui"
import router from "../../router"

export default {
    namespaced: true,
    state: {
        goods: [],
        total: null,
        categories: [],
        categoryTwo: [],
        attributes: [],
        cateTotal: null,
    },
    mutations: {
        setGoods(state, data) {
            state.goods = data
        },
        setTotal(state, data) {
            state.total = data
        },
        setCategories(state, data) {
            state.categories = data
        },
        setCategoryTwo(state, data) {
            state.categoryTwo = data
        },
        setAttributes(state, data) {
            state.attributes = data
        },
        setCateTotal(state, data) {
            state.cateTotal = data
        },
    },
    actions: {
        // 商品管理
        // 获取商品列表
        async getGoods({
            commit
        }, {
            query,
            pagenum,
            pagesize
        }) {
            try {
                let res = await api.getGoods(query, pagenum, pagesize)
                if (res.meta.status === 200) {
                    commit("setGoods", res.data.goods)
                    commit("setTotal", res.data.total)
                } else {
                    Message.warning(res.meta.msg);
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 编辑商品
        async editGoods({
            commit
        }, {
            id,
            from
        }) {
            try {
                let res = await api.editGoods(id, from)
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                    return true
                } else {
                    Message.warning(res.meta.msg)
                    return false
                }
            } catch (err) {
                console.log(err);
                return false
            }

        },
        // 删除商品
        async delGoods({
            commit
        }, id) {
            try {
                let res = await api.delGoods(id)
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                    return true
                } else {
                    Message.warning(res.meta.msg)
                    return false
                }
            } catch (err) {
                console.log(err);
                return false
            }

        },
        // 商品分类管理
        async getCategories({
            commit
        }, {
            type,
            pagenum,
            pagesize
        }) {
            try {
                let res = await api.getCategories(type, pagenum, pagesize)
                if (res.meta.status === 200) {
                    commit("setAttributes", [])
                    if (type == 2) {
                        commit("setCategoryTwo", res.data)
                    } else {
                        if (pagenum) {
                            commit("setCateTotal", res.data.total)
                            commit("setCategories", res.data.result)
                        } else {
                            commit("setCategories", res.data)
                        }
                    }
                } else {
                    Message.warning(res.meta.msg)
                }
            } catch (err) {
                console.log(err)
            }
        },
        // 添加商品
        async addGoods({
            commit
        }, params) {
            try {
                let res = await api.addGoods(params)
                if (res.meta.status === 201) {
                    Message.success(res.meta.msg)
                    return true
                } else {
                    Message.warning(res.meta.msg)
                    return false
                }
            } catch (err) {
                console.log(err);
                return false
            }

        },
        // 分类参数管理
        async getAttributes({
            commit
        }, {
            id,
            sel
        }) {
            try {
                let res = await api.getAttributes(id, sel)
                if (res.meta.status === 200) {
                    commit("setAttributes", res.data)
                        // console.log(res.data);
                    return true
                } else {
                    Message.warning(res.meta.msg)
                    return false
                }
            } catch (err) {
                console.log(err);
                return false
            }

        },
        // 添加分类
        async addCategory({
            commit
        }, params) {
            try {
                let res = await api.addCategory(params)
                if (res.meta.status === 201) {
                    Message.success(res.meta.msg)
                    return true
                } else {
                    Message.warning(res.meta.msg)
                    return false
                }
            } catch (err) {
                console.log(err);
                return false
            }

        },
        // 编辑提交分类
        async editCategory({
            commit
        }, params) {
            try {
                let res = await api.editCategory(params.id, params.cat_name)
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                    return true
                } else {
                    Message.warning(res.meta.msg)
                    return false
                }
            } catch (err) {
                console.log(err);
                return false
            }

        },
        // 删除分类
        async delCategory({
            commit
        }, id) {
            try {
                let res = await api.delCategory(id)
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                    return true
                } else {
                    Message.warning(res.meta.msg)
                    return false
                }
            } catch (err) {
                console.log(err);
                return false
            }

        },
        //添加动态参数或者静态属性
        async addAttributes({
            commit
        }, {
            id,
            attr_name,
            attr_sel,
            attr_vals
        }) {
            try {
                let res = await api.addAttributes({
                    id,
                    attr_name,
                    attr_sel,
                    attr_vals
                })
                if (res.meta.status === 201) {
                    Message.success(res.meta.msg)
                    return true
                } else {
                    Message.warning(res.meta.msg)
                    return false
                }
            } catch (err) {
                console.log(err);
                return false
            }
        },
        //删除参数
        async delAttributes({ commit }, {
            id,
            attrid
        }) {
            try {
                let res = await api.delAttributes({
                    id,
                    attrid
                })
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                    return true
                } else {
                    Message.warning(res.meta.msg)
                    return false
                }
            } catch (err) {
                console.log(err);
                return false
            }
        },
        //编辑提交参数
        async editAttributes({ commit }, {
            id,
            attrid,
            attr_name,
            attr_sel,
            attr_vals
        }) {
            try {
                let res = await api.editAttributes({
                    id,
                    attrid,
                    attr_name,
                    attr_sel,
                    attr_vals
                })
                if (res.meta.status === 200) {
                    Message.success(res.meta.msg)
                    return true
                } else {
                    Message.warning(res.meta.msg)
                    return false
                }
            } catch (err) {
                console.log(err);
                return false
            }
        },
    }
}