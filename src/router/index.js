import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Comm from '../pages/comm/Comm.vue'
import {
    Message
} from 'element-ui'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        // 重定向
        redirect: '/'
    }, {
        path: "/",
        component: Comm,
        children: [{
                path: '/',
                name: "home",
                component: Home,
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/users/users',
                name: 'users',
                meta: {
                    title: '用户列表'
                },
                component: () =>
                    import ('../pages/users/Users.vue')
            },
            {
                path: '/rights/roles',
                name: 'roles',
                meta: {
                    title: '角色列表'
                },
                component: () =>
                    import ('../pages/rights/Roles.vue')
            },
            {
                path: '/rights/rights',
                name: 'roles',
                meta: {
                    title: '权限列表'
                },
                component: () =>
                    import ('../pages/rights/Rights.vue')
            },
            {
                path: '/goods/goods',
                name: 'goods',
                meta: {
                    title: '商品列表'
                },
                component: () =>
                    import ('../pages/goods/Goods.vue')
            },
            {
                path: '/goods/params',
                name: 'params',
                meta: {
                    title: '分类参数'
                },
                component: () =>
                    import ('../pages/goods/Params.vue')
            },
            {
                path: '/goods/categories',
                name: 'categories',
                meta: {
                    title: '商品分类'
                },
                component: () =>
                    import ('../pages/goods/Categories.vue')
            },
            {
                path: '/orders/orders',
                name: 'orders',
                meta: {
                    title: '订单列表'
                },
                component: () =>
                    import ('../pages/orders/Orders.vue')
            },
            {
                path: '/reports/reports',
                name: 'reports',
                meta: {
                    title: '数据报表'
                },
                component: () =>
                    import ('../pages/reports/Reports.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: () =>
            import ('../pages/login/Login.vue')
    },

]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    let isLogin = localStorage.getItem('adminUser')
    if (to.meta.requireAuth) { //判断是否为true
        if (isLogin) {
            // 判断是否为true
            next()
        } else {
            Message.error("请先登录")
            next('/login') //不为true跳转到登录页面
        }
    } else {
        next() //不为true往下执行
    }
})
export default router