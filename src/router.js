import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Create_user from './views/Create_User'
import Table from './views/Table'
import User from './views/User_board'
import Product from './views/Product_board'
Vue.use(Router)

export default new Router({
    routes:[
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            children:[
                {
                    path: 'user',
                    component: User,
                    children:[
                        {
                            path: '/',
                            component: Table
                        },
                        {
                            path: 'create_user',
                            component: Create_user
                        }
                    ]
                },
                {
                    path: '/sanpham',
                    component: Product

                }
            ]
        }
    ]
})