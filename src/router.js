import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import ContainerTable from './views/ContainerTable'
import User from './views/User_board'
import UserForm from './views/UserForm'
import Product from './views/Product_board'
import ProductForm from './views/ProductForm'
import PageNotFound from './views/404'
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
                    path: ':name',
                    component: User,
                    name: "user",
                    meta: { requiresAuth: true, is_admin: true },
                    children: [
                        {
                            path: '',
                            name: 'user_table',
                            component: ContainerTable,
                        },
                        { 
                            name: 'userform',
                            path: 'create-user',
                            component: UserForm,
                        },
                        { 
                            name: 'userform',
                            path: 'update-user',
                            component: UserForm,
                        }
                    ]
                },
                {
                    path: ':name',
                    name: 'product',
                    component: Product,
                    meta: { requiresAuth: true },
                    children: [
                        {
                            path: '',
                            name: "product_table",
                            component: ContainerTable,
                        },
                        {
                            name: "productform",
                            path: "create-product",
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

