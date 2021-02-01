import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import PageNotFound from './views/404'
import User from './views/User_board'
import User_Table from './views/User'
import UserForm from './views/UserForm'
import Product from './views/Product_board'
import Product_Table from './views/Product'
import ProductForm from './views/ProductForm'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: { guest: true },
        },
        {
            path: "/404",
            name: "404",
            component: PageNotFound,
            meta: { guest: true }
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'user',
                    component: User,
                    name: "user",
                    meta: { requiresAuth: true, is_admin: true },
                    children: [
                        {
                            path: '',
                            name: 'user_table',
                            component: User_Table,
                            meta: { requiresAuth: true, is_admin: true },
                        },
                        { 
                            name: 'create-user',
                            path: 'create-user',
                            component: UserForm,
                            meta: { requiresAuth: true, is_admin: true },
                        },
                        { 
                            name: 'update-user',
                            path: 'update-user/:id',
                            component: UserForm,
                            meta: { requiresAuth: true, is_admin: true },
                        }
                    ]
                },
                {
                    path: 'product',
                    name: 'product',
                    component: Product,
                    meta: { requiresAuth: true },
                    children: [
                        {
                            path: '',
                            name: "product_table",
                            component: Product_Table,
                            meta: { requiresAuth: true },
                        },
                        {
                            name: "create-product",
                            path: "create-product",
                            component: ProductForm,
                            meta: { requiresAuth: true, is_admin: true },
                        },
                        {
                            name: "update-product",
                            path: "update-product/:id",
                            component: ProductForm,
                            meta: { requiresAuth: true, is_admin: true },
                        }
                    ]
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    let user = JSON.parse(sessionStorage.getItem('user_authen'))
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (user) {
            next()
        } else {
            next({ path: '/', query: { redirect: to.fullPath } })
        }

        if (user) {
            if (user.admin) {
                next('home/user')
            } else {
                next('home/product')
            }
        }

        if (user) {
            if (!user.admin && to.meta.is_admin) {
                next('/404')
            }
        }

    } else if (to.matched.some(record => record.meta.guest)) {
        next()
    }
})

router.afterEach(to => {
    if (to.fullPath.includes('home')) {
        localStorage.setItem('path', to.fullPath)
    }
})

export default router;

