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
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: { guest: true },
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
                    meta: { requiresAuth: true, is_admin: true },
                    children: [
                        {
                            path: '',
                            name: 'user_table',
                            component: Table_User,
                        },
                        {
                            name: 'create_user',
                            path: 'create_user',
                            component: Create_user
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
                            component: Table_Product
                        },
                        {
                            name: "create_product",
                            path: "create_product",
                            component: Create_Product
                        }
                    ]
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        let user_auth = JSON.parse(sessionStorage.getItem('user_authen'));
        if (user_auth !== null) {
            if (to.matched.some((record) => record.meta.is_admin)) {
                if (user_auth.admin === true) {
                    next()
                }
                else {
                    console.log(to)
                   next('/home/product')
                }
            }else {
                next()
            }
        } else {
            next('/')
        }
    } else {
        next()
    }
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.guest)) {
//         let user_auth = sessionStorage.getItem('user_authen')
//         if (user_auth !== null) {
//             next()
//             return;
//         } else { next() }
//     } else {
//         next()
//     }

// });

export default router;