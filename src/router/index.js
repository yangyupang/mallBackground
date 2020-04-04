import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        meta: { requireAuth: true },
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../pages/login/Login')
    },
    {
        path: '/users',
        name: 'users',
        component: () =>
            import ('../pages/users/Users')
    },
    {
        path: '/rights/roles',
        name: 'roles',
        component: () =>
            import ('../pages/rights/Roles')
    },
    {
        path: '/goods/goods',
        name: 'goods',
        component: () =>
            import ('../pages/goods/Goods')
    },
    {
        path: '/goods/params',
        name: 'params',
        component: () =>
            import ('../pages/goods/Params')
    },
    {
        path: '/goods/categories',
        name: 'categories',
        component: () =>
            import ('../pages/goods/Categories')
    },
    {
        path: '/orders/orders',
        name: 'orders',
        component: () =>
            import ('../pages/orders/Orders')
    },
    {
        path: '/reports/reports',
        name: 'reports',
        component: () =>
            import ('../pages/reports/Reports')
    },
]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
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