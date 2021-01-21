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
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    component: User,
                    name: "user",
                    meta: { is_admin: true },
                    beforeEnter(to, from, next) {
                        let user = JSON.parse(sessionStorage.getItem('user_authen'))
                        try {
                            if (user.admin === false && to.path.includes('user')) {
                                next('/404')
                                return;
                            }
                            if (user.admin) {
                                next()
                            } else {
                                router.push('home/product')
                            }
                        } catch (err) { console.log(err.message) }
                    },
                    children: [
                        {
                            path: '',
                            name: 'user_table',
                            component: Table_User,
                        },
                        {
                            path: 'create_user',
                            name: 'create_user',
                            component: Create_user,
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
                        },
                        {
                            name: "create_product",
                            path: "create_product",
                            component: Create_Product,
                            beforeEnter(to, from, next) {
                                let user = JSON.parse(sessionStorage.getItem('user_authen'))
                                try {
                                    if (!user.admin){
                                        next('/404')
                                        return
                                    }
                                } catch (err) { console.log(err.message) }
                                next()
                            },
                        }
                    ]
                }
            ]
        }
    ]
})

router.beforeEach((to, form, next) => {
    if (to.matched.some(record => record.meta.guest)) {
        let user = JSON.parse(sessionStorage.getItem('user_authen'))
        if (user) {
            if (user.admin) {
                next('/home')
            } else {
                next('home/product')
            }
        } else {
            next()
        }
    } else {
        next()
    }
})

router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        next('/404')
    } else {
        next()
    }
})

export default router;

