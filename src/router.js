import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Create_user from './views/Create_User'
import Table_User from './views/Table_User'
import User from './views/User_board'
import Product from './views/Product_board'
import Table_Product from './views/Table_Product'
import Create_Product from './views/Create_Product'
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
                    path: 'user',
                    component: User,
                    name: "user",
                    meta: { requiresAuth: true },
                    children: [
                        {
                            path: '',
                            name: 'user_table',
                            component: Table_User,
                            meta: { requiresAuth: true, is_admin: true }
                        },
                        {
                            path: 'create_user',
                            name: 'create_user',
                            component: Create_user,
                            meta: { requiresAuth: true, is_admin: true },

                        }
                    ]
                },
                {
                    path: 'product',
                    name: 'product',
                    component: Product,
                    children: [
                        {
                            path: '',
                            name: "product_table",
                            component: Table_Product,
                            meta: { requiresAuth: true }
                        },
                        {
                            name: "create_product",
                            path: "create_product",
                            component: Create_Product,
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
            console.log(to.fullPath + ' home')
        } else {
            console.log('not user')
            next({ path: '/', query: { redirect: to.fullPath } })
        }

        if (user) {
            if (user.admin) {
                next('home/user')
            } else {
                console.log(to.fullPath + ' product')
                next('home/product')
            }
        }

        if (user) {
            if (!user.admin && to.meta.is_admin) {
                console.log('404')
                next('/404')
            }
        }

    } else if (to.matched.some(record => record.meta.guest)) {
        next()
        console.log('login')
        if (user) {
            console.log(to);
            let path = localStorage.getItem('path');
            console.log(path)
            if (user.admin && path) {
                console.log('user admin')
                next(path)
            } else if (!user.admin && path === '/home/product') {
                console.log('pass')
                next(path)
            } else {
                next('/404')
                localStorage.setItem('path', '/home/product')
            }
        }
    }
})

router.afterEach(to => {
    if (to.name !== '404' && to.name !== 'login') {
        localStorage.setItem('path', to.fullPath)
    }
})

export default router;

